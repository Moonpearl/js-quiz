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

// Définit une action permettant de gérer la validation du formulaire
function handleSubmit(event) {
  // Empêche le rechargement de la page
  event.preventDefault();
  // Augmente l'index de la question actuelle
  currentQuestionIndex++;
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

