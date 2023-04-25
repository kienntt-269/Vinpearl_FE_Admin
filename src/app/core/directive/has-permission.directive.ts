import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import { AuthService } from '../auth-guard/auth.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  private _value: any;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {

  }

  @Input()
  set hasPermission(value: any) {
    this._value = value;
    this.updateView(this._value);
  }

  private updateView(value: string) {
    if (this.authService.hasPermission(value)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnInit(): void {
  }
}
