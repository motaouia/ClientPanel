import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import{ FlashMessagesService } from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client: Client;
  id: string;
  hasBalance: boolean = false;
  disableBalanceonEdit: boolean;

  constructor(private clientService: ClientService,
              private flashMessagesService: FlashMessagesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private settingsService: SettingsService

  ) { }

  ngOnInit(): void {
    this.disableBalanceonEdit = this.settingsService.getSettings().disableBalanceOnEdit;
     //First Step : it to get the ID Client from Url query
     this.id = this.activatedRoute.snapshot.params['id'];
     //Second Step is to get the details of this client using the Id:
      this.getClient(this.id);
  }

  getClient(idClient: string): void{
    this.clientService.getClientById(idClient).subscribe((res: Client) =>{
      if(res != null){
        if(res.balance >0){
           this.hasBalance = true;
        }
      }
      console.log(res);
      this.client = res;
    });
 }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(valid){
        
        //update the client
            this.clientService.updateClient(this.id,value);
            this.flashMessagesService.show('Client is Updated successfully ', {
              cssClass: 'alert-success', timeout: 4000
            }); 

        
          this.router.navigate([`/client/${this.id}`]);

    }else{
      this.flashMessagesService.show('Please fill the form correctlly ', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }

  }
}
