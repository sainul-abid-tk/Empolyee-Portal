import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  SERVER_URL:String="https://employeeportalserver.onrender.com"
  constructor(private http:HttpClient) { }

  getAdminDetails(){
    return this.http.get(`${this.SERVER_URL}/user/1`)
  }

  updateAdminAPI(adminDetails:any){
    return this.http.put(`${this.SERVER_URL}/user/1`,adminDetails)
  }
  isLoggedIn(){
    return !!sessionStorage.getItem("adminDetails")
  }
}
