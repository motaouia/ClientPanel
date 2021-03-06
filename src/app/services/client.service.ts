import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client : Observable<Client>;

  constructor(private afs:AngularFirestore) { 
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName','asc'));
  }

  getClients(): Observable<Client[]>{
    
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
      return this.clients;
  }

  add(value: Client){
    this.clientsCollection.add(value);
  }

  getClientById(id: string) {
    return this.afs.collection('clients').doc<Client>(id).valueChanges();
  }

 updateClient(id: string, client: Client) {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.clientDoc.update(client);
  }
  
  deleteClient(id: string) {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.clientDoc.delete();
  }
}
