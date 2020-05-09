import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{ FlashMessagesService } from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SettingsService} from '../../services/settings.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  allowRegistration: boolean;


  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {

    this.allowRegistration = this.settingsService.getSettings().allowRegistration;
    this.authService.getAuth().subscribe(auth => {
      if(auth){
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;
      }
    });
  }
  onLogOutClick(){
      this.authService.logout();
      this.flashMessagesService.show('you are now Logout, see you soon ', 
        {cssClass: 'alert-success', timeout: 4000}
      );
      
      this.router.navigate(['/']);
  }

}
