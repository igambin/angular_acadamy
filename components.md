# Komponenten

## Aufbau

Bisher haben wir die vollständige Darstellung der Anwendung innerhalb einer einzigen Klasse durchgeführt. Diese Klasse stellt eine Angular Komponente dar. Mit Hilfe der Annotation `@Component` inklusive des an diese Stelle übergebene Konfigurationsobjekt sorgt Angular im Hintergrund unter anderem dafür, dass Template-, Styling- und TypeScript-Dateien miteinander verknüpft werden. Komponenten stellen in Angular die Blöcke dar, mit denen eine Applikation aufgebaut wird. Sie sorgen für die Anzeige von Daten auf dem Bildschirm und reagieren auf Benutzereingaben. Bei Erzeugung eines neuen Angular Projekts wird bereits eine Komponente für uns erzeugt, die den Namen `AppComponent` trägt. Eine Komponente besteht in den meisten Fällen aus drei Dateien. Für die `AppComponent` sind dies beispielsweise:

1. `app.component.ts` — Der Klassenquellcode, geschrieben in TypeScript.
2. `app.component.html` — Das Template, geschrieben in HTML.
3. `app.component.css` — Das Styling, geschrieben in CSS.

In der TypeScript Datei bereiten wir die Daten für die Anzeige auf dem Bildschirm vor und bestimmen, wie auf Benutzereingaben reagiert werden soll. In der Template Datei entscheiden wir, in welcher Form die Daten auf dem Bildschirm ausgegeben werden sollen und an welcher Stelle Benutzereingaben entgegen genommen werden. In der Style Datei stylen wir die von uns im Template bestimmte Form und die entsprechenden Daten. Die Namen der Datei können zwar beliebig gewählt werden, jedoch hat sich in Angular dieser Standard durchgesetzt, der im [Angular StyleGuide](
) näher beschrieben wird. Grundsätzlich sollte ein Prefix gewählt werden, um anderen Teams, Bibliothekenanbietern oder Webkomponenten nicht in die Quere zu kommen, gefolgt vom kleingeschriebenen Namen der Komponente. Anschließend folgt durch einen Punkt getrennt der Typ-Bezeichner (hier `component`) und zuletzt folgt ebenfalls durch einen Punkt getrennt die Dateiendung. Mehrere Wörter werden durch Bindestriche getrennt. Die Struktur sieht also folgendermaßen aus: `prefix-name-aus-mehreren-woertern.typ.endung`

Das zuvor angesprochene Konfigurationsobjekt in der TypeScript Datei sorgt dafür, dass Angular die unterschiedlichen Dateien als eine Komponente erkennt. `templateUrl` zeigt auf die html-Datei, styleUrls stellt ein Array dar, in welchem auf die unterschiedlichen Styling-Dateien gezeigt wird. Der `selector` dient dazu die Komponente später aus anderen Komponenten heraus ähnlich wie ein HTML-Element in das Template einbinden zu können. Ebenfalls nennenswert in Zusammenhang mit der TypeScript-Datei ist, dass die Klasse der Komponente exportiert werden muss, da sie an anderer Stelle noch dem Modul `AppModule` zugeordnet werden muss. Dies hat die Angular CLI bereits für die `AppComponent` getan, wie wir folgend in einem kleinen Exkurs sehen werden.

## Exkurs NgModule

In der Datei `app.module.ts` befindet sich das `AppModule`, welches das Hauptmodule der Anwendung darstellt. Dieses dient Angular als Einstiegspunkt in den Code unserer Komponenten und andere Angular-Strukturen. Das Modul wird beim Aufruf unserer Anwendung gebootstrapped, was in der Datei `main.ts` stattfindet. Das Angular Modul (NgModule) wird meistens durch eine leere Klasse dargestellt, welche die Annotation @NgModule enthält, in der die Konfiguration vorgenommen wird. Hauptaufgabe des NgModules ist es, verschiendene Angular-Strukturen für den Compiler zu registrieren. Außerdem sorgen sie dafür, dass die DependencyInjection vernünftig arbeiten kann. Das Konfigurationsobjekt bestitzt mehrere Attribute. Über das imports-Array können weitere NgModules in die Applikation eingebunden werden. Über das exports-Array können im aktuellen Modul registrierte Angular-Strukturen anderen Modulen zur Verfügung gestellt werden. Im declarations-Array werden Komponenten, Direktiven und Pipes registriert, damit diese im Template anderer Komponenten eingesetzt werden können. Diese Angular-Strukturen dürfen nur in einem einzigen Modul registriert werden. An dieser Stelle finden wir auch unser `AppModule wieder, das durch die Angular CLI bereits mit dem Modul bekannt gemacht wurde. Im providers-Array werden Services registriert, die im kompletten Modul inklusive ihrer registrierten Elemente zur Verfügung stehen sollen. Auf Services wird in der an diesen Workshop anknüpfenden Learning Group näher eingegangen. Zusammenfassend gesagt sollten Strukturen wie Komponenten, Direktiven und Pipes möglichst wenig Business-Logik beinhalten, weshalb sie in Services ausgelagert wird. Ferner erlauben Services die Wiederverwendung dieses Codes in mehreren Komponenten, Direktiven oder Pipes. Das bootstrap-Array beinhaltet die Einstiegskomponente der Anwendung. Zuletzt gibt es das entryComponents-Array auf das wir hier jedoch nicht näher eingehen werden.

## Sichtbarkeit von Attributen und Methoden im Template

Nun zurück zu den Komponenten. In der TypeScript-Datei der Komponente können wir Methoden und Attribute deklarieren, die im Template wiederverwendet werden. Hier ist darauf zu achten, dass wenn diese auf private oder protected gesetzt werden, in späteren Produktiv-Builds nicht mehr im Template verwendet werden können. Daher sollten im Template verwendete Methoden und Attribute als public definiert werden. Da in TypeScript alle Methoden und Attribute einer Klasse public sind, solange sie nicht explizit als private oder protected deklariert werden, kann auf das explizite Setzen des public Flags verzichtet werden.

## Eltern-/Kind-Komponenten

Komponenten können in ihrem Template andere Komponenten wiederverwenden. Dadurch gehen sie eine Eltern-Kind Beziehung ein. Eine Komponente kann mit ihrer Eltern-Komponente durch Inputs und Outputs kommunizieren. Die Kind-Komponente deklariert Inputs und Outputs in ihrer TypeScript-Datei, während die Eltern-Komponente über ihr eigenes Template mit den Inputs und Outputs interagieren kann. Somit braucht eine Kind-Komponente keinerlei Kenntnisse über das Umfeld, in dem sie eingesetzt wird, was zu einer unidirektionalen Abhängigkeit führt. Mit der `AppComponent` als Root-Komponente lässt sich dadurch eine Baumstruktur an Komponenten aufbauen, in denen die Abhängigkeiten nur in eine Richtung verlaufen.

Komponenten können beliebig viele andere Komponenten beliebig oft in ihrem Template einbinden. Gehen wir davon aus, dass wir eine `ChatListComponent` und eine `ChatMessageComponent` geschrieben haben. Wir haben nun in unserer `ChatListComponent` ein Attribut `messages`, welches ein Array an Nachrichten vom Typ `string` enthält. Die ChatMessageComponent besitzt das Input `@Input() chatMessage: string`. Nun lassen sich die `messages` der `ChatListComponent` wie folgt als `ChatMessageComponent`s darstellen:

chat-list.component.html

```
<h1>Mein Chat</h1>

<chat-message *ngFor="let message of messages" [chatMessage]="message"></chat-message>

<input placeholder="Nachricht eingeben..."><button (click)="sendMessage()">Senden</button>
```

## Inputs

Ein Attribut innerhalb einer Komponente wird als Input deklariert, indem es um die Annotation `@Input` ergänzt wird. Ein Input könnte also wie folgt aussehen: `@Input('attributNameVonaussen') attributName: string;`. Wie im Beispiel zu sehen kann der Input innerhalb der Annotation um einen Namen ergänzt werden, über den Eltern-Komponenten dieses Attribut befüllen können. Diese Angabe ist optional und falls nicht gesetzt, wird der Attributname als Name verwendet.

Die Eltern-Komponente kann nun den Input der Kind-Komponente im Template durch beispielsweise ein eigenes Attribut befüllen: `<my-child-component [attributNameVonaussen]="einElternAttribut"></my-child-component>`.

## Outputs

Mit Hilfe von Outputs kann eine Komponente ihr Umfeld über definierte Ereignisse informieren. Dies geschieht über `EventEmitter`. Ein Output wird wie folgt deklariert: `@Output() eventName = new EventEmitter<boolean>();`. Auch hier lässt sich wieder ein alternativer Name für den Zugriff durch eine Eltern-Komponente wählen. Wird innerhalb der Komponente die `emit`-Methode des `EventEmitter`s aufgerufen, dann wird der an die Methode übergebene Wert als Event nach außen gereicht, worauf Eltern-Komponenten reagieren können. Ein Aufruf könnte wie folgt aussehen: `this.eventName.emit(false);`.

Die Eltern-Komponente kann nun auf die Outputs reagieren, indem im Template eigene Methoden an die Outputs der Kind-Komponente gebunden werden. Dies funktioniert so: `<my-child-component (eventName)="parentMethod($event)"></my-child-component>`. Über das Symbol `$event` kann der vom Output ausgegebene Wert referenziert werden. Dieser wird im Beispiel als Eingabeparameter an die Methode `parentMethod(value: boolean){...}` der Eltern-Komponente übergeben. Jedes Mal wenn die Kind-Methode ein Event über den Output sendet, dann wird die gebundene Methode in der Eltern-Komponente aufgerufen.

## Quellen
* [Tutorial - Angular Application Shell - Angular Components](https://angular.io/tutorial/toh-pt0#angular-components)
* [Tutorial - Master/Detail Components](https://angular.io/tutorial/toh-pt3)
* [Fundamentals - Components & Templates - Component Interaction](https://angular.io/guide/component-interaction)
* [Fundamentals - NgModules - NgModules Introduction](https://angular.io/guide/ngmodules)
* [Fundamentals - NgModules - NgModule API](https://angular.io/guide/ngmodule-api)
