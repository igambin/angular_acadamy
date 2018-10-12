# Data Binding und Template Syntax
Data Binding beschreibt das Binden von Variablen/ Objekten and HTML Elemente innerhalb des Templates. Hierzu zählt die reine Anzeige sowie auch bearbeitbare Bindings für zum Beispiel Formulare, aber auch das setzen von bspw. Attributen oder Klassen.
Es wird unterschieden zwischen One-Way und Two-Way Bindings. Der Expression/Statement Kontext ist per default immer die zugrunde liegende Komponente, man kann aber auch Template Variablen verwenden. Das heißt, dass globale und statische Objekte und Funktionen nicht verfügbar sind(z.B. `console`).

Beispiele beziehen sich auf folgenden Code als Datenquelle: 
```typescript
export class User {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// Komponente
export class FooComponent {
    public user: User = new User('Klaus Muster', 42);
    public imgSrc: string = 'https://foo.bar/img.png';
}
```
## One-Way
Hier gibt es innerhalb der Doku nochmals eine Unterteilung.

#### Source => View
Hier werden Daten gelesen und zur Anzeige verwendet.
Es sind grundsätzlich alle möglich Expressions erlaubt, Angular wird diese nach bekannten Regeln zu einem string auswerten.
```html
<span>
    My name is {{user.name}}.
    I am {{user?.age}} years old. <!-- ? Operator -> null/undefined check-->
</span>

<span>{{1 + 1}}</span>
<span>{{1 + doMaths()}}</span>

<!--Verboten-->
<div>
    {{new User('Bitte nicht nachmachen', 1337)}}
    {{getValue(); getAnotherValue()}}
    {{user.age++}}
    {{user.age = 50}}
</div>
```

#### View => Source (Event Binding)
Hier ist es anders herum, Daten aus der Anzeige werden geschrieben. Hier handelt es sich meist um Statements oder Events.
Die zum Event gehörenden Informationen sind nur für den einen Aufruf verfügbar und müssen darin verarbeitet werden.
```html
<button (click)="increaseAgeByOne()">
    Happy Birthday {{user.name}}! 
</button>

<button (customEvent)="doCustomStuff($event)">
    Do Custum Stuff with data passed to Method!
</button>
```

```typescript
export class FooComponent {
    public user: User = new User('Klaus Muster', 42);
    public imgSrc: string = 'https://foo.bar/img.png';
    
    public increaseAgeByOne(): void {
        this.user.age++;
    }
    
    public doCustomStuff(event: number): void {
        this.user.age = event;
    }
}
```

## Two-Way
Hier wird auf eine Variable sowohl lesend auch als schreibend zugegriffen. Dies wird üblicherweise bei Eingabefeldern genutzt. Hier würde bei Änderung des Feldes der Inhalt der Variablen neu gesetzt, aber auch die Anzeige angepasst wenn der Inhalt anderweitig geändert wurde.
FormsModule import notwendig.
```html
<input type="text" [(ngModel)]="user.name">
<button (click)="increaseAgeByOne()">
    Happy Birthday {{user.name}}! 
</button>
```

# Property, Attribute Binding
Es ist möglich, HTML Properties zu binden.
```html
<!--Kein Binding, src hat den Wert 'imgSrc' und kann nicht verändert werden-->
<img src="imgSrc">
<!--Mit Binding, die untere Variante sollte verwendet werden-->
<img src="{{imgSrc}}">
<img [src]="imgSrc">


<!--Die häufigsten UseCases-->
<!--Button wird disabled-->
<button [disabled]="isDisabled">Disabled</button>

<!--setzt die Klasse auf den Wert in class, muss jedoch alle Klassen beinhalten-->
<!--besser ist jedoch die Directive ngClass-->
<div [class]="class"></div>
<!--setzt die Klasse active wenn die variable true hält-->
<div [class.active]="boolVariable"></div>
```

# Structural Directives
In Angular gibt es 3 Arten von Directives. Die sog. "Attribute Directives" manipulieren das Verhalten oder Aussehen eines bestehenden DOM-Elements.
Sogenannte "Components" beinhalten Template, Styling und Logik. Die "Structural Directives", welche hier erläutert werden, manipulieren Elemente im DOM dahingehend, dass sie hinzugefügt oder entfernt werden.

Es gibt 3 erwähnenswerte Structual Directives:
## ng-if
Diese Direktive fügt dem DOM ein Element hinzu und entfernt es wieder. Es wird an einen boolschen Wert gebunden.
```html
<div *ngIf="isVisible">
    I am only in the DOM if isVisible === true
</div>
```

## ng-for
Diese Direktive iteriert über ein Array und fügt für jedes Element das iterierte Template in den DOM ein
```html
<!--elems = [1,2,3,4]-->
<div *ngFor="let elem of elems" [class]="elem">
    {{elem}}
</div>

<!--result-->
<div class="1">
    1
</div>
<div class="2">
    2
</div>
<div class="3">
    3
</div>
<div class="4">
    4
</div>
```

## ng-switch
Diese Direktive fügt das erste Element welches den Case entspricht dem DOM hinzu
```html
<!--elem = 2-->
<div [ngSwitch]="elem">
    <div *ngSwitchCase="1">1</div>
    <div *ngSwitchCase="2">2</div>
    <div *ngSwitchDefault>default</div>
</div>
```
