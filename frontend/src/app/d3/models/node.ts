import * as d3 from 'd3';
import { UnityPosition } from 'src/app/models/unityposition.model';

export class Node implements d3.SimulationNodeDatum {
    // Optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;

    id: string;
    type: string;
    position: UnityPosition;
    votes: number;
    material: string;

    constructor(id: string = '', type: string = '', position: UnityPosition = new UnityPosition(0, 0), votes: number = -1, material: string = 'BigTreeAO') {
        this.id = id;
        this.type = type;
        this.position = position;
        this.votes = votes;
        this.material = material;
    }
}
