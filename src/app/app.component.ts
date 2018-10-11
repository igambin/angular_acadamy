import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {BruttoNetto, VisaOrMasterCard} from './validation';
import {combineLatest, Observable} from 'rxjs';

@Component({
  selector: 'jc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public signUpForm: FormGroup;
  public abgaben$: Observable<number>;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.signUpForm = this._fb.group({
      name: ['', Validators.required],
      planet: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(16), Validators.max(99)]],
      mail: ['', [Validators.required, Validators.email]],
      creditCard: ['', [Validators.required, VisaOrMasterCard]],
      hasNoCreditCard: false,
      brutto: [12000, [Validators.required, Validators.min(1000), Validators.max(50000)]],
      netto: [4000, [Validators.required, Validators.min(0)]],
      hasPet: false,
      petName: ['', Validators.required],
      petType: ['', Validators.required],
    }, {validator: BruttoNetto});

    const noCreditCard: FormControl = this.signUpForm.get('hasNoCreditCard') as FormControl;
    const creditCard: AbstractControl = this.signUpForm.get('creditCard');
    this.toggleDisabledByBooleanControl(noCreditCard, false, creditCard);

    const hasPet = this.signUpForm.get('hasPet') as FormControl;
    const petName: AbstractControl = this.signUpForm.get('petName');
    const petType: AbstractControl = this.signUpForm.get('petType');
    this.toggleDisabledByBooleanControl(hasPet, true, petName, petType);

    this.initTaxCalculation();
  }

  public reset(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.signUpForm.reset({
      name: '',
      planet: '',
      gender: '',
      age: '',
      mail: '',
      creditCard: '',
      hasNoCreditCard: false,
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

  // careful with code like this! the subscriptions are not handled here!
  private toggleDisabledByBooleanControl(ctrlToToggleBy: FormControl, reversed: boolean, ...controlsToToggle: AbstractControl[]): void {
    ctrlToToggleBy
      .valueChanges
      .pipe(
        startWith(ctrlToToggleBy.value),
        map((notTyped: any) => !!notTyped),
        map((nowTyped: boolean) => reversed !== nowTyped)
      )
      .subscribe((checked: boolean) => {
          if (checked) {
            controlsToToggle.forEach(ct => ct.disable());
          } else {
            controlsToToggle.forEach(ct => ct.enable());
          }
        }
      );

  }

  private initTaxCalculation(): void {
    const bruttoCtrl: FormControl = this.signUpForm.get('brutto') as FormControl;
    const nettoCtrl: FormControl = this.signUpForm.get('netto') as FormControl;

    const brutto$: Observable<number> = bruttoCtrl.valueChanges.pipe(startWith(bruttoCtrl.value), map((notTyped: any) => +notTyped));
    const netto$: Observable<number> = nettoCtrl.valueChanges.pipe(startWith(nettoCtrl.value), map((notTyped: any) => +notTyped));

    this.abgaben$ = combineLatest(brutto$, netto$)
      .pipe(
        map(([brutto, netto]: [number, number]) => netto / brutto),
        map(factor => factor * 100)
      );
  }
}
