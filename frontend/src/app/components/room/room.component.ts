import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Link } from 'src/app/d3/models/link';
import { Node } from 'src/app/d3/models/node';
import { BigTree } from 'src/app/models/bigtree.model';
import { ApiService } from 'src/app/api.service';
import { ForceDirectedGraph } from 'src/app/d3/models';
import { D3Service } from 'src/app/d3/d3.service';
import { ActivatedRoute } from '@angular/router';
import { Idea } from 'src/app/models/idea.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  trees: BigTree[] = [];
  nodes: Node[] = [];
  links: Link[] = [];
  graph: ForceDirectedGraph;

  constructor(private apiService: ApiService, private d3Service: D3Service, private ref: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    const roomId = this.route.snapshot.params["id"];
    this.getRoom(roomId);
  }

  public _options: { width, height } = { width: 800, height: 600 };
  
  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  parseRoom() {
    this.links = [];
    this.nodes = [new Node("Room", "ROOM")];
    this.trees.forEach(tree => {
      this.nodes = this.nodes.concat(new Node(tree["Description"], "TREE"));
      this.links = this.links.concat(new Link(this.nodes[0], this.nodes[this.nodes.length - 1]));
      let index = this.nodes.length - 1;
     
      tree["ChildIdeaDescriptions"].forEach(branch => {
        this.nodes = this.nodes.concat(new Node(branch, "BRANCH"));
        this.links = this.links.concat(new Link(this.nodes[index], this.nodes[this.nodes.length - 1]));
      });
    });
    this.restartSimulation();
  }

  restartSimulation() {
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
  
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });

    this.graph.initSimulation(this.options);
  }

  getRoom(roomId: string): void {
    const sub = this.apiService.getRoom(roomId).subscribe((value: Idea) => {      
      this.trees = value["Ideas"];
      sub.unsubscribe();
      this.parseRoom();
    }, (error) => {
      console.log(error.message);
      sub.unsubscribe();
    });
  }
}
