// ===== STATE =====
let playerName = '';
let storyData = null;
let quizData = [];
let currentScene = 0;
let currentQuestion = 0;
let answers = [];
const letters = ['A', 'B', 'C', 'D'];

// ===== SCREEN MANAGEMENT =====
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(id);
    screen.classList.add('active');
    screen.style.animation = 'none';
    screen.offsetHeight; // trigger reflow
    screen.style.animation = 'fadeIn 0.5s ease';
    window.scrollTo(0, 0);
}

function goHome() {
    showScreen('welcome-screen');
}

// ===== WELCOME =====
function startAdventure() {
    const input = document.getElementById('player-name');
    playerName = input.value.trim() || 'Friend';
    loadStory();
}

document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('player-name');
    if (input) {
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') startAdventure();
        });
    }
});

// ===== STORY =====
async function loadStory() {
    try {
        const res = await fetch('/api/story');
        storyData = await res.json();
        currentScene = 0;
        renderScene();
        showScreen('story-screen');
    } catch (err) {
        alert('Could not load story. Make sure the server is running.');
    }
}

function renderScene() {
    var totalScenes = storyData.scenes.length;
    document.getElementById('scene-counter').textContent =
        'Scene ' + (currentScene + 1) + ' of ' + totalScenes;
    document.getElementById('story-title').textContent = storyData.title;
    document.getElementById('story-intro').textContent = storyData.introduction;

    var scene = storyData.scenes[currentScene];
    var html = '';

    html += '<span class="scene-label">Scene ' + scene.sceneNumber + '</span>';
    html += '<p class="scene-narration">' + scene.narration + '</p>';

    if (scene.choice) {
        html += '<div class="scene-choice">' + scene.choice + '</div>';
    }

    if (scene.truthOutcome) {
        html += '<div class="scene-outcome truth">';
        html += '<span class="outcome-label">When Sam tells the truth:</span>';
        html += scene.truthOutcome;
        html += '</div>';
    }

    if (scene.lieOutcome) {
        html += '<div class="scene-outcome lie">';
        html += '<span class="outcome-label">When Sam tells a lie:</span>';
        html += scene.lieOutcome;
        html += '</div>';
    }

    document.getElementById('scene-content').innerHTML = html;

    // Show verses and moral on last scene
    var versesBox = document.getElementById('story-verses');
    var moralBox = document.getElementById('story-moral');

    if (currentScene === totalScenes - 1) {
        var versesHtml = '<h3>Bible Verses</h3>';
        storyData.bibleVerses.forEach(function (v) {
            versesHtml += '<div class="verse-item">';
            versesHtml += '<p class="verse-ref">' + v.reference + '</p>';
            versesHtml += '<p class="verse-text">"' + v.text + '"</p>';
            versesHtml += '</div>';
        });
        versesBox.innerHTML = versesHtml;
        versesBox.style.display = 'block';

        moralBox.innerHTML = '<h3>The Lesson</h3><p>' + storyData.moral + '</p>';
        moralBox.style.display = 'block';
    } else {
        versesBox.style.display = 'none';
        moralBox.style.display = 'none';
    }

    // Nav button states
    document.getElementById('btn-prev').disabled = currentScene === 0;

    var nextBtn = document.getElementById('btn-next');
    if (currentScene === totalScenes - 1) {
        nextBtn.textContent = 'Take the Quiz!';
        nextBtn.className = 'btn btn-nav btn-start';
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.className = 'btn btn-nav btn-primary';
    }
}

function nextScene() {
    if (currentScene < storyData.scenes.length - 1) {
        currentScene++;
        renderScene();
        window.scrollTo(0, 0);
    } else {
        goToQuiz();
    }
}

function prevScene() {
    if (currentScene > 0) {
        currentScene--;
        renderScene();
        window.scrollTo(0, 0);
    }
}

function goToStory() {
    if (storyData) {
        currentScene = 0;
        renderScene();
        showScreen('story-screen');
    } else {
        loadStory();
    }
}

// ===== QUIZ =====
async function goToQuiz() {
    try {
        var res = await fetch('/api/questions');
        quizData = await res.json();
        currentQuestion = 0;
        answers = [];
        renderQuestion();
        showScreen('quiz-screen');
    } catch (err) {
        alert('Could not load quiz. Make sure the server is running.');
    }
}

function renderQuestion() {
    var total = quizData.length;
    var q = quizData[currentQuestion];

    document.getElementById('quiz-progress').textContent =
        (currentQuestion + 1) + ' / ' + total;
    document.getElementById('quiz-progress-bar').style.width =
        ((currentQuestion / total) * 100) + '%';

    document.getElementById('question-number').textContent =
        'Question ' + (currentQuestion + 1) + ' of ' + total;
    document.getElementById('question-text').textContent = q.question;

    var optionsHtml = '';
    q.options.forEach(function (opt, i) {
        optionsHtml += '<button class="option-btn" onclick="selectAnswer(' + i + ')">';
        optionsHtml += '<span class="option-letter">' + letters[i] + '</span>';
        optionsHtml += opt;
        optionsHtml += '</button>';
    });

    document.getElementById('options-list').innerHTML = optionsHtml;
}

function selectAnswer(index) {
    var q = quizData[currentQuestion];
    var isCorrect = index === q.correctAnswerIndex;

    answers.push({ questionId: q.id, selectedOption: index });

    // Highlight options
    var buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(function (btn, i) {
        btn.disabled = true;
        btn.onclick = null;
        if (i === q.correctAnswerIndex) {
            btn.classList.add('correct');
        } else if (i === index && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    // Show explanation
    var explainClass = isCorrect ? 'correct-explain' : 'wrong-explain';
    var explainHtml = '<div class="explanation-box ' + explainClass + '">';
    explainHtml += (isCorrect ? 'That\'s right! ' : 'Not quite. ') + q.explanation;
    explainHtml += '<span class="bible-ref">' + q.bibleReference + '</span>';
    explainHtml += '</div>';

    // Next button
    var btnText;
    if (currentQuestion < quizData.length - 1) {
        btnText = 'Next Question';
    } else {
        btnText = 'See My Results!';
    }
    explainHtml += '<button class="btn btn-primary quiz-next-btn" onclick="nextQuestion()">';
    explainHtml += btnText;
    explainHtml += '</button>';

    document.getElementById('options-list').insertAdjacentHTML('afterend', explainHtml);
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;

        // Remove explanation and next button before re-rendering
        var card = document.getElementById('quiz-card');
        var extras = card.querySelectorAll('.explanation-box, .quiz-next-btn');
        extras.forEach(function (el) { el.remove(); });

        renderQuestion();
        window.scrollTo(0, 0);
    } else {
        submitScore();
    }
}

// ===== SCORE SUBMISSION =====
async function submitScore() {
    try {
        var body = {
            playerName: playerName,
            answers: answers
        };

        var res = await fetch('/api/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        var result = await res.json();
        renderResults(result);
        showScreen('results-screen');
    } catch (err) {
        alert('Could not submit score. Make sure the server is running.');
    }
}

function renderResults(result) {
    // Animate score circle
    var percent = result.scorePercent;
    var circle = document.getElementById('score-circle');
    circle.style.background =
        'conic-gradient(var(--green) ' + percent + '%, var(--sky-light) ' + percent + '%)';
    document.getElementById('score-number').textContent = percent + '%';

    document.getElementById('results-message').textContent = result.message;
    document.getElementById('results-encouragement').textContent = result.encouragement;

    // Verse
    if (result.verse) {
        var verseHtml = '<p class="verse-ref">' + result.verse.reference + '</p>';
        verseHtml += '<p class="verse-text">"' + result.verse.text + '"</p>';
        document.getElementById('results-verse').innerHTML = verseHtml;
    }

    // Feedback per question
    if (result.feedback && result.feedback.length > 0) {
        var fbHtml = '<h3>Question Review</h3>';
        result.feedback.forEach(function (fb, i) {
            var icon = fb.correct ? '<span style="color:var(--green)">&#10004;</span>'
                                  : '<span style="color:var(--red-soft)">&#10008;</span>';
            fbHtml += '<div class="feedback-item">';
            fbHtml += '<span class="feedback-icon">' + icon + '</span>';
            fbHtml += '<span class="feedback-text">';
            fbHtml += '<strong>Q' + (i + 1) + ':</strong> ' + fb.explanation;
            fbHtml += '</span>';
            fbHtml += '</div>';
        });
        document.getElementById('feedback-list').innerHTML = fbHtml;
    }

    // Update progress bar to full
    document.getElementById('quiz-progress-bar').style.width = '100%';
}
