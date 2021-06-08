// Récupère l'élément qui contient le numéro de la question
var questionId = document.getElementById("question-id");
// Modifie le contenu de cet élément
questionId.innerText = "1";

// Récupère l'élément qui contient le texte de la question
var questionText = document.getElementById("current-question-text");
// Remplace le contenu de cet élément par le texte de la question actuelle
questionText.innerText = questionData[0].text;

// Pour chaque numéro de réponse variant de 1 à 4
for (let i = 1; i < 5; i++) {
  // Récupère l'élément correspondant au numéro de la réponse
  var answer = document.getElementById("answer" + i + "-caption");
  // Remplace le contenu de cet élément par le texte de la réponse
  var key = "answer" + i;
  answer.innerText = questionData[0][key];
}
