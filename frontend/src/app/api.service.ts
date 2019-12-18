import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Idea } from './models/idea.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private _apiURL = environment.apiUrl;
    private optionsWithJSON = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    constructor(private http: HttpClient) { }

    getAllRooms(): Observable<string[]> {
        const url = `${this._apiURL}/list`;
        return this.http.get<string[]>(url, this.optionsWithJSON);
    }

    getRoom(roomId: string): Observable<Idea> {
        const url = `${this._apiURL}/${roomId}`;
        return this.http.get<Idea>(url, this.optionsWithJSON);
    }

    clearRoom(roomId: string): Observable<any> {
        const url = `${this._apiURL}/${roomId}`;
        return this.http.delete<any>(url, this.optionsWithJSON);
    }
}
