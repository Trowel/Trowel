# Concept de Trowel

## La problématique actuelle

Je suis parti du constat qu'au travers des différents projets de l'agence, il y avait des patterns visuels commun, avec pour différence les couleurs ou les modèles de boite.

Les gros frameworks CSS comme bootstrap, foundation, mdl, etc... proposent une liste exhaustive de composants que l'on peut ensuite modifier via des variables en LESS/SASS. Mais j'ai un soucis dans la manière dont on peut personnaliser ces composants pour les besoins spécifiques de chaque projets.

Par exemple avec bootstrap, les boutons ont 7 thèmes et 4 tailles disponibles. Mais il peut arriver pour un projet que les boutons n'aient besoin que de 3 thèmes et 2 tailles. Il peut aussi arriver que certains boutons aient une bordure et d'autres non. Aujourd'hui il n'y a pas de moyens pour bootstrap ou foundation de ne gérer que les thèmes nécessaire ou de facilement via variables créer d'autres thèmes avec une sémantique différente.

Je pourrais faire face à ces problèmes, en modifiant les sources de bootstrap pour chaque projet afin de mettre une variable pour les `border-width` ou enlever des thèmes de boutons inutiles, mais cela me forcerait de versionner toutes les sources de bootstrap.


## Le concept

Du coup pour faire face a ce problème, j'ai pensé a un pattern en SASS qui permettrait d'écrire des repos de composant graphique en étant 100% personnalisable.

Prenons un bouton simple :

``` scss
$btn--font-size: 1rem;
$btn--background-color: rgb(255, 0, 0);

.btn {
    font-size: $btn--font-size;
    background-color: $btn--background-color;
    @include trowel-variable('background-color', $btn--background-color);
}
```

Si je veux créer un thème "success" pour faire des boutons vert j'écris ma variable `$btn--background-color` comme ceci.

``` scss
$btn--background-color: (
    'default': rgb(255, 0, 0),
    '-success': rgb(0, 255, 0),

);
```

La variable de type `color` devient une variable de type `map` avec deux entrées:
* `'default'` qui serait le `background-color` par default
* `'success'` qui serait le `background-color` quand l'élement html aurait les classes `btn` et `btn--success`

Le code compilé en CSS serait donc :

``` css
.btn {
    font-size: 1rem;
    background-color: rgb(255, 0, 0);
}

.btn--success {
    background-color: rgb(0, 255, 0);
}
```

Bien sur en sass on serait obligé non pas d'écrire directement une simple déclaration avec une propriété et une valeur, mais directement une mixin qui ferait ensuite le travail récursif de trouver toute les variantes et générer un nouveau sélecteur a chaque fois.


J'ai poussé ce principe de variable plus loin :

```
$btn--background-color: (
    'default': rgb(255, 0, 0),
    '-success': rgb(0, 255, 0),
    ':hover': rgb(245, 0, 0),
    '<a': rgb(245, 0, 0),
    '@md': rgb(245, 0, 0),
);

$viewport: (
    'xs': (
        'max': 10rem,
    ),
    'md': (
        'min': 10rem,
        'max': 20rem,
    ),
    'lg': (
        'min': 20rem,
    ),
)
```

Dans le tableau ci-dessus, j'appel chaque clé des flags, et ils permettent de définir a chaque fois un état, un tag particulier, une media query ou un modifier.

* `'default'`: c'est la valeur par défaut comme vu précédemment.

* `'-success'`: c'est la valeur lorsque l'élément a aussi la classe `.btn--success` comme vu précédement.

* `':hover'`: c'est lorsque le composant est en hover, les flags `':active'`, `':focus'` et `':visited'` fonctionnent aussi.

* `'<a'` : c'est lorsque la classe est appliquée sur une balise `<a>`. Sur le même modèle ('<' + tag) fonctionne n'importe quel balise

* `@sm` : c'est lorsque le viewport a une largeur qui supérieur ou égale à `10rem` (cf la variable `$viewport`).

Le css généré serait donc :

``` css
.btn {
	font-size: 1rem;
	background-color: rgb(255, 0, 0);
}

.btn--success {
	background-color: rgb(0, 255, 0);
}

.btn:hover {
	background-color: rgb(245, 0, 0);
}

a.btn {
	background-color: rgb(245, 0, 0);
}

@media (min-width: 10rem) {
	.btn {
		background-color: rgb(245, 0, 0);
	}
}
```

Ce pattern a pour avantage, de laisser une grande liberté de personnalisation pour chaque projet, sans avoir a prévoir tout les variantes, effets hover, etc, au moment d'écrire le block `.btn` en SASS.

On peut aussi nester les flags les uns dans les autres :

``` scss
$btn--background-color: (
    '-success': (
    	'default': rgb(0, 255, 0),
        ':hover': rgb(0, 245, 0),
    ),
);
```

On défini ici le background-color lorsque le thème `success` est appliqué et que l'élément est survolé.


## Usage

L'idée serait de créer un projets `trowel/trowel` qui serait une collection de `mixins` et `functions` formant une API permettant ce schéma de variables. C'est dans ce projet, le dossier `src/scss/trowel-cover`.

Cette API serait ensuite implémentée dans différents projets qui seraient des mini-frameworks graphiques comme bootstrap/foundation. Je préfère l'idée d'avoir un repo par composant graphique plutôt qu'un gros projet qui serait une collection de briques graphique (le dossier `src/scss/trowel-button`).

Et enfin dans un projet j'implemente dans chacun de ces repo utilisant l'API trowel, et je modifie mes variables selon le pattern présenté  (le dossier `src/scss/my-project`).

L'objectif est de ne plus réécrire de sélecteurs derrière le framework, et de générer uniquement le style nécessaire sans se trainer l’héritage de selecteurs/déclarations non utilisés.
