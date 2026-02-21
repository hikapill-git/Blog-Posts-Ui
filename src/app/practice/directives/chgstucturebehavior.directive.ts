import { Directive, TemplateRef, ViewContainerRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSimpleMouse]',
})
export class SimpleMouseDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef,
  ) {}

  @Input() set appIfLoggedIn(condition: boolean) {
    if (condition) {
      this.vcr.createEmbeddedView(this.templateRef);
    } else {
      this.vcr.clear();
    }
  }

  public abc() {
    alert(3);
  }
}
