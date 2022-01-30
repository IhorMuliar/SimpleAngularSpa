import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public first: string = "";  
  public prev: string = "";  
  public next: string = "";  
  public last: string = "";

  constructor() { }
}
