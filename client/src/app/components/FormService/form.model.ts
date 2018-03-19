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

export class FormData {
    name: string = '';
    email: string = '';
    number: string = '';
    location: string = '';
    title: string = '';
    perHead: string = '';
    noOfGuests: string = '';
    beginDate: myDatePicker;
    endDate: myDatePicker;
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

    clear() {
        this.name = '';
        this.email = '';
        this.location = '';
        this.bookingStart = '';
        this.bookingEnd = '';
        this.eventType = '';
        this.number = '';
        this.grossTotal = '';
        this.netTotal = '';
        this.amountPaid = '';
        this.amountRemaining = '';
        this.totalAmountRecieved = false;
        this.itemSelector = null;
    }
}
