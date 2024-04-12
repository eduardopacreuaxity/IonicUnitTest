import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComsumeService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<any>('http://localhost:3000/products');
  }

  createProducts(body: any) {
    return this.http.post<any>('http://localhost:3000/products', body);
  }

  deleteProducts(id: number) {
    return this.http.delete<any>('http://localhost:3000/products/' + id);
  }
}
