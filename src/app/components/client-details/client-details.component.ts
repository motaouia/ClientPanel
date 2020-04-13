import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import{ FlashMessagesService } from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
    id: string;
    client: Client = {};
    hasBalance: boolean = false;
    showBalnceUpdateInput: boolean = false;


  constructor(private clientService: ClientService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
       // 1st parameter is a flash message text
        // 2nd parameter is optional. You can pass object with options.
        this.flashMessagesService.show('We are in Client-Details component!', { cssClass: 'alert-success', timeout: 1000 });
     }

  ngOnInit(): void {
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
  deleteClient(id){
    if(confirm('Are you sure to delete this client?')){
      this.clientService.deleteClient(id);
      this.flashMessagesService.show('Client removed successfully ', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    }
    

  }
  updateBalance(id: string) {
    
    if (this.client.balance <= 0) this.hasBalance = false;

    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance Updated', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate([`/client/${this.id}`]);
  }
}
