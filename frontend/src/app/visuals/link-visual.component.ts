import { Component, Input } from '@angular/core';
import { Link } from '../d3/models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[linkVisual]',
  template: `
    <svg:line
        [attr.x1]="linkVisual.source.x"
        [attr.y1]="linkVisual.source.y"
        [attr.x2]="linkVisual.target.x"
        [attr.y2]="linkVisual.target.y"
        style="stroke:rgb(0,0,0);stroke-width:2"
    ></svg:line>
  `
})
export class LinkVisualComponent  {
  @Input() linkVisual: Link;
}
