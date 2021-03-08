# ESGI Micro CI


### Quelques commandes pour débuter

```
$ npm ci (installe les dépendences en utilisant le package-lock.json)
$ npm start
```

### Docker

```
$ docker build -t micro-ci-front .
$ docker run -d -e PORT=1234 -p 8080:1234 --name=micro-ci-front micro-ci-front
```

La variable d'environnement PORT correspond au port qui sera ouvert par le container. Il doit être supérieur à 1024 (les 1024 premiers ports étant réservés aux super users sous linux).

Cette variable a été ajoutée pour le déploiement de l'application sur Heroku qui attribue un port dynamique au container et ne prend pas en compte le EXPOSE du Dockerfile.

### Librairies utilisées

- Angular 11
- RxJS
- [Angular Material](https://material.angular.io/components/categories)
- [FlexLayout](https://github.com/angular/flex-layout/wiki)

Ces librairies devraient être suffisantes pour les besoins du projet.

Vous pouvez toutefois ajouter les librairies que vous souhaitez tout en ayant conscience que les autres teams pourront être impactées (incompatibilité, regression, ...).

### Les conventions

Afin que les différentes feature teams puissent facilement développer sur un même projet Angular, je vous propose de respecter certaines conventions de code.

Vous êtes libre de modifier tous les fichiers du projet, pensez à vérifier qu'il n'y a pas d'impact pour les autres teams.

#### Découpage du projet en fonctionnalités
- Création d'un module à partir du dossier `app` représentant la notion métier que vous souhaitez développer.
- Le `module.ts` que vous aurez généré sera importé dans `app.module.ts`
- Le `module.ts` importera le `SharedModule`

#### Découpage des fonctionnalités en components/containers/services
- Un container représente une aggrégation de components pour former une "page" qui aura une route référencée dans le `app-routing.module.ts`
- Un container fait appel aux services afin de récupérer une donnée pour ensuite la transmettre aux components (via @Input/@Output)
- Il est possible que plusieurs feature teams travaillent sur des components différents regroupés au sein d'un même container
- Le service fera l'appel réseau en passant par le proxy Angular (proxy.config.json) en local, et la configuration nginx pour la production. Vous devez donc reporter les routes externes dans ces fichiers.
- Tous les modules de la librairie Angular Material que vous souhaitez utiliser seront référencés dans `material.module.ts`
- De manière générale, un module pouvant être partagé au sein des différents containers/components doit être exporté dans le `SharedModule` ou avoir son module comme `material.module.ts`

```
app
|-- core
|-- sample-logic
    |-- components
        |-- search
            |-- search.component.html
            |-- search.compoent.scss
            |-- search.component.ts
    |-- container
        |-- sample.container.html
        |-- sample.container.scss
        |-- sample.container.ts
    |-- services
        |-- search.service.ts
    |-- index.ts
    |-- sample.module.ts
|-- shared
```
Logo : https://mybrandnewlogo.com/
