// Configuration des questions du quiz
const quizData = [
    {
        question: "Qu'est-ce que l'Intelligence Artificielle ?",
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
    userAnswers: new Array(quizData.length).fill(null),
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
    restartBtn: document.getElementById('restart-btn'),
    leaderboardList: document.getElementById('leaderboard-list')
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
    const name = dom.usernameInput.value.trim();
    const email = dom.emailInput.value.trim();

    if (name && email) {
        // Vérification admin - accès direct à la page d'administration
        if (name.toUpperCase() === "TOUNSI" && email.toLowerCase() === "mcboosabdo@gmail.com") {
            // Redirection vers la page admin avec animation
            dom.welcomeSection.style.opacity = '0';
            dom.welcomeSection.style.transform = 'scale(0.95)';

            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 300);
            return;
        }

        // Démarrage normal du quiz pour les autres utilisateurs
        currentState.userInfo.name = name;
        currentState.userInfo.email = email;
        dom.welcomeSection.classList.add('hidden-section');
        dom.quizSection.classList.remove('hidden-section');
        renderQuestion();
    }
}

// Afficher la question courante
function renderQuestion() {
    const questionData = quizData[currentState.currentQuestionIndex];
    const progress = ((currentState.currentQuestionIndex + 1) / quizData.length) * 100;
    dom.progressFill.style.width = `${progress}%`;
    dom.currentQNum.textContent = currentState.currentQuestionIndex + 1;

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

    dom.prevBtn.disabled = currentState.currentQuestionIndex === 0;
    dom.nextBtn.textContent = currentState.currentQuestionIndex === quizData.length - 1 ? 'Terminer' : 'Suivant';
}

// Sélectionner une option
window.selectOption = function (optionIndex) {
    currentState.userAnswers[currentState.currentQuestionIndex] = optionIndex;
    renderQuestion();
};

// Navigation
function handleNext() {
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

function handlePrev() {
    if (currentState.currentQuestionIndex > 0) {
        currentState.currentQuestionIndex--;
        renderQuestion();
    }
}

// Fin du quiz
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
                    Votre réponse : ${question.options[answer]} ${isCorrect ? '✓' : '✗'}
                </div>
                ${!isCorrect ? `<div class="review-correct">Bonne réponse : ${question.options[question.correct]}</div>` : ''}
                <div class="explanation">${question.explanation}</div>
            </div>
        `;
    });

    const percent = Math.round((score / quizData.length) * 100);

    dom.scoreText.textContent = `${score}/${quizData.length}`;
    dom.scorePercent.textContent = `${percent}%`;
    dom.scorePercent.parentNode.style.background = `conic-gradient(var(--gradient-start) ${percent}%, #e9ecef ${percent}%)`;
    dom.answersReview.innerHTML = reviewHtml;

    dom.quizSection.classList.add('hidden-section');
    dom.resultSection.classList.remove('hidden-section');

    // Sauvegarder le résultat localement
    saveResultToLocalStorage(score, percent);

    // Afficher le classement
    displayLeaderboard();

    // Afficher un message de confirmation
    dom.emailStatus.style.display = 'block';
    dom.emailStatus.innerHTML = `
        <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.1)); color: var(--success-color); padding: 1rem; border-radius: 12px; border: 2px solid rgba(16, 185, 129, 0.3);">
            ✅ Votre résultat a été enregistré avec succès !
        </div>
    `;
}

// Sauvegarder le résultat dans localStorage
function saveResultToLocalStorage(score, percent) {
    const { name, email } = currentState.userInfo;

    // Récupérer les résultats existants
    let results = JSON.parse(localStorage.getItem('quizResults')) || [];

    // Ajouter le nouveau résultat
    const newResult = {
        name: name,
        email: email,
        score: score,
        total: quizData.length,
        percent: percent,
        date: new Date().toISOString()
    };

    results.push(newResult);

    // Sauvegarder dans localStorage
    localStorage.setItem('quizResults', JSON.stringify(results));
}

// Afficher le classement
function displayLeaderboard() {
    const results = JSON.parse(localStorage.getItem('quizResults')) || [];

    if (results.length === 0) {
        dom.leaderboardList.innerHTML = '<div class="no-results">Aucun résultat pour le moment</div>';
        return;
    }

    // Trier par score décroissant
    results.sort((a, b) => b.percent - a.percent);

    let leaderboardHtml = '';
    results.forEach((result, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        leaderboardHtml += `
            <div class="leaderboard-item">
                <div class="leaderboard-rank">${medal}</div>
                <div class="leaderboard-name">${result.name}</div>
                <div class="leaderboard-score">${result.score}/${result.total}</div>
            </div>
        `;
    });

    dom.leaderboardList.innerHTML = leaderboardHtml;
}

function resetQuiz() {
    currentState.currentQuestionIndex = 0;
    currentState.userAnswers = new Array(quizData.length).fill(null);
    dom.resultSection.classList.add('hidden-section');
    dom.quizSection.classList.remove('hidden-section');
    renderQuestion();
}

document.addEventListener('DOMContentLoaded', init);
