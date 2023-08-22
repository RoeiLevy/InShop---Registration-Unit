import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/interfaces/customer';
@Component({
  selector: 'model-driven',
  templateUrl: './model-driven.component.html',
  styleUrls: ['./model-driven.component.scss'],
})
export class ModelDrivenComponent {
  customerForm: FormGroup;
  languages = ['English', 'Spanish', 'French']; // Example preferred languages

  constructor(private formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      preferredLanguage: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      faceImage: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const customerData: Customer = this.customerForm.value;
      console.log('Submitted Customer Data:', customerData);
      // You can perform further actions with the customer data
    }
  }

  onImageChange(event: Event) {
    // const inputElement = event.target as HTMLInputElement;
    // const file = inputElement.files?.[0] || null;
    // this.customerForm.patchValue({ faceImage: file });
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.customerForm.patchValue({ faceImage: e.target?.result || '' });
        // this.capturedPhoto = e.target?.result || '';
      };
      reader.readAsDataURL(file);
    }
  }
}