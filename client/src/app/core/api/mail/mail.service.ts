import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Mail} from './mail.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})export class MailService {
  private PHP_API_SERVER = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  public sendMessage(mail: Mail): Observable<boolean> {
    return this.http.post<boolean>(this.PHP_API_SERVER + '/sendMail', mail);
  }

}
