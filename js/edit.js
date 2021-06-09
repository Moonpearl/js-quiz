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
