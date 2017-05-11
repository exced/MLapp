import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data.service';
import { ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  datas: any[] = []; // datas {name, thumbnail}
  classes: any[];
  fields: any[];
  input: FormGroup;
  results: any[];
  showResult = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService,
    public toastCtrl: ToastController, public formBuilder: FormBuilder) {
    this.classes = dataService.getClasses();
    // init fields
    this.fields = dataService.getFields();
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
   * Predict the class of the data.
   */
  onClickPredict() {
    var input = {
      input: []
    };
    this.fields.map(field => {
      input.input.push(this.input['_value'][field.field]);
    });
    this.dataService.predict(input)
      .then((data) => {
        // compute best score.
        var iBest = data['data'].indexOf(Math.max(...data['data']));
        this.results = [];
        this.classes.forEach((e, i, a) => {
          this.results.push({
            name: e,
            score: data['data'][i],
            best: (iBest == i) 
          });
        });
        this.showResult = true;
        this.showToastBottom(data['msg']);
      });
  }

}
