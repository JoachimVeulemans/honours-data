import { Component, Input } from '@angular/core';
import { Node } from '../../../d3/models/node';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + _node.x + ',' + _node.y + ')'">
      <svg:ellipse
          cx="0"
          cy="0"
          r="40"
          rx="100"
          ry="50"
          stroke="black" stroke-width="3" fill="pink">
      </svg:ellipse>
      <svg:text x="0" y="-10" text-anchor="middle">
        {{_node.id}}
        <tspan x="0" y="10">{{_text2}}</tspan>
        <tspan x="0" y="30">{{_text3}}</tspan>
        </svg:text>
    </svg:g>
  `
})
export class NodeVisualComponent {
  private _node: Node;
  private _text2: string = '';
  private _text3: string = '';
  @Input('nodeVisual')
  set nodeVisual(value: Node) {
    this._node = value;
    const words = this._node.id.split(" ");
    this._node.id = '';
    this._text2 = '';

    for(let i = 0; i < words.length; i++) {
      if (i < 4) {
        this._node.id += words[i] + " ";
      } else if (i < 10) {
        this._text2 += words[i] + " ";
      } else {
        this._text3 += words[i] + " ";
      }
    }
  }
}
