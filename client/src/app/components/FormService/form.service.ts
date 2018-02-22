import { Injectable } from '@angular/core';
import { FormData, customerInfo, eventCostDetails, eventDetails } from './form.model';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class FormService {
  private formData: FormData = new FormData();
  constructor(private http : Http) { }

  getPersonal(): customerInfo {
    // Return the Personal data
    var personal: customerInfo = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
      contactNumber: this.formData.contactNumber
    };
    return personal;
  }
  setPersonal(data: customerInfo) {
    // Update the Personal data only when the Personal Form had been validated successfully
    this.formData.firstName = data.firstName;
    this.formData.lastName = data.lastName;
    this.formData.email = data.email;
    this.formData.contactNumber = data.contactNumber;
  }

  getEventDetails(): eventDetails {
    // Return the Personal data
    var eventDetails: eventDetails = {
      location: this.formData.location,
      bookingStart: this.formData.bookingStart,
      bookingEnd: this.formData.bookingEnd,
      eventType: this.formData.eventType,
      items: this.formData.items
    };
    return eventDetails;
  }

  setEventDetails(data: eventDetails) {
    // Update the Personal data only when the Personal Form had been validated successfully
    this.formData.location = data.location;
    this.formData.bookingStart = data.bookingStart;
    this.formData.bookingEnd = data.bookingEnd;
    this.formData.eventType = data.eventType;
  }

  getGrocery(){
		return this.http.get('/api/getGrocery',{})
	}

}
