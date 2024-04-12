import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ComsumeService } from 'src/app/services/consume/comsume.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  productList: any[] = []

  constructor(
    private consumeService: ComsumeService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  getProducts() {
    this.consumeService.getProducts().subscribe({
      next: (resp) => this.productList = resp,
      error: (err) => this.openAlert(err)
    })
  }

  deleteProduct(id: number) {
    this.consumeService.deleteProducts(id).subscribe({
      next: () => {
        this.openToast('Producto eliminado con exito');
        this.getProducts();
      },
      error: (err) => this.openAlert(err)
    })
  }

  async openToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3500
    });
    toast.present();
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
