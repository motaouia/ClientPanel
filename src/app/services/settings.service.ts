import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    allowRegistration: true,
    disaleBalanceOnAdd: false,
    disableBalanceOnEdit: true
  };
  constructor() { }

  getSettings(){
    return this.settings;
  }
}
