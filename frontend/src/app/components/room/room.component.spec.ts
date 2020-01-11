import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LinkVisualComponent } from '../../visuals/link-visual.component';
import { NodeVisualComponent } from '../../visuals/node-visual.component';
import { RoomComponent } from './room.component';

describe('RoomComponent', () => {
    let component: RoomComponent;
    let fixture: ComponentFixture<RoomComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoomComponent, LinkVisualComponent, NodeVisualComponent],
            imports: [RouterTestingModule, BrowserAnimationsModule, FormsModule],
            providers: [HttpClient, HttpHandler]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /*it('should create the component correctly', () => {
        // expect(component).toBeTruthy();
    });*/
});
