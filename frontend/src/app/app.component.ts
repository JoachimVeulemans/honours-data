import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    logs: any[] = [];
    columns: string[] = [];
    refreshTime: number = 5;
    counter: number = 0;
    blinker: HTMLElement;
    column: number = 0;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.getLogs();
        this.count();
        this.blinker = document.getElementById('blinker');
    }

    search() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
      
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[this.column];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
    }

    blink(): void {
        this.blinker.style.display = "block";
        setTimeout(() => {
            this.blinker.style.display = "none";
        }, 500);
    }

    count(): void {
        setTimeout(() => {
            this.counter++;

            if (this.refreshTime < 1) {
                this.refreshTime = 1;
            }

            if (this.counter > this.refreshTime) {
                this.counter = 0;
                this.getLogs();
                this.blink();
            }

            this.count();
        }, 1000);
    }

    setColumn(column: number) {
        this.column = column;
        console.log("set column to: " + column);
        
    }

    getLogs(): void {
        this.apiService.getAllLogs().subscribe((value) => {
            this.logs = value.reverse();
            this.columns = [];
            this.setColumns();
            setTimeout(() => {
                this.search();
            }, 0);
        }, (error) => {
            this.showError(error.message);
        });
    }

    setColumns(): void {
        for(let key in this.logs[0]) {
            this.columns.push(key);
        }
    }

    clearLogs(): void {
        this.apiService.clearAllLogs().subscribe(() => {
            const clear = document.getElementById('clear');
            clear.innerText = "Cleared!";
            setTimeout(() => {
                clear.innerText = "Click to clear logs";
            }, 2000);
        }, (error) => {
            this.showError(error.message);
        })
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
