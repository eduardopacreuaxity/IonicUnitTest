import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPage } from './form.page';
import { Router, RouterModule } from '@angular/router';
import { HomePage } from '../home/home.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FormPage', () => {
  let component: FormPage;
  let router: Router;
  let fixture: ComponentFixture<FormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPage],
      imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
          { path: 'home', component: HomePage }
        ])
      ]
    }).compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(FormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should terms form be valid', () => {
    component.form.controls['terms'].setValue(true);
    component.form.updateValueAndValidity();
    expect(component.form.controls['terms'].valid).toBeTrue();
  });

  it('should terms form be invalid', () => {
    component.form.controls['terms'].setValue(false);
    component.form.updateValueAndValidity();
    expect(component.form.controls['terms'].valid).toBeFalse();
  });

  it('should terms2 form be valid', () => {
    component.form.controls['terms2'].setValue(true);
    component.form.updateValueAndValidity();
    expect(component.form.controls['terms2'].valid).toBeTrue();
  });

  it('should terms2 form be invalid', () => {
    component.form.controls['terms2'].setValue(false);
    component.form.updateValueAndValidity();
    expect(component.form.controls['terms2'].valid).toBeFalse();
  });

  it('should radio form be valid', () => {
    component.form.controls['radio'].setValue('apples');
    component.form.updateValueAndValidity();
    expect(component.form.controls['radio'].valid).toBeTrue();
  });

  it('should radio form be invalid', () => {
    component.form.controls['radio'].setValue(null);
    component.form.updateValueAndValidity();
    expect(component.form.controls['radio'].valid).toBeFalse();
  });

  it('should select form be valid', () => {
    component.form.controls['select'].setValue(['apples']);
    component.form.updateValueAndValidity();
    expect(component.form.controls['select'].valid).toBeTrue();
  });

  it('should select form be invalid', () => {
    component.form.controls['select'].setValue([]);
    component.form.updateValueAndValidity();
    expect(component.form.controls['select'].valid).toBeFalse();
  });

  it('should redirect to home', () => {
    spyOn(router, 'navigate').and.callThrough();
    component.goTo('home');
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});
