// Récupère le modèle d'élément à insérer dans la liste des questions
const questionTemplate = document.getElementById('question-template');
// Récupère la liste des questions
const questionsList = document.getElementById('questions-list');
// Pour chaque question existant dans les données
for (let question of questionData) {
  // Crée une copie d'un élément à insérer dans la liste des questions
  const newQuestionItem = questionTemplate.content.cloneNode(true);
  // Modifie le texte de la question dans ce nouvel élément
  const newQuestionText = newQuestionItem.querySelector('.question-name');
  newQuestionText.innerText = question.text;
  // Ajoute ce nouvel élément dans la liste
  questionsList.appendChild(newQuestionItem);
}
