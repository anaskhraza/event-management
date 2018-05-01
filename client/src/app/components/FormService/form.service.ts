import { Injectable } from '@angular/core';
import { FormData, customerInfo, eventCostDetails, eventDetails, eventRequisites, itemSelector, item, finance, itemData } from './form.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
import * as _lodash from 'lodash';

@Injectable()
export class FormService {
  private formData: FormData = new FormData();
  eventCode;
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

  getCalculatedItems(commonService) {
    var eventRequisiteObj: any = {};
    var parsedData: any;
    eventRequisiteObj.dates = this.getEventRequisites();

    let startDate = '';
    let endDate = '';
    var datesSplit = eventRequisiteObj.hasOwnProperty("dates") &&  eventRequisiteObj.dates? eventRequisiteObj.dates.formatted.split(" - "): [];
    if(datesSplit.length > 0){
      startDate = datesSplit[0];
      endDate = datesSplit[1];
    }
    
    return  commonService.getItemsWithCalculatedQuantity(startDate, endDate);

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
      grossAmount: this.formData.grossTotal,
      amountPaid: this.formData.amountPaid,
      amountRemaining: this.formData.amountRemaining
    };
    return financeDetails;
  }

  setFinanceDetails(data: finance) {
    // Update the Personal data only when the Personal Form had been validated successfully
    this.formData.discount = data.discount;
    this.formData.netTotal = data.netAmount;
    this.formData.grossTotal = data.grossAmount;
    this.formData.amountPaid = data.amountPaid;
    this.formData.amountRemaining = data.amountRemaining;

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

  parseItemsResponse(data: any, commonService, getQuantityLeft) {
    console.log(JSON.stringify(data));

    var itemsArray = this.getItemsArray();

    var eventRequisiteObj: any = {};
    var parsedData: any;
    eventRequisiteObj.dates = this.getEventRequisites();

    let startDate = '';
    let endDate = '';
    var datesSplit = eventRequisiteObj.hasOwnProperty("dates") &&  eventRequisiteObj.dates? eventRequisiteObj.dates.formatted.split(" - "): [];
    if(datesSplit.length > 0){
      startDate = datesSplit[0];
      endDate = datesSplit[1];
    }
    parsedData = _.map(data, function (obj: any) {

        obj["color"] = !!obj["color"] ? obj["color"].split(",") : [];
        return  _.extend(obj, eventRequisiteObj);
    });
    if(itemsArray) {
      parsedData = itemsArray
    }

    return parsedData;
  }

  parseItemsUpdateResponse( data: any, eventRequisites) {
    console.log("data "+ JSON.stringify(data));
    
    var parsedData = _.map(data, function (obj: any) {
      if(!obj.event_date_end && !obj.event_date_start) {
        console.log("obj "+ JSON.stringify(obj));
        var extObj = {dates: eventRequisites}
        return  _.extend(obj, extObj);
      } else{
        return obj;
      }
    });
     console.log("parsedData "+ JSON.stringify(parsedData));
    parsedData = _.assign(data, parsedData);
    return parsedData;
  }

  getItemsFromDatabase(commonService){
   var itemsArray = commonService.getItems().subscribe(res => {

    });
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

  getTotalCostOnUpdate(data: any) {
    var totalCost = 0;
    var itemsArray = data;
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

  getEventCodes(commonService: any): any  {
    this.eventCode = 10000001;
    var eventCodes;
    commonService.getEventCodes().subscribe(res => {
      console.log(JSON.stringify(res));
      eventCodes = res;
      if(eventCodes.length > 0){
        this.eventCode = parseInt(eventCodes[0].events_code) + 1;
     }
    });
  }

  saveEvent(commonService: any, eventCode){
    var eventObject: any = {};
    eventObject.eventCode = this.eventCode;
    eventObject.items = this.getItemsArray();
     console.log(JSON.stringify("evnet" + eventObject));
    eventObject.eventRequisite = this.getEventRequisites();
    eventObject.personal = this.getPersonal();
    eventObject.eventDetails = this.getEventDetails();
    eventObject.eventDetails.dates = eventObject.eventRequisite.formatted.split(" - ");
    eventObject.finance = this.getFinanceDetails();
    eventObject = this.createItemQuery(eventObject);
    console.log(JSON.stringify(eventObject));
    commonService.saveEvent(eventObject);

  }

    createItemQuery(eventObject) {
      let sql = '';
      let dateSelected = '';
      if(eventObject.hasOwnProperty("items")) {
        let items = eventObject.items;

        for(var i = 0; i< items.length; i++) {
          
          let selectedColor = '';
          let item = items[i];
          if(item.checked){
            if(i != 0){
              sql += ',';
            }
            
            if(item.hasOwnProperty("formatted")){
            dateSelected = item.formatted.split(" - ");
          } else{
            dateSelected = eventObject.eventDetails.dates;
          }
          sql += '(';
          sql+= '"' + item.items_code + '", "'+ item.quantityOrdered + '", "'+ dateSelected[0].trim() + '", "' + dateSelected[1].trim() + '", "' + eventObject.eventCode + '"'
          if(i == items.length - 1 ) {
            sql += ');'
          } else {
            sql += ')'
          }
        }
        }
      }
      eventObject.sql = sql;
      return eventObject;
    }

    getEventChartsData(eventArray) {
      console.log("events" + JSON.stringify(eventArray));
    }

    createItemQueryUpdate(eventObject) {
    let sql = '';
    let dateSelected = '';
    if(eventObject.hasOwnProperty("items")) {
      let items = eventObject.items;

      for(var i = 0; i< items.length; i++) {
       
        let selectedColor = '';
        let item = items[i];
        console.log(i + " dd" + item);
        if(item.checked) {
        if(i != 0) {
        sql += ','
        }
        if(item.hasOwnProperty("formatted")){
          dateSelected = item.formatted.split(" - ");
        } else{
          dateSelected = eventObject.eventDetails.dates;
        }
        sql += '(';
        sql+= '"' + item.items_code + '", "'+ item.quantity_booked + '", "'+ dateSelected[0].trim() + '", "' + dateSelected[1].trim() + '", "' + eventObject.events_code + '"'
        if(i == items.length - 1 ) {
          sql += ');'
        } else {
          sql += ')'
        }
        }
      }
    }
    eventObject.sql = sql;
    return eventObject;
  }

  updateEvent(commonService, itemData, totalCost, discount,  netAmount, advance, remaining, perHead, noOfGuests, eventDetails, eventCode) {

		var postData = {
			events_code: eventCode,
			items: itemData,
			totalCost: totalCost,
			netAmount: netAmount,
			discount: discount,
			advance: advance,
			remaining: remaining,
			perHead: perHead,
			noOfGuests: noOfGuests,
      eventDetails: eventDetails
		}
    postData = this.createItemQueryUpdate(postData);

    console.log("postData " + JSON.stringify(postData));

    commonService.updateEvent(postData);
  
	} 

  saveItem(commonService: any){
    var itemObject: any = {};
    itemObject = this.getItemData();
    commonService.saveItem(itemObject);
  }
   itemObject: any;
  
  setTempItemObjectInstace(itemObject){
    this.itemObject = itemObject;
  }
 

  getTempItemObjectInstace(){
    return this.itemObject;
  }

  freeItemObjectInstance(){
    this.itemObject = null;
  }
}
