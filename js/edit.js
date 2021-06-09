// Définit une action permettant de créer une nouvelle question dans le DOM
/**
 * Create new question item in the DOM.
 * @param {object} question The question to add.
 */
function createQuestionItem(question) {
  // Récupère le modèle d'élément à insérer dans la liste des questions
  const questionTemplate = document.getElementById('question-template');
  // Récupère la liste des questions
  const questionsList = document.getElementById('questions-list');
  // Crée une copie d'un élément à insérer dans la liste des questions
  const newQuestionItem = questionTemplate.content.cloneNode(true);
  // Modifie le texte de la question dans ce nouvel élément
  const newQuestionText = newQuestionItem.querySelector('.question-name');
  newQuestionText.innerText = question.text;

  // Récupère le bouton "Modifier" présent dans l'élément
  const newQuestionEditButton = newQuestionItem.querySelector('.question-edit-button');
  // récupère le formulaire de modification de la question
  const newQuestionNameEditForm = newQuestionItem.querySelector('.question-name-edit');
  // Associe une action au fait de cliquer sur le bouton "Modifier" présent dans l'élément
  newQuestionEditButton.addEventListener('click', function() {
    // Fait disparaître le texte, et apparaître le formulaire
    newQuestionText.classList.add('d-none');
    newQuestionNameEditForm.classList.remove('d-none');
    // Déplace le curseur de l'utilisateur dans le champ texte qui vient d'être révélé
    newQuestionNameEditText.focus();
    // Remplace le contenu du champ texte par le texte actuel de la question
    newQuestionNameEditText.value = newQuestionText.innerText;
  });

  const newQuestionNameEditText = newQuestionNameEditForm.querySelector('.question-name-edit-text');
  // Associe une action au fait de valider le formulaire de modification présent dans l'élément
  newQuestionNameEditForm.addEventListener('submit', function(event) {
    // Empêche le rechargement de la page
    event.preventDefault();
    // Modifie le texte de la question à partir du texte saisi
    newQuestionText.innerText = newQuestionNameEditText.value;
    // Fait apparaître le texte, et disparaître le formulaire
    newQuestionNameEditForm.classList.add('d-none');
    newQuestionText.classList.remove('d-none');
  });
  
  // Ajoute ce nouvel élément dans la liste
  questionsList.appendChild(newQuestionItem);
}

// Récupère le formulaire d'ajout de question
const newQuestionForm = document.getElementById('new-question-form');
// Associe une action au fait de valider le formulaire d'ajout de question
newQuestionForm.addEventListener('submit', function(event) {
  // Empêche le rechargement de la page
  event.preventDefault();
  // Récupère le champ texte du formulaire
  const newQuestionTextInput = document.getElementById('new-question-text');
  // Si le champ texte est vide, inerrompt la fonction
  if (newQuestionTextInput.value === '') {
    return;
  }
  // Crée une nouvelle question dans la liste à partir du texte saisi
  createQuestionItem({
    text: newQuestionTextInput.value
  });
  // Vide le champ texte
  newQuestionTextInput.value = '';
});

// Pour chaque question existant dans les données
for (let question of questionData) {
  // Crée une nouvelle question dans la liste
  createQuestionItem(question);
}
