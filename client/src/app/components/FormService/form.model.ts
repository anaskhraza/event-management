export class customerInfo {
    name: string = '';
    email: string = '';
    number: string = '';
}

export class eventDetails {
    location: string = '';
    title: string = '';
    perHead: string = '';
    noOfGuests: string = '';
}

export class finance {
    discount: string = '';
    netAmount: string = '';
    grossAmount: string = '';
    amountPaid: string = '';
    amountRemaining = '';
}

export class item {

    itemSKU: string = '';
    beginDate: myDatePicker;
    endDate: myDatePicker;
    price: string = '';
    qunatity: string = '';
    unitPrice: string = '';

}

export class itemSelector {
    itemsArray: item[];
}

export class myDatePicker {
    year: string = '';
    month: string = '';
    day: string = ''
}

export class eventRequisites {
    beginDate: myDatePicker;
    endDate: myDatePicker;
    formatted: string = '';
}

export class eventCostDetails {
    grossTotal: string = '';
    netTotal: string = '';
    amountPaid: string = '';
    amountRemaining: string = '';
    totalAmountRecieved: boolean = false;
}

export class itemData {
    itemName: string = '';
    rate: string = '';
    sku: string = '';
    quantity: string = '';
    category: string = '';
}

export class responseStatus {
    status: boolean = false;
    error: string = "";
    message: string = "";
}

export class FormData {
    name: string = '';
    email: string = '';
    number: string = '';
    location: string = '';
    title: string = '';
    perHead: string = '';
    noOfGuests: string = '';
    beginDate;
    endDate;
    bookingStart: string = '';
    bookingEnd: string = '';
    formatted: string = '';
    itemName: string = '';
    rate: string = '';
    sku: string = '';
    quantity: string = '';
    category: string = '';
    eventType: string = '';
    grossTotal: string = '';
    netTotal: string = '';
    amountPaid: string = '';
    discount: string = '';
    amountRemaining: string = '';
    totalAmountRecieved: boolean = false;
    itemSelector: itemSelector = null;
    itemArray: any = '';
    responseStatus: responseStatus = {error: '', message: '', status: false};

    clear() {
        this.name = '';
        this.email = '';
        this.location = '';
        this.bookingStart = '';
        this.bookingEnd = '';
        this.eventType = '';
        this.number = '';
        this.beginDate = '';
        this.endDate = '';
        this.formatted = '';
        this.grossTotal = '';
        this.netTotal = '';
        this.amountPaid = '';
        this.amountRemaining = '';
        this.totalAmountRecieved = false;
        this.itemSelector = null;
    }
}
