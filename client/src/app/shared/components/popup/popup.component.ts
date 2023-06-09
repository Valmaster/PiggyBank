import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'shared-popup',
    templateUrl: './popup.component.html'
})
export class PopupComponent{
    @Output() cancel = new EventEmitter();


}
