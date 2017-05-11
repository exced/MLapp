import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CRUDPage } from '../crud/crud';
import { InfoPage } from '../info/info';
import { DataService } from '../../providers/data.service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-train',
  templateUrl: 'train.html',
})
export class TrainPage {

  datas: any[] = []; // datas {name, thumbnail}

  constructor(public navCtrl: NavController, public dataService: DataService, public toastCtrl: ToastController) {
    this.loadDatas();
  }

  /**
   * load datas from service
   */
  loadDatas() {
    this.datas = this.dataService.getDatas();
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
   * Bird Searchbar filter by names
   */
  onGetBird(ev: any) {
    // Reset items back to all of the birds
    this.loadDatas();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.datas = this.datas.filter((data) => {
        return (data.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /**
   * Handle click on add : navigate to CRUD page
   */
  onClickAddData(data) {
    this.navCtrl.push(CRUDPage, {
      item: data
    });
  }

  /**
   * Handle click on info : navigate to Info page
   */
  onClickInfoData(data) {
    this.navCtrl.push(InfoPage, {
      item: data
    });
  }

  /**
   * Handle click on Train : ask server to train.
   */
  onClickTrain() {
    this.dataService.train()
      .then((data) => {
        this.showToastBottom(data['msg']);
      });
  }

}
