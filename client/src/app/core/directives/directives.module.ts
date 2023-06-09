import {NgModule} from '@angular/core';
import {ClickoutDirective} from 'core/directives/clickout.directive';
import {LetDirective} from 'core/directives/let.directive';

const DIRECTIVES = [
    ClickoutDirective,
    LetDirective
];

@NgModule({
    declarations: DIRECTIVES,
    exports: DIRECTIVES,
})
export class DirectivesModule{}
