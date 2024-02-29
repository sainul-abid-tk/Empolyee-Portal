import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  @Output() onAdminChange=new EventEmitter
  adminDetails:any={}
  editAdminStatus:boolean=false
  profilePicture:string="https://i.pinimg.com/564x/29/55/59/295559e87b67fde4bbd5d5049d67e678.jpg"

  constructor(private adminAPI:AdminService,private toaster:ToastrService){}

  ngOnInit(): void {
      this.adminAPI.getAdminDetails().subscribe((res:any)=>{
        this.adminDetails=res
        if(res.profilePic){
          this.profilePicture=res.profilePic
        }
      })
  }

  editAdminBtn(){
    this.editAdminStatus=!this.editAdminStatus
  }
  onCancel(){
    this.editAdminStatus=!this.editAdminStatus
  }
  getFile(event:any){
    let file=event.target.files[0]
    let fr=new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      this.profilePicture=event.target.result
      this.adminDetails.profilePic=event.target.result
    }
  }

  updateAdmin(){
    this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.editAdminStatus=false
        this.toaster.success("Admin Details Updated Successfully!!")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.onAdminChange.emit(res.name==""?'Admin':res.name)
      },
      error:(reason:any)=>{
        this.toaster.warning("Updation Failed!!!!")
      }
    })
  }

}
