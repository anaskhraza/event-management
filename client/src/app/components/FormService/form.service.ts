import { Injectable } from '@angular/core';
import { FormData, responseStatus, customerInfo, eventCostDetails, eventDetails, eventRequisites, itemSelector, item, finance, itemData } from './form.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

import * as _lodash from 'lodash';
import { resolve } from 'url';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../common.service';

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

  setResponseStatus(res) {
    console.log(res);
    this.formData.responseStatus.status = res.status == "202" ? true: false;
  }

  getResponseStatus() {
    return this.formData.responseStatus;
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
    if(!eventObject.personal.number || parseInt(eventObject.personal.number) == 0 ) {
      return {status: 301, Error: "Invalid Input value"};
    }
    eventObject.eventDetails = this.getEventDetails();
    eventObject.eventDetails.dates = eventObject.eventRequisite.formatted.split(" - ");
    eventObject.finance = this.getFinanceDetails();
    eventObject = this.createItemQuery(eventObject);
    console.log(JSON.stringify(eventObject));
    return commonService.saveEvent(eventObject);

  }

    createItemQuery(eventObject) {
      let sql = '';
      let dateSelected = '';
      if(eventObject.hasOwnProperty("items")) {
        let items = eventObject.items;

        for(var i = 0; i< items.length; i++) {
          var count = 0;
          let selectedColor = '';
          let item = items[i];
          if(item.hasOwnProperty("checked") &&  item.checked){

            if(count != 0){
              sql += ',';
            }
            count = count + 1;
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
      var countOfOrderDue = 0;
      console.log("events" + JSON.stringify(eventArray));
      var totalRevenue = _lodash.sumBy(eventArray, function(o: any) {
        return o.total_amount
      })

      var amountDue = _lodash.sumBy(eventArray, function(o: any) {
        if(parseInt(o.amount_balance) > 0) {
          countOfOrderDue = countOfOrderDue + 1;
        }
        return o.amount_balance
      })
      console.log("events amountDue " + amountDue);

      return {
        totalRevenue: totalRevenue,
        amountDue: amountDue,
        countOfOrderDue: countOfOrderDue
      }

    }

    getMonthlySalesData(array) {
      var monthsSalesArray  = 
      [{ "label": "January", "value": 0},
      { "label": "February", "value": 0},
      { "label": "March", "value": 0},
      { "label": "April", "value": 0},
      { "label": "May", "value": 0},
      { "label": "June", "value": 0},
      { "label": "July", "value": 0},
      { "label": "August", "value": 0},
      { "label": "September", "value": 0},
      { "label": "October", "value": 0},
      { "label": "November","value": 0},
      { "label": "December", "value": 0}
    ];
      var response = array;
      for(var  i = 0; i < response.length; i++ ) {
      _.map(monthsSalesArray, function(obj) {
        if(response[i].label == obj.label) {
          obj.value = response[i].value;
        }
      });
    }
    console.log("monthsSalesArray" + JSON.stringify(monthsSalesArray));
    return monthsSalesArray
  }

    getMontlyTargetSales (object) {
      
      var monthsArraySales  = [{ "label": "January", "value": 0},
      { "label": "February", "value": 0},
      { "label": "March", "value": 0},
      { "label": "April", "value": 0},
      { "label": "May", "value": 0},
      { "label": "June", "value": 0},
      { "label": "July", "value": 0},
      { "label": "August", "value": 0},
      { "label": "September", "value": 0},
      { "label": "October", "value": 0},
      { "label": "November","value": 0},
      { "label": "December", "value": 0}
    ]
      var monthsArrayTargets = [{ "label": "January", "value": 0},
      { "label": "February", "value": 0},
      { "label": "March", "value": 0},
      { "label": "April", "value": 0},
      { "label": "May", "value": 0},
      { "label": "June", "value": 0},
      { "label": "July", "value": 0},
      { "label": "August", "value": 0},
      { "label": "September", "value": 0},
      { "label": "October", "value": 0},
      { "label": "November","value": 0},
      { "label": "December", "value": 0}
    ];
      var finalObject = {
        charts: {},
        categories:[],
        dataset: []
      }
      console.log("events1" + JSON.stringify(monthsArrayTargets));
      var monthlySales = JSON.parse(object.response.monthlySalesTarget);

      var monthlyTargets = JSON.parse(object.response.monthlyTarget);

      for(var  i = 0; i < monthlySales.length; i++ ) {
      _.map(monthsArraySales, function(obj) {
        if(monthlySales[i].month == obj.label) {
          obj.value = monthlySales[i].amount;
        }
      });
    }

    for(var  i = 0; i < monthlyTargets.length; i++ ) {
      _.map(monthsArrayTargets, function(obj) {
        if(monthlyTargets[i].Month == obj.label) {
          obj.value = monthlyTargets[i].Target;
        }
      });
    }

    var categoryObj = {category:[]};
    var categoryArray  = [];
   _.map(monthsArraySales, function (obj){
      categoryArray.push({label: obj.label});
    })
    categoryObj.category = categoryArray;
    finalObject.categories.push(categoryObj);

    var dataSet1 = {seriesname: "Actual Revenue", data: []};

    var dataSet1Array  = [];
    
    _.map(monthsArraySales, function (obj){
      dataSet1Array.push({value: obj.value});
     })
    
     dataSet1.data = dataSet1Array;

     finalObject.dataset.push(dataSet1);

     var dataSet2 = {"seriesname": "Projected Revenue", "renderas": "line", "showvalues": "0", data: []};

     var dataSet2Array  = [];
     
     _.map(monthsArrayTargets, function (obj){
      dataSet2Array.push({value: obj.value});
      })
     
      dataSet2.data = dataSet2Array;
 
      finalObject.dataset.push(dataSet2);

     console.log("events3" + JSON.stringify(finalObject));  
      return finalObject
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

    return commonService.updateEvent(postData);
  
	} 


  printInvoice (eventCode, commonService) {
    return commonService.getInvoiceHtml();
  }

  printData(template, commonService, eventCode) {
    var response1;
    var response2;
    commonService.getEventDetailsForUpdate(eventCode).subscribe(res=>{
        response1 = res;
        commonService.getItemsForUpdate(eventCode).subscribe(response=>{
          response2 = response;
          this.manipulatePrintData(template, response1, response2, commonService);

        });
    });
  } 

  manipulatePrintData(template, response1, itemResponse, commonService) {
    

    console.log("response2   " + JSON.stringify(itemResponse))

    var itemArrayTemp = _lodash.filter(itemResponse, {checked: true});
    response1.totalItems = itemArrayTemp.length;
    var itemArray = this.splitIntoSubArray(itemArrayTemp, 3);
    console.log("itemArray   " + JSON.stringify(itemArray))
   var datePipe = new DatePipe("en-US");
    response1.todayDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
    
    console.log("response1   " + JSON.stringify(response1))
    var data = {
      eventObj: response1,
      eventItem: itemArray
    };
    var compiledTemplate = _lodash.template(template);

    var bodyHtml = compiledTemplate(data);
    var x=window.open();
    x.document.open();
    x.document.write(bodyHtml);
    x.document.close();
    commonService.saveFile({ htmlBody: escape(bodyHtml), eventCode: response1.events_code})
    // this.saveToFileSystem(bodyHtml, response1.events_code);
    // var doc = new jsPDF({
    //   orientation: 'landscape',
    //   unit: 'in',
    //   format: [4, 2]
    // })
    
    // doc.text(bodyHtml, 1, 1)
    // doc.save('two-by-four.pdf')
    
    // console.log(bodyHtml)
  }

  // private saveToFileSystem(bodyHtml, eventCode) {
  //   const filename = eventCode + '.html';
  //   const blob = new Blob([bodyHtml], { type: 'text/plain' });
  //   saveAs(blob, filename);
  // }

splitIntoSubArray(arr, count) {
    var newArray = [];
    while (arr.length > 0) {
      newArray.push(arr.splice(0, count)); 
    }
    return newArray;
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
declare function escape(s:string): string;