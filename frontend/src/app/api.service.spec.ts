import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiService } from './api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('ApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [],
        imports: [RouterTestingModule],
        providers: [HttpClient, HttpHandler]
    }));

    it('should be created', () => {
        const service: ApiService = TestBed.get(ApiService);

        expect(service).toBeTruthy();
    });
});
