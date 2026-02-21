import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appChangeInputBoxColor]',
})
export class ChangeInputControlColor {
  /**
   *
   */
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}
  @HostListener('focus') onFocus1() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#e0f7fa'); // light cyan
    this.renderer.setStyle(this.el.nativeElement, 'border-color', '#00796b'); // teal border
  }
  @HostListener('blur') onBlur1() {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color'); // light cyan
    this.renderer.removeStyle(this.el.nativeElement, 'border-color'); // teal border
  }
}
