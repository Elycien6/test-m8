document.addEventListener('DOMContentLoaded', () => {
    fetch('./exercises.json')
        .then(response => response.json())
        .then(exercises => {
            const container = document.getElementById('exercise-container');
            exercises.forEach((exercise, index) => {
                const exerciseDiv = document.createElement('div');
                exerciseDiv.classList.add('exercise');
                exerciseDiv.innerHTML = `
                    <h2>Exercice ${index + 1}: ${exercise.title}</h2>
                    <p>${exercise.description}</p>
                    <button onclick="showSolution(${index})">Voir la solution</button>
                    <pre id="solution-${index}" style="display:none;">${exercise.solution}</pre>
                    
                    <textarea id="answer-${index}" placeholder="Entrez votre réponse ici"></textarea>
                    <button onclick="submitAnswer(${index}, '${exercise.solution}')">Soumettre la réponse</button>
                    <p id="feedback-${index}" style="display:none;"></p>
                `;
                container.appendChild(exerciseDiv);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des exercices:', error));
});

// Affiche ou masque la solution
function showSolution(index) {
    const solution = document.getElementById(`solution-${index}`);
    solution.style.display = solution.style.display === 'none' ? 'block' : 'none';
}

// Gère la soumission de la réponse de l'utilisateur
function submitAnswer(index, solution) {
    const answer = document.getElementById(`answer-${index}`).value.trim();
    const feedback = document.getElementById(`feedback-${index}`);
    
    if (answer) {
        // Comparer la réponse utilisateur avec la solution
        if (normalize(answer) === normalize(solution)) {
            feedback.style.display = 'block';
            feedback.textContent = '✅ Correct ! Bien joué.';
            feedback.style.color = 'green';
        } else {
            feedback.style.display = 'block';
            feedback.textContent = '❌ Incorrect. Essayez encore.';
            feedback.style.color = 'red';
        }
    } else {
        feedback.style.display = 'block';
        feedback.textContent = 'Veuillez entrer une réponse avant de soumettre.';
        feedback.style.color = 'orange';
    }
}

// Normalisation pour ignorer les espaces ou les sauts de ligne dans la comparaison
function normalize(str) {
    return str.replace(/\s+/g, '').toLowerCase();
}
