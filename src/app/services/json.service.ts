import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  url: string = "http://localhost:3000/patient/"
  constructor(private http: HttpClient) { }


  createUser(data: any) {
    return this.http.post(this.url, data);
  }

  getUserData() {
    return this.http.get(this.url);
  }

  deleteUser(id: any) {
    
    return this.http.delete(this.url + id);
  }

  updateUser(data: any, id: any) {
    return this.http.patch(this.url + id, data);
  }
}
