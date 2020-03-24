import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiService } from './api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('ApiService', () => {
    let service: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [RouterTestingModule],
            providers: [HttpClient, HttpHandler]
        });
        service = TestBed.inject(ApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
