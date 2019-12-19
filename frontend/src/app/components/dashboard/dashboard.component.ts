import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rooms: string[] = [];
  detailRooms: string[][] = [];
  detailRoom: string[] = [];
  
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
      this.getListOfRooms();
  }

  baseRoomSelected(baseRoom: string) {
      const index = this.rooms.findIndex(element => element == baseRoom);
      this.detailRoom = this.detailRooms[index];
  }

  deleteRoom($event, room: string): void {
      $event.stopPropagation();
      const sub = this.apiService.clearRoom(room).subscribe((value) => {
        const index = this.rooms.findIndex(element => element == room.split('_')[0]);
        this.detailRoom = this.detailRoom.filter(element => element != room);
        this.detailRooms[index] = this.detailRooms[index].filter(element => element != room);
        sub.unsubscribe();
      }, (error) => {
          this.showError(error.message);
          sub.unsubscribe();
      })
  }

  route(route: string): void {
    this.router.navigateByUrl(route);
  }

  getListOfRooms(): void {
      const sub = this.apiService.getAllRooms().subscribe((value) => {
          value.forEach(savedData => {
              let saveName = savedData.split('_')[0];
              if (this.rooms.findIndex(element => element == saveName) == -1) {
                  this.rooms.push(saveName);
                  this.detailRooms.push([]);
              }
          });

          value.forEach(savedData => {
            let saveName = savedData.split('_')[0];
            let index = this.rooms.findIndex(element => element == saveName);
            this.detailRooms[index].push(savedData);
          });
          sub.unsubscribe();
      }, (error) => {
          this.showError(error.message);
          sub.unsubscribe();
      });
  }

  showError(message: string): void {
      const error = document.getElementById('error');
      error.innerText = message;
      error.style.display = "block";
      setTimeout(() => {
          error.innerText = "";
          error.style.display = "none";
      }, 5000);
  }
}
