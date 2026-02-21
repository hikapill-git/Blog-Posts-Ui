import { Directive, ElementRef, HostListener, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appChangeBtnColor]',
})
export class ChangeButtonColor {
  constructor(private el: ElementRef) {}
  @HostListener('mousemove') onMouseMove() {
    this.el.nativeElement.style.backgroundColor = 'red';
  }
  @HostListener('mouseleave') onMouseRemove() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
