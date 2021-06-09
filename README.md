# Travaux pratiques Javascript/jQuery

J'ai créé une super page de quizz, mais je ne sais pas comment la faire fonctionner... 😢 Jean-Louis, mon pote développeur web, m'a donné des instructions, en me disant "c'est facile, t'inquiète!", mais je ne m'en sors pas.

La liste des questions, avec leurs réponses, sont dans le fichier **js/data.js**. Il faudrait ajouter le code nécessaire pour faire fonctionner le quizz dans le fichier **js/main.js**.

Je te laisse les instructions de Jean-Louis. Peux-tu me donner un coup de main? 🥰

## 1. Charger la première question

Pour commencer, il faut charger les données de la première question dans la page.

### Numéro de la question

Le numéro de la question doit apparaître dans l'élément dont l'**id** est `question-id`.

### Texte de la question

Le texte de la question doit apparaître dans l'élément dont l'**id** est `current-question-text`.

### Texte des réponses

Le texte de chaque réponse doit apparaître dans l'élément correspondant.

<details> 
  <summary>Indice</summary>
  questionData[0]
</details>

## 2. Charger la question suivante

**Lorsque le formulaire est validé**, la question suivante doit être chargée dans la page, sur le même principe qu'à l'étape 1.

<details> 
  <summary>Indice</summary>
  $('#question-form').submit(function(event) { })
</details>

<details> 
  <summary>Indice</summary>
  Il faut empêcher la page de se recharger.
</details>

<details> 
  <summary>Indice</summary>
  Il va falloir une variable pour que l'application sache quelle est le numéro de la question actuelle.
</details>

<details> 
  <summary>Indice</summary>
  Il peut être judicieux de créer une fonction dédiée à l'affichage d'une question donnée. Ensuite, cette fonction peut être appelée une première fois au chargement de la page, puis à chaque fois qu'une réponse est validée par la suite.
</details>

### Bonus

Si la dernière question est validée, retourner à la question 1.

### Bonus 2

Si la dernière question est validée, afficher une _pop-up_ pour demander à l'utilisateur s'il souhaite recommencer le quizz, et retourner à la question 1 uniquement s'il répondu oui.

<details> 
  <summary>Indice</summary>
  window.confirm()
</details>

## 3. Déterminer si l'utilisateur a donné la bonne réponse

**Lorsque le formulaire est validé**, il faut récupérer le numéro de la réponse choisie par l'utilisateur, et vérifier si celui-ci correspond au numéro de la bonne réponse.

Une _pop-up_ doit afficher si la réponse donnée était bonne ou non.

<details> 
  <summary>Indice</summary>
  $('#question-form').serializeArray()
</details>

### Bonus

Le message disant si la réponse était bonne ou non doit apparaître dans la page au lieu d'apparaître dans une _pop-up_.

## 4. Lister les bonnes et mauvaises réponses

**Lorsque le formulaire est validé**, un nouvel élément doit être rajouté dans l'élément dont l'**id** est `answers-list`. Cet élément doit apparaître en vert si la réponse donnée était bonne, ou en rouge si elle était fausse. Il doit également contenir le texte de la question, dans l'élément dont la **classe** est `question-text`.

<details> 
  <summary>Indice</summary>
  Tu peux t'aider des éléments "template" présents dans le head du fichier .html.
</details>

### Super Bonus

Lorsqu'une nouvelle question est chargée, les réponses sont mélangées dans un ordre aléatoire (sans que cela perturbe la détection de la bonne réponse, évidemment).

<details> 
  <summary>Indice</summary>
  Math.random()
</details>

## Deuxième partie: mode création

> Cette deuxième partie concerne la page `create.html`. Le code doit être écrit dans le fichier `js/edit.js`.

### 1. Afficher la liste des questions

Lorsque la page est chargée, des élements de liste avec le texte de chaque question doivent être générés dynamiquement.

### 2. Créer une nouvelle question

Lorsque l'on valide le formulaire d'ajout de question, un nouvel élément contenant le texte saisi doit être ajouté à la liste.

### 3. Modifier une question

Lorsque l'on clique sur le bouton "Modifier", le formulaire de classe `question-name-edit` doit apparaître, et l'élément de classe `question-name` doit apparaître. Lorsque l'on valide ce formulaire, le nom de la question doit changer.

### 4. Supprimer une question

Lorsque l'on clique sur le bouton "Supprimer", la question doit disparaître.

### Super bonus de la mort: remplacer les données statiques par des appels d'API

- Au chargement de la page, la création de la liste doit se baser sur le résultat de la requête `GET http://localhost:8000/questions`.
- Lorsque l'on valide le formulaire d'ajout de question, l'ajout de la question dans la page doit se baser sur le résultat de la requête `POST http://localhost:8000/questions`.
- Lorsque l'on valide le formulaire de modification de question, la modification de la question dans la page doit se baser sur le résultat de la requête `PUT http://localhost:8000/questions/{id}`.
- Lorsque l'on valide le formulaire de suppression de question, la suppresion de la question dans la page doit se baser sur le résultat de la requête `DELETE http://localhost:8000/questions/{id}`.
