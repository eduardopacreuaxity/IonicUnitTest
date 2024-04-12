import { TestBed } from '@angular/core/testing';

import { ComsumeService } from './comsume.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

fdescribe('ComsumeService', () => {
  let service: ComsumeService;
  let httpCtrl: HttpTestingController;

  const POST_RESPONSE = [
    {
      "name": "melon",
      "description": "La descripcion del melon",
      "id": 9
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ComsumeService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products - success', () => {
    service.getProducts()
      .subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
          expect(response.length).toBe(1);
        }
      });
    const mockHttp = httpCtrl.expectOne('http://localhost:3000/products');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(POST_RESPONSE);
  });

  it('should get products - error', () => {
    service.getProducts()
    .subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(error.status).withContext('status').toEqual(401);
        }
    });

    const mockHttp = httpCtrl.expectOne('http://localhost:3000/products');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush("error request", { status: 401, statusText: 'Unathorized access' });
  });
});
