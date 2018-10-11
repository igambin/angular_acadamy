import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'jc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.signUpForm = this._fb.group({
      name: '',
      planet: '',
      gender: '',
      age: '',
      mail: '',
      creditCard: '',
      hasCreditCard: false,
      brutto: 12000,
      netto: 4000,
      tax: '',
      hasPet: false,
      petName: '',
      petType: ''
    });
  }

  public reset(): void {
    this.signUpForm.reset({
      name: '',
      planet: '',
      gender: '',
      age: '',
      mail: '',
      creditCard: '',
      hasCreditCard: false,
      brutto: 12000,
      netto: 4000,
      tax: '',
      hasPet: false,
      petName: '',
      petType: ''
    });
  }

  public submit(): void {
    alert('submitted');
  }
}
