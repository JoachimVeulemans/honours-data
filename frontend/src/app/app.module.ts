import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NodeVisualComponent } from './visuals/shared/node-visual/node-visual.component';
import { LinkVisualComponent } from './visuals/shared/link-visual/link-visual.component';
import { D3Service } from './d3/d3.service';
import { RoomComponent } from './components/room/room.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DraggableDirective } from './d3/directives/draggable.directive';
import { ZoomableDirective } from './d3/directives/zoomable.directive';

@NgModule({
    declarations: [
        AppComponent,
        NodeVisualComponent,
        LinkVisualComponent,
        RoomComponent,
        DashboardComponent,
        DraggableDirective,
        ZoomableDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        ApiService,
        D3Service
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
