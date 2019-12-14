import { Component, Input } from '@angular/core';
import { Link } from '../../../d3/models/link';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:line
        [attr.x1]="link.source.x"
        [attr.y1]="link.source.y"
        [attr.x2]="link.target.x"
        [attr.y2]="link.target.y"
        style="stroke:rgb(0,0,0);stroke-width:2"
    ></svg:line>
  `
})
export class LinkVisualComponent  {
  @Input('linkVisual') link: Link;
}
