import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormService } from './components/FormService/form.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class CommonService {
	public add_subject=new Subject<String>()

	constructor(private formDataService: FormService, private http : HttpClient){
    
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

	getMontlySales() {
		var year = new Date().getFullYear()
		return this.http.get('/api/monthlysales/'+year,{})
	}

	getMontlyTargets() {
		var year = new Date().getFullYear()
		return this.http.get('/api/monthlytargets/'+year,{})
	}

	getMontlyTargetSales() {
		var year = new Date().getFullYear()
		return this.http.get('/api/monthlysalestarget/'+year,{})
	}

	getBookingItems() {
		return this.http.get('/api/bookingitems',{})
	}

	getTodayEvents() {
		return this.http.get('/api/todayevents',{})
	}

	getTotalEvents() {
		return this.http.get('/api/totalevents',{})
	}
	
	getTotalItems() {
		return this.http.get('/api/totalitems',{})
	}

	getTotalCustomers() {
		return this.http.get('/api/totalcustomers',{})
	}

	getRecentEvents() {
		return this.http.get('/api/recentevents',{})
	}

	createItem(postData) {
		console.log(postData);
		const myheader = new HttpHeaders().set('Content-Type', 'application/json')
		this.http.post('/api/addItem',
		postData, {
            headers: myheader
          })
          .subscribe(data => {
                alert(JSON.stringify(data));
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
	}

	createCategory(postData) {
		console.log(postData);
		const myheader = new HttpHeaders().set('Content-Type', 'application/json')
		this.http.post('/api/addCategory',
		postData, {
            headers: myheader
          })
          .subscribe(data => {
                alert(JSON.stringify(data));
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
	}

	recieveAmount(postData) {
		console.log(postData);
		const myheader = new HttpHeaders().set('Content-Type', 'application/json')
		this.http.post('/api/receiveAmount',
		postData, {
            headers: myheader
          })
          .subscribe(data => {
                alert(JSON.stringify(data));
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
	}

	updateItem(postData) {
		console.log(postData);
		const myheader = new HttpHeaders().set('Content-Type', 'application/json')
		this.http.post('/api/updateItem',
		postData, {
            headers: myheader
          })
          .subscribe(data => {
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
	}

	updateEvent(postData) {
		var data = {};
		
		// return new Promise(function(resolve, reject) {
		const myheader = new HttpHeaders().set('Content-Type', 'application/json')
		// this.http.post('/api/updateEvent',
		// postData, {
        //     headers: myheader
        //   })
        //   .subscribe(data => {
		// 	resolve (data);
        //   }, error => {
		// 	  console.log(JSON.stringify(error.json()));
		// 	  reject(error)
		//   })
		// });
			    
        return this.http
            .post('/api/updateEvent', postData, {headers: myheader})
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
	}

	public getInvoiceHtml() {
		console.log("getInvoiceHtml");
		return this.http.get('/api/invoicehtml',{})
	}

	private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


	wait(ms){
		var start = new Date().getTime();
		var end = start;
		while(end < start + ms) {
		  end = new Date().getTime();
	   }
	 }

	getItemsForUpdate(eventCode) {
		console.log("dd"+ eventCode);
		return this.http.get('/api/specificeventitems/' + eventCode,{})
	}
	saveFile(postData) {
		const myheader = new HttpHeaders().set('Content-Type', 'application/json')
		  this.http.post('/api/savefile',
          postData, {
            headers: myheader
          })
          .subscribe(data => {
				alert(JSON.stringify(data));
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
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
				//alert(JSON.stringify(data));
				return data;
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
	}
}