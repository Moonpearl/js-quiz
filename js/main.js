// Définit une action permettant d'afficher une question dans la page
/**
 * Display a question in the DOM.
 * @param {object} question The question to display
 */
function displayQuestion(question) {
  // Récupère l'élément qui contient le numéro de la question
  const questionId = document.getElementById("question-id");
  // Modifie le contenu de cet élément
  questionId.innerText = currentQuestionId;

  // Récupère l'élément qui contient le texte de la question
  const questionText = document.getElementById("current-question-text");
  // Remplace le contenu de cet élément par le texte de la question actuelle
  questionText.innerText = question.text;
}

// Définit une action permettant d'afficher la liste des réponses la page
/**
 * Display answers in the DOM.
 * @param {array} answers The list of answers to display.
 */
function displayAnswers(answers) {
  let i = 1;
  // Pour chaque réponse
  for (let answer of answers['hydra:member']) {
    // Récupère l'élément correspondant au numéro de la réponse
    const answerCaption = document.getElementById("answer" + i + "-caption");
    // Remplace le contenu de cet élément par le texte de la réponse
    const key = "answer" + i;
    answerCaption.innerText = answer.text;
    // Récupère le bouton radio associé à la réponse
    const answerRadio = document.getElementById('answer' + i);
    // Remplace la valeur retournée par le bouton par l'ID de la réponse
    answerRadio.value = answer.id;
    i++;
  }
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

  // Récupère le numéro de la réponse fournie par l'utilisateur
  const formData = $('#question-form').serializeArray();
  // Si le formulaire ne contient pas de donnée, affiche une alerte et interrompt la fonction
  if (formData.length === 0) {
    alert('Vous devez sélectionner une réponse!');
    return;
  } 
  
  // Envoie une requête dans le serveur pour récupérer la bonne réponse à la question actuelle
  fetch('http://localhost:8000/api/questions/' + currentQuestionId + '/right_answer')
  // Associe une action au fait que le serveur réponde
  .then(
    // Transforme le contenu de la réponse en objet Javascript suivant le format JSON
    function(response) {
      if (response.ok) {
        return response.json();
      }
    }
  )
  // Associe une action au fait que la transformation en objet JSON soit terminée
  .then(
    // Vérifie si la réponse donnée était bonne ou non
    function(rightAnswer) {
      const userAnswer = Number(formData[0].value);

      // Détermine si le numéro de la réponse fournie par l'utilisateur est égal au numéro de la bonne réponse à la question actuelle
      const isUserAnswerRight = rightAnswer.id === userAnswer;

      // Crée un nouvel élément dans la liste de réponses en tenant compte de s'il s'agit d'un succès ou d'un échec
      createAnswersListItem(currentQuestion.text, isUserAnswerRight);

      // Augmente l'index de la question actuelle
      currentQuestionId++;

      // Récupère et affiche la nouvelle question du serveur
      fetchQuestion(currentQuestionId);
    }
  );
  
}

let currentQuestion;
/**
 * Fetch and display a question from the API.
 * @param {*} id The ID of the question to fetch.
 */
function fetchQuestion(id) {
  // Envoie une requête sur un serveur distant permettant de récupérer la question
  fetch('http://localhost:8000/api/questions/' + id)
  // Associe une action au fait que le serveur réponde
  .then(
    // Transforme le contenu de la réponse en objet Javascript suivant le format JSON
    function(response) {
      if (response.ok) {
        return response.json()
      }

      if (response.status === 404) {
        currentQuestionId = 1;
        fetchQuestion(currentQuestionId);
      }
    }
  )
  // Associe une action au fait que la transformation en objet JSON soit terminée
  .then(
    // Affiche la question dans la page
    function(question) {
      currentQuestion = question;
      displayQuestion(question);
    }
  );

  // Envoie une requête sur un serveur distant permettant de récupérer les réponses à la question
  fetch('http://localhost:8000/api/questions/' + id + '/answers')
  // Associe une action au fait que le serveur réponde
  .then(
    // Transforme le contenu de la réponse en objet Javascript suivant le format JSON
    function(response) {
      if (response.ok) {
        return response.json();
      }
    }
  )
  // Associe une action au fait que la transformation en objet JSON soit terminée
  .then(
    // Affiche les réponses à la question dans la page
    function(answers) {
      displayAnswers(answers);
    }
  );

}

// Récupère le formulaire
const form = document.getElementById("question-form");
// Associe une action au fait de valider le formulaire
form.addEventListener("submit", handleSubmit);

// Initialise l'index de la question actuelle
let currentQuestionId = 1;
// Récupère et affiche la première question du serveur
fetchQuestion(currentQuestionId);
