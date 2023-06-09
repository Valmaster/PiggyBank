import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {FormErrorComponent} from './components/form-error/form-error.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PopupComponent} from './components/popup/popup.component';
import {DirectivesModule} from 'core/directives/directives.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

const MODULES = [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    DirectivesModule
];

const COMPONENTS = [
    FooterComponent,
    FormErrorComponent,
    PopupComponent,
    LoginComponent,
    RegisterComponent
];

@NgModule({
    declarations: [COMPONENTS],
    imports: [MODULES],
    exports: [MODULES, COMPONENTS],
})

export class SharedModule {
}
