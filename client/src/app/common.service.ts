import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
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
	
	getGrocery(){
		return this.http.get('/api/getGrocery',{})
	}
}