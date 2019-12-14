import { Component, Input } from '@angular/core';
import { Node } from '../../../d3/models/node';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
          cx="0"
          cy="0"
          r="40"
          stroke="black" stroke-width="3" fill="pink">
      </svg:circle>
      <svg:text text-anchor="middle">
        {{node.id}}
      </svg:text>
    </svg:g>
  `
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
}
