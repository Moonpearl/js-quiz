// Définit une action permettant d'afficher une question dans la page
function displayQuestion(index) {
  // Récupère l'élément qui contient le numéro de la question
  var questionId = document.getElementById("question-id");
  // Modifie le contenu de cet élément
  questionId.innerText = index + 1;

  // Récupère l'élément qui contient le texte de la question
  var questionText = document.getElementById("current-question-text");
  // Remplace le contenu de cet élément par le texte de la question actuelle
  questionText.innerText = questionData[index].text;

  // Pour chaque numéro de réponse variant de 1 à 4
  for (let i = 1; i < 5; i++) {
    // Récupère l'élément correspondant au numéro de la réponse
    var answer = document.getElementById("answer" + i + "-caption");
    // Remplace le contenu de cet élément par le texte de la réponse
    var key = "answer" + i;
    answer.innerText = questionData[index][key]
  };
}

// Définit une fonction qui permet de créer un nouvel élément dans la liste de réponses
// text: le texte à faire apparaître dans l'élément
// success: si l'élément correspond à une réussite (vrai) ou un échec (faux)
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
function handleSubmit(event) {
  // Empêche le rechargement de la page
  event.preventDefault();
 
  // Récupère le numéro de la bonne réponse à la question actuelle
  const rightAnswer = questionData[currentQuestionIndex].rightAnswer
  // Récupère le numéro de la réponse fournie par l'utilisateur
  const formData = $('#question-form').serializeArray();
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
var form = document.getElementById("question-form");
// Associe une action au fait de valider le formulaire
form.addEventListener("submit", handleSubmit);

// Initialise l'index de la question actuelle
var currentQuestionIndex = 0;
// Affiche la première question
displayQuestion(currentQuestionIndex);
  