import {Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';

@Directive({
    selector: '[clickout]',
})
export class ClickoutDirective{
    @Output() clickout = new EventEmitter();

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

    @HostListener('document:pointerdown')
    public onPointerDown(){
        const listener = this.renderer.listen('document', 'pointerup', event => {
            const element = this.elementRef.nativeElement;
            const inside = event.target === element || element.contains(event.target);
            if (!inside) setTimeout(() => this.clickout.emit(event), 50);
            listener();
        });
    }

}
