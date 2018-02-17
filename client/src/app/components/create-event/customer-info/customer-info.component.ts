import { Component, OnInit } from '@angular/core';
import { customerInfo } from '../../FormService/form.model'
import { FormService } from '../../FormService/form.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html'
})
export class CustomerInfoComponent implements OnInit {
  title = 'Please tell us about yourself.';
  personal: customerInfo;
  form: any;
  constructor(private formDataService: FormService) { }
  toggle: boolean = false;
  ngOnInit() {
    this.personal = this.formDataService.getPersonal();
    console.log('Personal feature loaded!');
  }

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }
    this.formDataService.setPersonal(this.personal);
    return true;
  }
  
  goToNext(form: any) {
    this.toggle=!this.toggle;
}

}
