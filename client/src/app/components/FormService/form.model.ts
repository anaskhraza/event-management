export class customerInfo{
    firstName: string = '';
    lastName : string = '';
    email: string = '';
    contactNumber: string = '';
}

export class eventDetails{
    bookingStart: string = '';
    bookingEnd : string = '';
    location: string = '';
    eventType: string = '';
    items: any[] = [];
}

export class eventCostDetails{
    grossTotal: string = '';
    netTotal: string ='';
    amountPaid: string = '';
    amountRemaining: string = '';
    totalAmountRecieved: boolean = false;
    
}

export class FormData {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
    contactNumber: string = '';
    location: string = '';
    bookingStart: string = '';
    bookingEnd: string = '';
    eventType: string = '';
    grossTotal: string = '';
    netTotal: string ='';
    amountPaid: string = '';
    amountRemaining: string = '';
    totalAmountRecieved: boolean = false;
    items: any[] = [];

    clear() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.location = '';
        this.bookingStart = '';
        this.bookingEnd = '';
        this.eventType = '';
        this.contactNumber = '';
        this.grossTotal = '';
        this.netTotal = '';
        this.amountPaid = '';
        this.amountRemaining = '';
        this.totalAmountRecieved = false;
        this.items = [];
    }
}
