import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';

@Component({
  selector: 'template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss'],
})
export class TemplateDrivenComponent {
  constructor() {}
  // capturedPhoto: string | ArrayBuffer | null = null;
  form: any;
  // handlePhotoCapture(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const file = inputElement.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.capturedPhoto = e.target?.result || '';
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onSubmit(registrationForm: any) {
    this.form = registrationForm.value;
    // console.log(console.log(registrationForm.value));
  }
}
