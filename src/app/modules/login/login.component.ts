import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  authForm = this.fb.group({
    email: ['', Validators.email]
  })
  subscription: any;

  ngOnInit(): void {

  }
  onSubmit() {
    this.authService.login(this.authForm.value.email).subscribe(
      (response: any) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('email', response.email);
        sessionStorage.setItem('_id', response._id);
        this.router.navigate(['/management'])
      }
    )
  }
}
