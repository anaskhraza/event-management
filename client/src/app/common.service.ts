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

	getEventCodes(){
		return this.http.get('/api/eventcodes',{})
	}
	
	getItems(){
		return this.http.get('/api/items',{})
	}

	getItemsWithCalculatedQuantity(startDate, endDate){
		return this.http.get('/api/itemquantity?start_date='+startDate+'&end_date='+endDate,{})
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

	updateEvent(postData) {
		const myheader = new HttpHeaders().set('Content-Type', 'application/json')
		this.http.post('/api/updateEvent',
		postData, {
            headers: myheader
          })
          .subscribe(data => {
                alert(JSON.stringify(data));
          }, error => {
              console.log(JSON.stringify(error.json()));
          });

	}

	getItemsForUpdate(eventCode) {
		console.log("dd"+ eventCode);
		return this.http.get('/api/specificeventitems/' + eventCode,{})
	}

	getEventDetailsForUpdate(eventCode) {
		console.log("dd"+ eventCode);
		return this.http.get('/api/specificeventdetails/' + eventCode,{})
	}

	getItemLeftQuantity(itemCode, startDate, endDate){
		return this.http.get('/api/itemquantity?item_code='+itemCode+'&start_date='+startDate+'&end_date='+endDate,{})
	}

	getEvents() {
		return this.http.get('/api/events',{})
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