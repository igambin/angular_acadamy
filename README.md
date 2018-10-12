# JediChat

Im Rahmen der Angular Academy werden wir zusammen eine Anwendung entwickeln. Unsere Lösungsvorschläge werden wir alle hier verewigen. Ihr könnt euch das Projekt forken um selbst mitzuarbeiten.

## Vorab
Um mit dem Projekt zu arbeiten müsst ihr vorab einige Tools installieren und einrichten, falls noch nicht geschehen.

1. [Git](https://git-scm.com/)
1. [GitHub Account anlegen](https://github.com/join)
1. [Node.js inkl npm](https://nodejs.org/en/download/) 
1. Eine IDE mit der ihr arbeiten könnt:
    - [IntelliJ oder Webstorm](https://www.jetbrains.com/) - Hier könnt ihr sofort loslegen
    - [Visual Studio Code](https://code.visualstudio.com/) - Hier müsst ihr euch selber Plugins zurechtsuchen wenn ihr Angular entwickeln wollt, das ist recht aufwändig.
1. [Google Chrome](https://www.google.de/chrome/) - Chrome hat sehr gute DevTools 

Wenn ihr alles eingerichtet habt könnt ihr das Repo klonen.
Dafür öffnet ihr euer bevorzugtes Terminal im Wunschverzeichnis und führt folgendes aus:
```console
git clone https://github.com/bzmmarvin222/angular_acadamy.git
```

Nachdem ihr es geklont habt müsst ihr noch vorab einiges an Dependencies ziehen.
```console
cd angular_acadamy
npm install
```

Jetzt seid ihr arbeitsfähig. Ihr könnt die Anwendung lokal laufen lassen unt dann unter [localhost:4200](http://localhost:4200) erreichen.
```console
npm run start
```

Optional aber empfehlenswert: Ihr könnt euch die Angular CLI global installieren. Ihr habt damit aus eurer Konsole Zugriff darauf, was zum Beispiel für das Anlegen eines neuen Projekts notwendig ist oder bestimmte Code-Templates generieren kann.
```console
npm install -g @angular/cli

//ein neues Projekt legt ihr jetzt zum Beispiel so an:
ng new projektname
```
Hierbei wird ein komplett frisches Projekt angelegt, alle Vorarbeiten die wir bereits für euch vorgenommen haben um den Einstieg zu erleichtern sind hier nicht vorhanden.

Da `npm run start` die lokal installierte CLI verwendet und eigentlich `ng serve` ausführt, könnt ihr stattdessen auch `ng serve` oder `ng serve --open` verwenden. 

# Der Content unten ist autogeneriert, den könnt ihr erstmal ignorieren.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
