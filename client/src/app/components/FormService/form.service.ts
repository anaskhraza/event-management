import { Injectable } from '@angular/core';
import { FormData, customerInfo, eventCostDetails, eventDetails, eventRequisites, itemSelector, item, finance, itemData } from './form.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

@Injectable()
export class FormService {
  private formData: FormData = new FormData();
  constructor(private http: HttpClient) { }

  getPersonal(): customerInfo {
    // Return the Personal data
    var personal: customerInfo = {
      name: this.formData.name,
      email: this.formData.email,
      number: this.formData.number
    };
    return personal;
  }
  setPersonal(data: customerInfo) {
    // Update the Personal data only when the Personal Form had been validated successfully
    this.formData.name = data.name;
    this.formData.email = data.email;
    this.formData.number = data.number;
  }

  getEventRequisites(): eventRequisites {

    if (this.formData.formatted) {
      var eventRequisites: eventRequisites = {
        beginDate: this.formData.beginDate,
        endDate: this.formData.endDate,
        formatted: this.formData.formatted
      }
    }

    return eventRequisites;
  }

  getItemsFromItemSelector(): itemSelector {

    var items: itemSelector = this.formData.itemSelector;

    return items;
  }
  getEventDetails(): eventDetails {
    // Return the Personal data
    var eventDetails: eventDetails = {
      location: this.formData.location,
      title: this.formData.title,
      perHead: this.formData.perHead,
      noOfGuests: this.formData.noOfGuests
    };
    return eventDetails;
  }

  getFinanceDetails(): finance {
    // Return the Personal data
    var financeDetails: finance = {
      discount: this.formData.discount,
      netAmount: this.formData.netTotal,
      grossAmount: this.formData.grossTotal
    };
    return financeDetails;
  }

  setFinanceDetails(data: finance) {
    // Update the Personal data only when the Personal Form had been validated successfully
    this.formData.discount = data.discount;
    this.formData.netTotal = data.netAmount;
    this.formData.grossTotal = data.grossAmount;
  }

  setItemsInItemSelector(data: itemSelector) {
    this.formData.itemSelector = data;
  }

  setEventDetails(data: eventDetails) {
    // Update the Personal data only when the Personal Form had been validated successfully
    this.formData.location = data.location;
    this.formData.title = data.title;
    this.formData.noOfGuests = data.noOfGuests;
    this.formData.perHead = data.perHead;
  }



  getItemsArray(): any {
    var itemsArray = this.formData.itemArray;
    return itemsArray;
  }

  setItemArray(data: any) {
    this.formData.itemArray = data;
  }

  setEventRequisites(data: eventRequisites) {
    this.formData.beginDate = data.beginDate;
    this.formData.endDate = data.endDate;
    this.formData.formatted = data.formatted;
  }

  parseItemsResponse(data: any) {
    var itemsArray = this.getItemsArray();

    var eventRequisiteObj: any = {};
    var parsedData: any;
    eventRequisiteObj.dates = this.getEventRequisites();
    parsedData = _.map(data, function (obj) {
      console.log(obj["color"].split(","));
      obj["color"] = !!obj["color"] ? obj["color"].split(",") : [];
      return _.extend(obj, eventRequisiteObj);
    });
    console.log(JSON.stringify(parsedData));
    if (itemsArray) {
      console.log(" ddf  df" + JSON.stringify(parsedData));
      parsedData = itemsArray
    }
    return parsedData;
  }

  getTotalCost() {
    var totalCost = 0;
    var itemsArray = this.getItemsArray();
    var checkItemArray = _.where(itemsArray, { "checked": true });
    _.map(checkItemArray, function (checkItem: any) {
      if (checkItem.cost) {
        totalCost += checkItem.cost
      }
    });

    return totalCost;

  }

  getItemData(): itemData{
     // Return the Personal data
     var itemData: itemData = {
      itemName: this.formData.itemName,
      rate: this.formData.rate,
      quantity: this.formData.quantity,
      sku: this.formData.sku,
      category: this.formData.category
    };
    return itemData;
  }

  setItemData(data: itemData) {
    this.formData.itemName = data.itemName;
    this.formData.rate = data.rate;
    this.formData.quantity = data.quantity;
    this.formData.sku = data.sku;
    this.formData.category = data.category;
  }

  saveEvent(commonService: any){
    var eventObject: any = {};
    eventObject.items = this.getItemsArray();
    eventObject.eventRequisite = this.getEventRequisites();
    eventObject.personal = this.getPersonal();
    eventObject.eventDetails = this.getEventDetails();
    eventObject.finance = this.getFinanceDetails();
    commonService.saveEvent(eventObject);

  }

  saveItem(commonService: any){
    var itemObject: any = {};
    itemObject = this.getItemData();
    commonService.saveItem(itemObject);
  }


}
