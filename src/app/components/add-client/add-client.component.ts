import { Component, OnInit, ViewChild} from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  newClient: Client = {
       firstName: '',
       lastName: '',
       email: '',
       phone: '',
       balance: 0

  };
  disableBalanceonAdd: boolean = true;

  @ViewChild('clientForm') form: any;

  constructor(private flashMessagesService: FlashMessagesService,
              private clientService: ClientService,
              private router: Router) { }

  ngOnInit(): void {
        // 1st parameter is a flash message text
        // 2nd parameter is optional. You can pass object with options.
        this.flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
    }
    onSubmit({value, valid}: {value: Client, valid: boolean}){
      if(this.disableBalanceonAdd){
        value.balance = 0;
      }
      if(!valid){
        //Show error 
        this.flashMessagesService.show('Please fill out form correctly', { cssClass: 'alert-danger', timeout: 4000 } );
      }
      else{
        //Add new Client
        this.clientService.add(value);
        //show message
        this.flashMessagesService.show('The client is added succesfully', { cssClass: 'alert-success', timeout: 4000 } );
        //Redirect to Dashord
        this.router.navigate(['/']);

      }
  }

 

  }

  


