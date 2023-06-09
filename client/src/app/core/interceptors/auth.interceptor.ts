import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent, HttpEventType,
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {take, concatMap} from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../store/auth/auth.state';
import {Logout, Refresh} from '../store/auth/auth.actions';
import {AuthModel} from 'core/store/auth/auth.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    @Select(AuthState) auth$: Observable<AuthModel>;

    constructor(private store: Store) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return !req.url.includes('graphql')
            ? next.handle(req)
            : this.auth$.pipe(
                take(1),
                concatMap((auth: AuthModel) => {
                    return auth.accessToken
                        ? next.handle(req.clone(this.headers(auth.accessToken)))
                        : next.handle(req);
                }),
                concatMap(event => {
                    let unauthenticated = false;
                    if (
                        event.type === HttpEventType.Response &&
                        event.status === 200 &&
                        event.body &&
                        Array.isArray(event.body.errors)
                    ) {
                        const errors = event.body.errors as any[];
                        unauthenticated = !!errors.find(e => e.message && (e.message.statusCode === 401 || e.message === 'Unauthorized'));
                        const refreshError = errors.find(e => e.path && e.path.includes('refresh'));
                        if (refreshError) {
                            return this.store.dispatch(new Logout());
                        }
                    }
                    if (unauthenticated) {
                        return this.store.dispatch(new Refresh()).pipe(take(1),
                            concatMap(() => this.auth$.pipe(take(1))),
                            concatMap((auth: AuthModel) => {
                                if (auth.accessToken) {
                                    return next.handle(req.clone(this.headers(auth.accessToken)));
                                }
                                throwError('Error getting access token after logging in with refresh token');
                                this.store.dispatch(new Logout());
                            })
                        );
                    }
                    return of(event);
                })
            );
    }

    private headers(token: string): any {
        return {
            setHeaders: {
                Authorization: `Bearer ` + token,
            },
        };
    }
}
