import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
              private flashMessagesService: FlashMessagesService,
              private router: Router,
              private authService: AuthService 
  ) { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.authService.register(this.email, this.password).
    then(res => {
      this.flashMessagesService.show('New User registred ', {cssClass: 'alert-succes', timeout: 4000});
      this.router.navigate(['/']);
    }).catch(err => {
      this.flashMessagesService.show(err.messages, {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/register']);
    })
  }

}