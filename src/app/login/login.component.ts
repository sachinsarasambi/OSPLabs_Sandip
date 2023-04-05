import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  uName = "demo@test.com";
  pwd= '123456';
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],

    });
  }
  onLogin(loginForm: any) {
    console.log(loginForm);
    if (loginForm.userName == this.uName && loginForm.password == this.pwd) {
      this.loginForm.reset();
      this.router.navigateByUrl("patientPage");
    } else {
      alert("Something went Wrong");
    }
  }

}
