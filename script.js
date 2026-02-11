// Configuration des questions du quiz
// Les réponses sont mélangées pour ne pas toujours être la première option.
const quizData = [
    {
        question: "Qu’est-ce que l’Intelligence Artificielle ?",
        options: [
            "Une technologie pour simuler l'intelligence humaine",
            "Un type d'ordinateur",
            "Une forme de magie informatique",
            "Une base de données géante"
        ],
        correct: 0,
        explanation: "L'IA est un domaine de l'informatique visant à créer des systèmes capables de réaliser des tâches qui nécessitent normalement l'intelligence humaine."
    },
    {
        question: "Types de données pour apprentissage",
        options: [
            "Seulement des images",
            "Données structurées et non structurées",
            "Seulement des textes",
            "Données numériques uniquement"
        ],
        correct: 1,
        explanation: "L'apprentissage automatique utilise divers types de données, qu'elles soient structurées (tableaux, bases de données) ou non structurées (images, textes, sons)."
    },
    {
        question: "Quel est le rôle de la Division des données ?",
        options: [
            "Stocker toutes les données ensemble",
            "Supprimer les données inutiles",
            "Séparer les données en ensembles pour entraîner et tester le modèle",
            "Analyser les données manuellement"
        ],
        correct: 2,
        explanation: "Diviser les données est crucial pour évaluer la capacité du modèle à généraliser sur des données qu'il n'a jamais vues."
    },
    {
        question: "Training Set",
        options: [
            "Ensemble pour valider le modèle",
            "Ensemble pour tester le modèle",
            "Ensemble pour corriger les erreurs",
            "Ensemble utilisé pour entraîner le modèle"
        ],
        correct: 3,
        explanation: "Le jeu d'entraînement (Training Set) est l'ensemble de données utilisé pour apprendre les paramètres du modèle."
    },
    {
        question: "Validation Set",
        options: [
            "Ensemble pour tester le modèle final",
            "Ensemble pour ajuster les paramètres du modèle",
            "Ensemble pour entraîner le modèle",
            "Ensemble pour stocker les données"
        ],
        correct: 1,
        explanation: "Le jeu de validation permet d'ajuster les hyperparamètres et d'éviter le surapprentissage pendant l'entraînement."
    },
    {
        question: "Test Set",
        options: [
            "Ensemble pour entraîner le modèle",
            "Ensemble pour valider les paramètres",
            "Ensemble pour évaluer la performance finale du modèle",
            "Ensemble pour diviser les données"
        ],
        correct: 2,
        explanation: "Le jeu de test est utilisé une seule fois à la fin pour donner une estimation impartiale de la performance du modèle."
    },
    {
        question: "SCÉNARIO : Vous voulez prédire le prix exact d'une maison (valeur continue) en fonction de sa surface et de son quartier. Quel modèle choisir ?",
        options: [
            "Regression Model",
            "Classification Model",
            "Clustering Model",
            "Anomaly Detection"
        ],
        correct: 0,
        explanation: "Les modèles de Régression sont utilisés pour prédire des valeurs numériques continues (comme un prix ou une température)."
    },
    {
        question: "SCÉNARIO : Vous devez créer un système qui filtre automatiquement les emails entrants en 'Spam' ou 'Non Spam'. Quel modèle choisir ?",
        options: [
            "Regression Model",
            "Classification Model",
            "Clustering Model",
            "Reinforcement Learning"
        ],
        correct: 1,
        explanation: "Les modèles de Classification servent à prédire une catégorie ou une classe discrète (A ou B, Oui ou Non)."
    },
    {
        question: "SCÉNARIO : Une entreprise veut segmenter ses clients en groupes ayant des comportements d'achat similaires, sans avoir de catégories prédéfinies à l'avance. Quel modèle utiliser ?",
        options: [
            "Regression Model",
            "Classification Model",
            "Clustering Model",
            "Supervised Learning"
        ],
        correct: 2,
        explanation: "Le Clustering (apprentissage non supervisé) permet de regrouper des données similaires sans étiquettes préalables."
    },
    {
        question: "SCÉNARIO : Votre modèle obtient 99% de réussite sur les données d'entraînement mais échoue avec seulement 50% de réussite sur les nouvelles données de test. Quel est le problème ?",
        options: [
            "Surapprentissage (Overfitting)",
            "Sous-apprentissage (Underfitting)",
            "Modèle Optimal",
            "Manque de données"
        ],
        correct: 0,
        explanation: "C'est la définition classique de l'Overfitting : le modèle a appris par cœur les détails (et le bruit) des données d'entraînement et ne généralise pas."
    },
    {
        question: "SCÉNARIO : Votre modèle est trop simple et fait beaucoup d'erreurs aussi bien sur l'entraînement que sur le test. Il ne capte pas la logique des données. Quel est le problème ?",
        options: [
            "Surapprentissage (Overfitting)",
            "Sous-apprentissage (Underfitting)",
            "Modèle Optimal",
            "Trop de données"
        ],
        correct: 1,
        explanation: "L'Underfitting se produit quand le modèle n'est pas assez complexe pour comprendre les relations dans les données."
    }
];

// État de l'application
let currentState = {
    currentQuestionIndex: 0,
    userAnswers: new Array(quizData.length).fill(null), // Stocke l'index de la réponse choisie
    userInfo: {
        name: '',
        email: ''
    }
};

// Éléments du DOM
const dom = {
    welcomeSection: document.getElementById('welcome-section'),
    quizSection: document.getElementById('quiz-section'),
    resultSection: document.getElementById('result-section'),
    userForm: document.getElementById('user-form'),
    usernameInput: document.getElementById('username'),
    emailInput: document.getElementById('email'),
    questionContainer: document.getElementById('question-container'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    currentQNum: document.getElementById('current-q-num'),
    progressFill: document.getElementById('progress-fill'),
    scorePercent: document.getElementById('score-percent'),
    scoreText: document.getElementById('score-text'),
    answersReview: document.getElementById('answers-review'),
    emailStatus: document.getElementById('email-status'),
    restartBtn: document.getElementById('restart-btn')
};

// Initialisation
function init() {
    dom.userForm.addEventListener('submit', startQuiz);
    dom.nextBtn.addEventListener('click', handleNext);
    dom.prevBtn.addEventListener('click', handlePrev);
    dom.restartBtn.addEventListener('click', resetQuiz);
}

// Démarrer le quiz
function startQuiz(e) {
    e.preventDefault();

    // Récupérer les infos utilisateur
    const name = dom.usernameInput.value.trim();
    const email = dom.emailInput.value.trim();

    if (name && email) {
        currentState.userInfo.name = name;
        currentState.userInfo.email = email;

        // Transition vers la section quiz
        dom.welcomeSection.classList.add('hidden-section');
        dom.quizSection.classList.remove('hidden-section');

        renderQuestion();
    }
}

// Afficher la question courante
function renderQuestion() {
    const questionData = quizData[currentState.currentQuestionIndex];

    // Mettre à jour la barre de progression
    const progress = ((currentState.currentQuestionIndex + 1) / quizData.length) * 100;
    dom.progressFill.style.width = `${progress}%`;
    dom.currentQNum.textContent = currentState.currentQuestionIndex + 1;

    // Générer le HTML de la question
    let optionsHtml = '';
    questionData.options.forEach((option, index) => {
        const isSelected = currentState.userAnswers[currentState.currentQuestionIndex] === index;
        optionsHtml += `
            <div class="option-btn ${isSelected ? 'selected' : ''}" onclick="selectOption(${index})">
                ${option}
            </div>
        `;
    });

    dom.questionContainer.innerHTML = `
        <h2>${questionData.question}</h2>
        <div class="options-container">
            ${optionsHtml}
        </div>
    `;

    // Gérer l'état des boutons navigation
    dom.prevBtn.disabled = currentState.currentQuestionIndex === 0;
    dom.nextBtn.textContent = currentState.currentQuestionIndex === quizData.length - 1 ? 'Terminer' : 'Suivant';
}

// Sélectionner une option
window.selectOption = function (optionIndex) {
    currentState.userAnswers[currentState.currentQuestionIndex] = optionIndex;
    renderQuestion(); // Re-render pour mettre à jour la classe 'selected'
};

// Navigation : Suivant
function handleNext() {
    // Vérifier si une réponse est sélectionnée
    if (currentState.userAnswers[currentState.currentQuestionIndex] === null) {
        alert("Veuillez sélectionner une réponse avant de continuer.");
        return;
    }

    if (currentState.currentQuestionIndex < quizData.length - 1) {
        currentState.currentQuestionIndex++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

// Navigation : Précédent
function handlePrev() {
    if (currentState.currentQuestionIndex > 0) {
        currentState.currentQuestionIndex--;
        renderQuestion();
    }
}

// Fin du quiz et calcul des résultats
function finishQuiz() {
    let score = 0;
    let reviewHtml = '';

    currentState.userAnswers.forEach((answer, index) => {
        const question = quizData[index];
        const isCorrect = answer === question.correct;

        if (isCorrect) score++;

        reviewHtml += `
            <div class="review-item">
                <div class="review-title">${index + 1}. ${question.question}</div>
                <div class="${isCorrect ? 'review-correct' : 'review-incorrect'}">
                    Votre réponse : ${question.options[answer]} ${isCorrect ? 'T' : 'F'}
                </div>
                ${!isCorrect ? `<div class="review-correct">Bonne réponse : ${question.options[question.correct]}</div>` : ''}
                <div class="explanation">${question.explanation}</div>
            </div>
        `;
    });

    const percent = Math.round((score / quizData.length) * 100);

    // Affichage
    dom.scoreText.textContent = `${score}/${quizData.length}`;
    dom.scorePercent.textContent = `${percent}%`;
    dom.scorePercent.parentNode.style.background = `conic-gradient(var(--primary-color) ${percent}%, #e9ecef ${percent}%)`;
    dom.answersReview.innerHTML = reviewHtml;

    dom.quizSection.classList.add('hidden-section');
    dom.resultSection.classList.remove('hidden-section');

    sendResults(score, percent);
}

// Envoi des résultats (Via Client Mail pour garantir la réception)
function sendResults(score, percent) {
    const { name, email } = currentState.userInfo;
    const adminEmail = "mcboosabdo@gmail.com";

    // Construction du lien mailto
    const subject = encodeURIComponent(`Résultat Quiz IA - ${name}`);
    const body = encodeURIComponent(`
Nom du participant : ${name}
Email du participant : ${email}
Score obtenu : ${score}
Pourcentage : ${percent}

(Ce message est généré automatiquement après le quiz Workshop1)
    `);

    const mailtoLink = `mailto:${adminEmail}?subject=${subject}&body=${body}`;

    // Mise à jour de l'interface
    dom.emailStatus.style.display = 'block';
    dom.emailStatus.innerHTML = `
        <div style="margin-top: 15px; padding: 15px; background: #e3f2fd; border-radius: 8px; border: 1px solid #90caf9;">
            <p style="margin: 0 0 10px 0; color: #1565c0; font-weight: bold;">
                Pour valider vos résultats, veuillez cliquer ci-dessous :
            </p>
            <a href="${mailtoLink}" class="btn-primary" style="display: inline-block; padding: 10px 20px; text-decoration: none; text-align: center; color: white;">
                📧 Envoyer Rapport (${score}/${quizData.length})
            </a>
            <p style="font-size: 0.8em; color: #666; margin-top: 10px;">
                Cela ouvrira votre application de messagerie (Gmail, Outlook...) pour envoyer votre score à ${adminEmail}.
            </p>
        </div>
    `;

    console.log("Lien mailto généré.");
}

// Réinitialiser le quiz
function resetQuiz() {
    currentState.currentQuestionIndex = 0;
    currentState.userAnswers = new Array(quizData.length).fill(null);
    // On garde les infos utilisateur pour éviter de les redemander

    dom.resultSection.classList.add('hidden-section');
    dom.quizSection.classList.remove('hidden-section');
    renderQuestion();
}

// Lancer l'initialisation au chargement
document.addEventListener('DOMContentLoaded', init);
