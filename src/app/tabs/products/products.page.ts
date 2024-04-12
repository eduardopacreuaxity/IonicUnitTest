import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ComsumeService } from 'src/app/services/consume/comsume.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  productList: any[] = []
  constructor(
    private consumeService: ComsumeService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  getProducts() {
    this.consumeService.getProducts().subscribe({
      next: (resp) => this.productList = resp,
      error: (err) => this.openAlert(err)
    })
  }

  async openAlert(err: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'A ocurrido un error inesperado: ' + err.status,
      buttons: [
        { text: 'Ok' },
      ]
    });
    alert.present();
  }

}
