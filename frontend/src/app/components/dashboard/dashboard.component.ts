import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rooms: string[] = [];
  detailRooms: string[][] = [];
  detailRoom: string[] = [];
  subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
      this.getListOfRooms();
  }

  baseRoomSelected(baseRoom: string) {
      const index = this.rooms.findIndex(element => element === baseRoom);
      this.detailRoom = this.detailRooms[index];
  }

  deleteRoom($event, room: string): void {
      $event.stopPropagation();
      this.subscription = this.apiService.clearRoom(room).subscribe((value) => {
          this.subscription.unsubscribe();
          const index = this.rooms.findIndex(element => element === room.split('_')[0]);
          this.detailRoom = this.detailRoom.filter(element => element !== room);
          this.detailRooms[index] = this.detailRooms[index].filter(element => element !== room);
      }, (error) => {
          this.subscription.unsubscribe();
          this.showError(error.message);
      });
  }

  route(route: string): void {
    this.router.navigateByUrl(route);
  }

  getListOfRooms(): void {
      this.subscription = this.apiService.getAllRooms().subscribe((value) => {
          this.subscription.unsubscribe();
          value.forEach(savedData => {
              const saveName = savedData.split('_')[0];
              if (this.rooms.findIndex(element => element === saveName) === -1) {
                  this.rooms.push(saveName);
                  this.detailRooms.push([]);
              }
          });

          value.forEach(savedData => {
            const saveName = savedData.split('_')[0];
            const index = this.rooms.findIndex(element => element === saveName);
            this.detailRooms[index].push(savedData);
          });
      }, (error) => {
          this.subscription.unsubscribe();
          this.showError(error.message);
      });
  }

  showError(message: string): void {
      const error = document.getElementById('error');
      error.innerText = message;
      error.style.display = 'block';
      setTimeout(() => {
          error.innerText = '';
          error.style.display = 'none';
      }, 5000);
  }
}
