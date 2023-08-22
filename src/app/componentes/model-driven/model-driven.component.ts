import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Customer } from 'src/app/interfaces/customer';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'model-driven',
  templateUrl: './model-driven.component.html',
  styleUrls: ['./model-driven.component.scss'],
})

export class ModelDrivenComponent {
  customerForm: FormGroup;
  languages = ['English', 'Spanish', 'French'];
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  @ViewChild('fileInputRef', { static: false }) fileInputRef!: ElementRef<HTMLInputElement>;
  isLoadingImage: Boolean = false;
  fileInputError: string | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      preferredLanguage: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      faceImage: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const customerData: Customer = this.customerForm.value;
      console.log('Submitted Customer Data:', customerData);
    }
  }

  onImageChange(event: Event) {
    this.isLoadingImage = true;
    const startLoadingTime = Date.now();
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.customerForm.patchValue({ faceImage: e.target?.result || '' });
        const finishLoadingTime = Date.now();
        if (finishLoadingTime - startLoadingTime < 3000) {
          setTimeout(() => {
            this.isLoadingImage = false;
          }, 3000 - (finishLoadingTime - startLoadingTime))

        } else this.isLoadingImage = false;
      };
      reader.readAsDataURL(file);
    }
  }

  nativeInputClick() {
    this.fileInputRef.nativeElement.click();
  }

  onFileError() {
    this.fileInputError = 'An error occurred with uploading the image. Please try again.';
  }
}
