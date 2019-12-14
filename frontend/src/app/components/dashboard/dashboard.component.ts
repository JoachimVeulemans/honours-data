import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rooms: string[] = [];
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
      this.getListOfRooms();
  }

  getListOfRooms(): void {
      const sub = this.apiService.getAllRooms().subscribe((value) => {
          this.rooms = value;
          sub.unsubscribe();
          console.log(this.rooms);
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
