import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';

const CreditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
export const VisaOrMasterCard: (ctrl: FormControl) => (ValidationErrors | null) = (ctrl: FormControl): ValidationErrors | null => {
  const asString: string = '' + ctrl.value;
  const sanitized: string = asString.replace(/ /g, '');
  if (CreditCardRegex.test(sanitized)) {
    return null;
  }
  return {'invalidCreditCard': 'This is not a valid Credit Card Number.'};
};

export const BruttoNetto = (grp: FormGroup): ValidationErrors | null =>  {
  const brutto = grp.get('brutto');
  const netto = grp.get('netto');

  if (+brutto.value > +netto.value) {
    return null;
  }
  return {'invalidBruttoNetto': 'Brutto cannot be lower than Netto.'};
};
