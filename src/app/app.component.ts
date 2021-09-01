import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sofit-test';
  user = sessionStorage.getItem('email');

  constructor(
    private router: Router
  ) { }

  ngOnInit(){
    if (sessionStorage.getItem('token')){
      this.router.navigate(['/management'])
    }else{
      this.router.navigate(['/login'])
    }
  }
}
