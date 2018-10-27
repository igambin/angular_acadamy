# Pipes und Services

## Pipes

Pipes dienen dazu, einen Input entgegenzunehmen und ihn in einen Output zu transformieren. Manche Pipes verhalten sich unterschiedlich entsprechend der eingestellten Sprache für die App. Die Sprache kann im AppModule angepasst werden.

```typescript
...
// New Imports
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
...
// Register locale data for german language
registerLocaleData(localeDe, 'de');

...
// Add LOCALE_ID to providers
providers: [
    { provide: LOCALE_ID, useValue: 'de' },
],
...
```

Diese Anpassung beeinflusst beispielsweise die DatePipe, CurrencyPipe, DecimalPipe und PercentPipe.

### DatePipe

Die DatePipe nimmt ein Datum vom Datentyp Date entgegen (Input) und gibt es in einem für den Benutzer lesbaren Format als String zurück (Output).

Beispiel für die einfache Verwendung einer DatePipe:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<p>Heute ist der {{ today | date }}</p>`
})
export class AppComponent {
  today = new Date();
}
```

Beispiel für eine erweiterte Verwendung der DatePipe inklusive Pipe-Chaining mit der UppercasePipe:
```
template: `
  <p>Heute ist der {{ today | date:"longDate" | uppercase }}.</p>
  <p>Es ist {{ today | date:"H:mm:ss"}} Uhr!</p>
  `
```

### CurrencyPipe

Die CurrencyPipe dient dazu, einen Zahlenwert entgegenzunehmen und diesen als lesbaren Währungsbetrag darzustellen. Ein erzeugter String, der den Zahlenwert als Währungsbetrag darstellt, wird von der Pipe als Output zurückgegeben.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<p>Der Preis beträgt {{ price | currency:"EUR" }} </p>`
})
export class AppComponent {
  price = 1000.95;
}
```

### DecimalPipe

Die DecimalPipe dient zur Konvertierung von Zahlenwerten in ein entsprechendes Zahlenformat.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<p>Zahl mit drei Vorkommastellen und maximal 5. Nachkommastellen: {{ pi | number:"3.0-5"}}</p>`
})
export class AppComponent {
  pi = Math.PI;
}
```

### JsonPipe

Die JsonPipe erlaubt es, JSON-Objekte als String auszugeben. Sie eignet sich damit gut zum Debuggen.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>Array: {{ array | json}}</p>
    <p>Object: {{ obj | json}}</p>
  `
})
export class AppComponent {
  array = ['Hallo', 'Welt'];
  obj = {firstname: 'Bob', lastname: 'Marley'};
}
```

### Verwendung einer Pipe in TypeScript

Neben der Verwendung von Pipes in Angular Templates lassen sie sich auch im TypeScript verwenden.
```typescript
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <p>Preis: {{money}}</p>
  `
})
export class AppComponent implements OnInit {
  money: number;
  private _money = 1000.95;
  
  constructor(private currencyPipe: CurrencyPipe) {}
  
  ngOnInit(): void {    
    this.money = this.currencyPipe.transform(this._money, 'EUR');
  }
}
```

### Eigene Pipe erzeugen

Eine eigene Pipe lässt sich mit dem Angular CLI Befehl `ng generate pipe PIPE_NAME` erzeugen. Es handelt sich um eine TypeScript Klasse, die um die Pipes Annotation erweitert wird. Der Name in der Annotation dient der Verwendung im Angular Template. Es wird das PipeTransform Interface implementiert, das eine transform Methode erfordert.
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(value: string, seperator?: string): string {
    return value
      .split(' ')
      .map(part => part.slice(0, 1).toUpperCase())
      .join(seperator || '')
      .concat(seperator || '');
  }
}

// Im Angular Template
<p>{{name | initials:'.'}}</p>
```

## Services

Ein Service dient dazu, eine spezifische Funktionalität innerhalb der App bereitzustellen. Er bietet eine hervorragende Möglichkeit, um Logik zu kapseln und in mehreren Komponenten, Direktiven, Pipes oder anderen Strukturen zu verwenden. Sie können sogar in anderen Services wiederverwendet werden. Services können mit Hilfe der Dependency Injection an diese Strukturen übergeben werden. Dadurch müssen wir uns keine Gedanken darüber machen, wie der Service zu Erzeugen ist. Angular nimmt uns diese Arbeit ab.

Beispiel für die Bereitstellung und Verwendung des HttpClient Services. HttpClientModule muss im AppModule importiert werden.
```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <p *ngFor="let person of people">{{person.name}}</p>
  `
})
export class AppComponent implements OnInit {
  people: any[] = [];
  
  constructor(private httpClient: HttpClient) {}
  
  ngOnInit(): void {
    this.httpClient.get<{results: {name: string}[]}>('https://swapi.co/api/people').subscribe(resolve => {
      this.people = resolve.results;
    });
  }
}
```

Ein Service ist eine normale TypeScript Klasse, der um die Annotation @Injectable() erweitert wird. Ein Service lässt sich mit der Angular CLI mit dem Befehl `ng generate service SERVICE_NAME` erzeugen.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Erzeugt Service auf Root-Level, der in der gesamten App geshared wird.
})
export class LoggerService {

  constructor() { }
  
  public log(message: string, ...args): void {
    console.log(`LOG: ${message}`, ...args);
  }
  public info(message: string, ...args): void {
    console.log(`INFO: ${message}`, ...args);
  }
  public error(message: string, ...args): void {
    console.log(`ERROR: ${message}`, ...args);
  }
}

```

Statt der Bekanntmachung durch providedIn kann ein Service auch in einem Modul oder in einer Komponente bekanntgemacht werden und ist dann nur dort verfügbar.
