import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsPage } from './products.page';
import { ComsumeService } from 'src/app/services/consume/comsume.service';
import { Observable, of, throwError } from 'rxjs';
import { AlertController, IonicModule } from '@ionic/angular';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let alertCtrl: AlertController
  let alertCtrlSpy: any;
  let alertSpy: any;
  let comsumeServiceSpy: jasmine.SpyObj<ComsumeService>;
  let fixture: ComponentFixture<ProductsPage>;
  const productResponse = [
    {
      "name": "melon",
      "description": "La descripcion del melon",
      "id": 9
    }
  ]

  beforeEach(async () => {
    comsumeServiceSpy = jasmine.createSpyObj<ComsumeService>('ComsumeService', ['getProducts']);
    /*comsumeServiceSpy.getProducts.and.returnValue(new Observable(observer => {
      observer.next(productResponse);
      observer.complete();
    }));*/
    comsumeServiceSpy.getProducts.and.returnValue(of(productResponse));

    alertSpy = jasmine.createSpyObj('Alert', ['present']);
    alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
    alertCtrlSpy.create.and.returnValue(Promise.resolve(alertSpy));

    await TestBed.configureTestingModule({
      declarations: [ProductsPage],
      imports: [
        IonicModule
      ],
      providers: [
        //{ provide: ComsumeService, useClass: comsumeServiceSpy }
        { provide: ComsumeService, useValue: comsumeServiceSpy },
        { provide: AlertController, useValue: alertCtrlSpy }
      ]
    }).compileComponents();

    alertCtrl = TestBed.inject(AlertController)

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products', () => {
    component.productList = [];
    component.getProducts();
    expect(component.productList.length).toBe(1);
  });

  it('should get products - error in service', () => {
    spyOn(component,'openAlert').and.callThrough();
    comsumeServiceSpy.getProducts.and.returnValue(throwError(() => productResponse));
    component.productList = [];
    component.getProducts();
    expect(component.productList.length).toBe(0);
    expect(component.openAlert).toHaveBeenCalled();
  });

  /*it('should open alert', () => {
    spyOn(alertCtrl, 'create').and.callFake(() => {
      return Promise.resolve(new HTMLIonAlertElement())
    })
    component.openAlert({ status: 0 });
    expect(alertCtrl.create).toHaveBeenCalled();
  });*/

  it('should open alert', () => {
    component.openAlert({ status: 0 });
    expect(alertCtrlSpy.create).toHaveBeenCalled();
  });
});
