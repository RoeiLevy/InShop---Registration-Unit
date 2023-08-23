import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModelDrivenComponent } from './model-driven.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModelDrivenComponent', () => {
  let component: ModelDrivenComponent;
  let fixture: ComponentFixture<ModelDrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelDrivenComponent],
      imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when submitted with valid data', () => {
    const fullNameControl = component.customerForm.get('fullName');
    const preferredLanguageControl = component.customerForm.get('preferredLanguage');
    const phoneNumberControl = component.customerForm.get('phoneNumber');
    const faceImageControl = component.customerForm.get('faceImage');

    fullNameControl?.setValue('John Doe');
    preferredLanguageControl?.setValue('English');
    phoneNumberControl?.setValue('1234567890');
    faceImageControl?.setValue('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBD…');

    expect(component.customerForm.valid).toBeTruthy();
  });  

});
