import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonService } from '../services/json.service';
import { userModel } from './user';

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss']
})
export class PatientPageComponent implements OnInit {
  adddetails!: FormGroup;
  userData!: any[];
  searchName: any;
  userobject: userModel = new userModel();
  actionBtn = "Add"
  isEdit: boolean = false

  constructor(
    private fb: FormBuilder,
    private jsonService: JsonService,

  ) { }

  ngOnInit(): void {
    this.adddetails = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    })
    this.getAllUser()
  }
  onCreateUser(adddetails: any) {
    if (!this.isEdit) {
      this.jsonService.createUser(adddetails).subscribe((res: any) => {
        alert("Added Success");
        this.getAllUser()
      })
    } else {
      this.onupdate()
    }
  }

  getAllUser() {
    this.jsonService.getUserData().subscribe((res: any) => {
      console.log(res);
      this.userData = res;
    })
  }
  onDelete(id: any) {
    this.jsonService.deleteUser(id).subscribe((res: any) => {
      alert("deleted successFully @@")
      this.getAllUser()
    })
  }

  onedit(user: any) {
    this.actionBtn = "Update"
    this.isEdit = true;
    this.userobject.id = user.id;
    this.adddetails.controls['firstname'].setValue(user.firstname)
    this.adddetails.controls['lastname'].setValue(user.lastname)
    this.adddetails.controls['phone'].setValue(user.phone)
    this.adddetails.controls['email'].setValue(user.email)
    this.adddetails.controls['address1'].setValue(user.address1)
    this.adddetails.controls['address2'].setValue(user.address2)
    this.adddetails.controls['city'].setValue(user.city)
    this.adddetails.controls['state'].setValue(user.state)
    this.adddetails.controls['zip'].setValue(user.zip)
  }

  onupdate() {
    this.userobject.firstname = this.adddetails.value.firstname;
    this.userobject.lastname = this.adddetails.value.lastname;
    this.userobject.phone = this.adddetails.value.phone;
    this.userobject.email = this.adddetails.value.email;
    this.userobject.address1 = this.adddetails.value.address1;
    this.userobject.address2 = this.adddetails.value.address2;
    this.userobject.city = this.adddetails.value.city;
    this.userobject.state = this.adddetails.value.state;
    this.userobject.zip = this.adddetails.value.zip;
    this.jsonService.updateUser(this.userobject, this.userobject.id).subscribe((res) => {
      alert("update data sucessfully")
      this.adddetails.reset();
      this.getAllUser()
    })

  }




}

