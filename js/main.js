// Définit une action permettant d'afficher une question dans la page
/**
 * Diplay a question in the DOM.
 * @param {number} index The index of the question to diplay.
 */
function displayQuestion(index) {
  // Récupère l'élément qui contient le numéro de la question
  const questionId = document.getElementById("question-id");
  // Modifie le contenu de cet élément
  questionId.innerText = index + 1;

  // Récupère l'élément qui contient le texte de la question
  const questionText = document.getElementById("current-question-text");
  // Remplace le contenu de cet élément par le texte de la question actuelle
  questionText.innerText = questionData[index].text;

  // Pour chaque numéro de réponse variant de 1 à 4
  for (let i = 1; i <= 4; i++) {
    // Récupère l'élément correspondant au numéro de la réponse
    const answerCaption = document.getElementById("answer" + i + "-caption");
    // Remplace le contenu de cet élément par le texte de la réponse
    const key = "answer" + i;
    answerCaption.innerText = questionData[index][key]
  };
}

// Définit une fonction qui permet de créer un nouvel élément dans la liste de réponses
/**
 * Create a new item in the list of answers.
 * @param {string} text The text to display inside the list item.
 * @param {boolean} success Whether the item shows a success (true) or failure (false).
 */
function createAnswersListItem(text, success) {
  // Récupère la liste des réponses
  const answersList = document.getElementById("answers-list")
  // Crée l'élément à ajouter dans la liste de réponses
  var answersListItem = document.createElement('li');
  answersListItem.className = "list-group-item list-group-item-action list-group-item-" + (success === true ? 'success' : 'danger');
  answersList.appendChild(answersListItem);
  // Crée l'icône
  const icon = document.createElement('i');
  answersListItem.appendChild(icon);
  icon.classList = "fas fa-thumbs-"  + (success === true ? 'up' : 'down');
  // Crée l'élément contenant le texte de la question
  const questionText = document.createElement('span');
  answersListItem.appendChild(questionText);
  questionText.innerText = text;
}

// Définit une action permettant de gérer la validation du formulaire
/**
 * Handle form submission.
 * @param {Event} event The event that triggered this action.
 */
function handleSubmit(event) {
  // Empêche le rechargement de la page
  event.preventDefault();
 
  // Récupère le numéro de la bonne réponse à la question actuelle
  const rightAnswer = questionData[currentQuestionIndex].rightAnswer
  // Récupère le numéro de la réponse fournie par l'utilisateur
  const formData = $('#question-form').serializeArray();
  // Si le formulaire ne contient pas de donnée, affiche une alerte et interrompt la fonction
  if (formData.length === 0) {
    alert('Vous devez sélectionner une réponse!');
    return;
  } 
  const userAnswer = Number(formData[0].value);
  
  // Récupère la liste des réponses dans la page

  // Détermine si le numéro de la réponse fournie par l'utilisateur est égal au numéro de la bonne réponse à la question actuelle
  const isUserAnswerRight = rightAnswer === userAnswer;
  // Crée un nouvel élément dans la liste de réponses en tenant compte de s'il s'agit d'un succès ou d'un échec
  createAnswersListItem(questionData[currentQuestionIndex].text, isUserAnswerRight);

  // Augmente l'index de la question actuelle
  currentQuestionIndex++;
  // S'il n'y a plus de question, réinitialise l'index de la question actuelle
  if (currentQuestionIndex === questionData.length) {
    currentQuestionIndex = 0;
  }
  // Affiche la question actuelle dans la page
  displayQuestion(currentQuestionIndex);
}

// Récupère le formulaire
const form = document.getElementById("question-form");
// Associe une action au fait de valider le formulaire
form.addEventListener("submit", handleSubmit);

// Initialise l'index de la question actuelle
let currentQuestionIndex = 0;
// Affiche la première question
displayQuestion(currentQuestionIndex);
