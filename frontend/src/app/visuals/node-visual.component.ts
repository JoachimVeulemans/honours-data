import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Node, ForceDirectedGraph } from '../d3/models';
import { D3Service } from 'src/app/d3/d3.service';
import { UnityPosition } from '../models/unityposition.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:ellipse
          cx="0"
          cy="0"
          [attr.rx]="width"
          [attr.ry]="height"
          stroke="black"
          stroke-width="3"
          [attr.fill]="color">
      </svg:ellipse>
      <svg:text x="0" [attr.y]="textHeightOffset" text-anchor="middle">
        {{text1}}
        <tspan x="0" [attr.y]="textHeightOffset + 20">{{text2}}</tspan>
        <tspan x="0" [attr.y]="textHeightOffset + 40">{{text3}}</tspan>
        </svg:text>
    </svg:g>
  `
})
export class NodeVisualComponent implements OnInit {
  node: Node = new Node();
  text1 = '';
  text2 = '';
  text3 = '';
  width = 90;
  height = 30;
  textHeightOffset = 5;
  color = '#2196f3';

  @Input('nodeVisual')
  set nodeVisual(value: Node) {
      if (value != null) {
          this.node = value;
          this.processText();
          this.processLayout();
      }
  }
  @Input() graph: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyDraggableBehaviour(this.element.nativeElement, this.node, this.graph);
  }

  processLayout() {
    if (this.node.type === 'TREE') {
      this.color = '#988f2a';
    }
    if (this.node.material !== 'BigTreeAO') {
      if (this.node.material === 'WildIdea') {
        this.color = '#8C4843';
      }
      if (this.node.material === 'MostDelightIdea') {
        this.color = '#90A583';
      }
      if (this.node.material === 'QuickWinIdea') {
        this.color = '#C67601';
      }
    }
    if (this.node.type === 'BRANCH') {
      this.color = '#4caf50';
    }
  }

  processText() {
    const words = this.node.id.split(' ');
    this.text1 = '';
    this.text2 = '';
    this.text3 = '';

    for (let i = 0; i < words.length; i++) {
      if (i < 3) {
        this.text1 += words[i] + ' ';
      } else if (i < 9) {
        this.text2 += words[i] + ' ';
        this.width = 110;
        this.height = 50;
        this.textHeightOffset = -5;
      } else {
        this.text3 += words[i] + ' ';
        this.width = 130;
        this.height = 60;
        this.textHeightOffset = -10;
      }
    }

    if (this.node.type !== 'TREE') {
      return;
    }
    if (this.text3 !== '') {
      this.text3 += ' (Votes: ' + this.node.votes + ')';
    } else if (this.text2 !== '') {
      this.text2 += ' (Votes: ' + this.node.votes + ')';
    } else {
      this.text1 += ' (Votes: ' + this.node.votes + ')';
    }
  }
}
