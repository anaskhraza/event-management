import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CommonService {
	public add_subject=new Subject<String>()

	constructor(private http : HttpClient){
    
	}

	addGrocery(item){
		return this.http.post('/api/addGrocery',{
			groceryItem : item
		})
	}
	
	getItems(){
		return this.http.get('/api/items',{})
	}

	getItemCategories(){
		return this.http.get('/api/itemscategory',{})
	}

	saveItem(item){
		const myheader = new HttpHeaders().set('Content-Type', 'application/json')
		  this.http.post('/api/addItem',
          item, {
            headers: myheader
          })
          .subscribe(data => {
                alert(JSON.stringify(data));
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
	}

	saveEvent(event){
		const myheader = new HttpHeaders().set('Content-Type', 'application/json')
		  this.http.post('/api/addEvent',
          event, {
            headers: myheader
          })
          .subscribe(data => {
                alert(JSON.stringify(data));
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
	}
}