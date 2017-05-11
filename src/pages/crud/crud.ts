import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data.service';
import { ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-crud',
  templateUrl: 'crud.html'
})
export class CRUDPage {

  fields: any[];
  class: string;
  input: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService,
    public toastCtrl: ToastController, public formBuilder: FormBuilder) {
    // init fields
    this.fields = dataService.getFields();
    // init class
    this.class = this.navParams.get('item').name;
    // init form builder
    this.initForm();
  }

  initForm() {
    var o = {};
    this.fields.map((field) => {
      o[field.field] = ['', Validators.required]
    });
    this.input = this.formBuilder.group(o);
  }

  showToastBottom(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    });

    toast.present(toast);
  }

  /**
   * Register the new data.
   */
  onClickAdd() {
    var input = {
      input: [],
      output: this.class
    };
    this.fields.map(field => {
      input.input.push(this.input['_value'][field.field]);
    });
    this.dataService.addData(input)
      .then((data) => {
        this.showToastBottom(data['msg']);
      });
  }

}
