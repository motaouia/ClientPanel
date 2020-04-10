import { Component, OnInit } from '@angular/core';
import {ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    clients: Client[];
    totalOwed:number;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
     this.clientService.getClients().subscribe(clients =>{
      this.clients = clients;
       this.sumOwed();
    });
  }
  sumOwed(){
   
    const total = this.clients.reduce((total,client) =>{
          return this.totalOwed = total+client.balance;
          }, 0);
   
  }

}
