import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfLoggedIn]',
})
export class IfLoggedInDirective {
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
}
