import { Component, Input } from '@angular/core';
import { Node } from '../../../d3/models/node';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + _node.x + ',' + _node.y + ')'">
      <svg:ellipse
          cx="0"
          cy="0"
          [attr.rx]="_width"
          [attr.ry]="_height"
          stroke="black"
          stroke-width="3"
          [attr.fill]="_color">
      </svg:ellipse>
      <svg:text x="0" [attr.y]="_textHeightOffset" text-anchor="middle">
        {{_node.id}}
        <tspan x="0" [attr.y]="_textHeightOffset + 20">{{_text2}}</tspan>
        <tspan x="0" [attr.y]="_textHeightOffset + 40">{{_text3}}</tspan>
        </svg:text>
    </svg:g>
  `
})
export class NodeVisualComponent {
  _node: Node;
  _text2: string = '';
  _text3: string = '';
  _width: number = 70;
  _height: number = 30;
  _textHeightOffset: number = 5;
  _color: string = "#4285F4";

  @Input('nodeVisual')
  set nodeVisual(value: Node) {
    this._node = value;
    this.processText();
    this.processLayout();
  }

  processLayout() {
    if (this._node.type == "TREE") {
      this._color = "#FF8800";
    }
    if (this._node.type == "BRANCH") {
      this._color = "#00C851";
    }
  }

  processText() {
    const words = this._node.id.split(" ");
    this._node.id = '';
    this._text2 = '';

    for (let i = 0; i < words.length; i++) {
      if (i < 3) {
        this._node.id += words[i] + " ";
      } else if (i < 9) {
        this._text2 += words[i] + " ";
        this._width = 100;
        this._height = 50;
        this._textHeightOffset = -5;
      } else {
        this._text3 += words[i] + " ";
        this._width = 120;
        this._height = 60;
        this._textHeightOffset = -10;
      }
    }
  }
}
