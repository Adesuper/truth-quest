// ========================================================
//  TRUTH QUEST — Fully Self-Contained (No Server Needed)
// ========================================================

var LETTERS = ['A', 'B', 'C', 'D'];
var COUNTDOWN_SECONDS = 3;
var highlightedOption = -1;
var readyToConfirm = false;

// ===== SOUND EFFECTS (Web Audio API — no files needed) =====
var audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

function playTone(freq, duration, type, volume) {
    try {
        var ctx = getAudioCtx();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.value = freq;
        gain.gain.value = volume || 0.3;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    } catch (e) { /* audio not supported — silent fallback */ }
}

function soundChime() {
    playTone(523, 0.15, 'sine', 0.25);
    setTimeout(function () { playTone(659, 0.15, 'sine', 0.25); }, 120);
    setTimeout(function () { playTone(784, 0.25, 'sine', 0.25); }, 240);
}

function soundCorrect() {
    playTone(523, 0.12, 'sine', 0.3);
    setTimeout(function () { playTone(659, 0.12, 'sine', 0.3); }, 100);
    setTimeout(function () { playTone(784, 0.3, 'sine', 0.3); }, 200);
}

function soundWrong() {
    playTone(300, 0.2, 'triangle', 0.2);
    setTimeout(function () { playTone(250, 0.3, 'triangle', 0.2); }, 180);
}

function soundTick() {
    playTone(800, 0.08, 'square', 0.12);
}

function soundGo() {
    playTone(523, 0.1, 'sine', 0.3);
    setTimeout(function () { playTone(784, 0.25, 'sine', 0.3); }, 80);
}

function soundCelebration() {
    var notes = [523, 587, 659, 698, 784, 880, 988, 1047];
    notes.forEach(function (note, i) {
        setTimeout(function () {
            playTone(note, 0.2, 'sine', 0.2);
        }, i * 80);
    });
}

function soundPledgeLine() {
    playTone(440, 0.15, 'sine', 0.2);
    setTimeout(function () { playTone(554, 0.2, 'sine', 0.2); }, 130);
}

// ===== EMBEDDED STORY DATA =====
var storyData = {
    title: "Sam and the Broken Vase \u2014 A Story About Telling the Truth",
    introduction: "This is a story about a child named Sam who learns why God wants us to always tell the truth, even when it's hard. It's based on the 9th Commandment: 'You shall not give false testimony.' (Exodus 20:16)",
    scenes: [
        {
            sceneNumber: 1,
            narration: "Sam loved playing ball inside the house even though Mom always said, 'Sam, please play outside with the ball.' One sunny afternoon, while Mom was in the kitchen, Sam bounced the ball high in the living room. CRASH! The ball hit Mom's favorite vase \u2014 the one Grandma had given her \u2014 and it shattered into pieces on the floor.",
            choice: null,
            truthOutcome: null,
            lieOutcome: null
        },
        {
            sceneNumber: 2,
            narration: "Sam's heart was beating so fast. 'Oh no... what do I do?' Sam looked at the broken pieces and heard Mom's footsteps coming closer. Sam had two choices.",
            choice: "What should Sam do?",
            truthOutcome: null,
            lieOutcome: null
        },
        {
            sceneNumber: 3,
            narration: "THE TRUTH PATH: Sam took a deep breath and said, 'Mom, I'm really sorry. I was playing ball inside and I broke your vase. I know you told me not to, and I disobeyed. Please forgive me.'",
            choice: null,
            truthOutcome: "Mom knelt down and hugged Sam. 'Thank you for telling me the truth, sweetheart. I'm sad about the vase, but I'm so proud of you for being honest. That takes real courage. The Bible tells us that God loves truth \u2014 and so do I. We can work together to fix things, but trust is something we build by being truthful.' Sam felt a warm peace inside \u2014 the kind that comes from doing the right thing.",
            lieOutcome: null
        },
        {
            sceneNumber: 4,
            narration: "THE LIE PATH: Sam quickly kicked the broken pieces under the couch and pretended nothing happened. When Mom walked in and asked, 'Sam, did you hear a crash?' Sam said, 'No, Mom. Maybe it was the cat.'",
            choice: null,
            truthOutcome: null,
            lieOutcome: "Later that evening, Mom found the broken pieces under the couch. She sat down with Sam and said, 'Sam, I found the vase. I'm not just sad about the vase \u2014 I'm sad that you didn't tell me the truth. When we lie, it breaks something even more important than a vase \u2014 it breaks trust. It takes a long time to build trust back.' Sam's tummy felt heavy with guilt. Sam wished they had just told the truth from the beginning."
        },
        {
            sceneNumber: 5,
            narration: "That night, Mom and Sam read the Bible together. Mom read Exodus 20:16: 'You shall not give false testimony against your neighbor.' She explained, 'God gave us this commandment because He knows that truth is the foundation of love and trust. When we tell the truth, even when it's hard, we are following Jesus \u2014 who called Himself the Way, the Truth, and the Life.' Sam prayed, 'Dear Jesus, help me to always be brave enough to tell the truth, even when I'm scared. Amen.'",
            choice: null,
            truthOutcome: null,
            lieOutcome: null
        }
    ],
    bibleVerses: [
        { reference: "Exodus 20:16", text: "You shall not give false testimony against your neighbor." },
        { reference: "John 14:6", text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'" }
    ],
    moral: "Telling the truth builds trust. Lying breaks it. Jesus is the Truth (John 14:6), and when we follow Him, He gives us the courage to be honest \u2014 even when we're afraid. God always loves a truthful heart!"
};

// ===== EMBEDDED QUIZ DATA =====
var quizData = [
    {
        id: 1,
        question: "Sam broke Mom's vase. What is the RIGHT thing to do?",
        options: ["Tell Mom the truth and say sorry", "Hide the pieces and blame the cat", "Pretend nothing happened", "Run away and hope no one notices"],
        correctAnswerIndex: 0,
        explanation: "Telling the truth and saying sorry is always the right thing, even when it's scary. God gives us courage to be honest!",
        bibleReference: "Exodus 20:16"
    },
    {
        id: 2,
        question: "What does the 9th Commandment teach us?",
        options: ["Do not steal", "Do not give false testimony (do not lie)", "Honor your parents", "Remember the Sabbath"],
        correctAnswerIndex: 1,
        explanation: "The 9th Commandment says 'You shall not give false testimony against your neighbor.' This means God wants us to always be truthful.",
        bibleReference: "Exodus 20:16"
    },
    {
        id: 3,
        question: "In John 14:6, Jesus says 'I am the way and the _____ and the life.'",
        options: ["light", "hope", "truth", "love"],
        correctAnswerIndex: 2,
        explanation: "Jesus said 'I am the way and the TRUTH and the life.' Jesus Himself is the truth \u2014 when we follow Him, we learn to live truthfully!",
        bibleReference: "John 14:6"
    },
    {
        id: 4,
        question: "Your friend asks if you ate the last cookie. You did eat it. What should you say?",
        options: ["No, I didn't eat it", "Maybe the dog ate it", "Yes, I ate it \u2014 I'm sorry!", "I don't know what happened to it"],
        correctAnswerIndex: 2,
        explanation: "Being honest about what we did \u2014 even small things like a cookie \u2014 builds trust with our friends and pleases God.",
        bibleReference: "Exodus 20:16"
    },
    {
        id: 5,
        question: "What happens when we choose to tell the truth?",
        options: ["People might be upset, but they will trust us more", "Nothing good ever happens", "We always get in trouble", "It doesn't really matter"],
        correctAnswerIndex: 0,
        explanation: "When we tell the truth, we build trust. People may feel sad at first, but they will respect and trust us. That's how God designed relationships!",
        bibleReference: "John 14:6"
    },
    {
        id: 6,
        question: "Why does God want us to tell the truth?",
        options: ["Because He wants us to get in trouble", "Because truth builds love, trust, and strong relationships", "Because lies are more fun", "It doesn't matter to God"],
        correctAnswerIndex: 1,
        explanation: "God is truth, and He created us to live in truth. Honest relationships are stronger and full of love \u2014 that's God's plan for us!",
        bibleReference: "John 14:6"
    },
    {
        id: 7,
        question: "What did lying do to Sam's relationship with Mom?",
        options: ["It made Mom trust Sam more", "Nothing changed", "It broke Mom's trust and made Sam feel guilty", "Mom didn't care at all"],
        correctAnswerIndex: 2,
        explanation: "Lying broke trust between Sam and Mom and gave Sam a heavy feeling of guilt. Truth always leads to peace, but lies bring heaviness.",
        bibleReference: "Exodus 20:16"
    }
];

// ===== STATE =====
var playerName = 'Adventurers';
var currentScene = 0;
var currentQ = 0;
var answers = [];
var streak = 0;
var bestStreak = 0;
var pledgeLineIndex = 0;

var sceneEmojis = ['🏠', '😰', '💙', '😬', '📖'];
var encouragements = [
    '💪 Great teamwork, Adventurers!',
    '🌟 Keep it up, truth champions!',
    '✨ God is proud of us for learning!',
    '🙌 We\'re doing amazing together!',
    '💛 Awesome thinking, team!',
    '🎯 Stay focused, we\'ve got this!',
    '⭐ Every answer helps us grow!'
];

// ===== PAGE SWITCHING =====
function showPage(id) {
    document.querySelectorAll('.page').forEach(function (p) {
        p.classList.remove('active');
    });
    var page = document.getElementById(id);
    page.classList.add('active');
    page.style.animation = 'none';
    page.offsetHeight;
    page.style.animation = 'fadeSlideIn 0.6s ease';
    window.scrollTo(0, 0);
}

function goHome() { showPage('welcomePage'); }

// ========================================
//  LESSON INTRO
// ========================================
function goToLesson() { showPage('lessonPage'); }

// ========================================
//  STORY
// ========================================
function startStory() {
    currentScene = 0;
    renderScene();
    showPage('storyPage');
}

function restartStory() {
    currentScene = 0;
    renderScene();
    showPage('storyPage');
}

function renderScene() {
    var total = storyData.scenes.length;
    var scene = storyData.scenes[currentScene];

    document.getElementById('storyTitle').textContent = storyData.title;
    document.getElementById('storyIntro').textContent = storyData.introduction;
    document.getElementById('sceneBadge').textContent = 'Scene ' + scene.sceneNumber + ' of ' + total;

    var emoji = sceneEmojis[currentScene] || '📖';
    document.getElementById('sceneCharacter').textContent = emoji;
    document.getElementById('sceneText').textContent = scene.narration;

    var choiceEl = document.getElementById('sceneChoice');
    var btnBox = document.getElementById('choiceButtons');
    var outcomeBox = document.getElementById('outcomeBox');
    choiceEl.style.display = 'none';
    btnBox.style.display = 'none';
    outcomeBox.style.display = 'none';
    outcomeBox.innerHTML = '';

    if (scene.choice) {
        choiceEl.textContent = '🤔 ' + scene.choice;
        choiceEl.style.display = 'block';
    }

    if (scene.truthOutcome && scene.lieOutcome) {
        btnBox.style.display = 'flex';
    } else if (scene.truthOutcome) {
        showSingleOutcome('truth', scene.truthOutcome);
    } else if (scene.lieOutcome) {
        showSingleOutcome('lie', scene.lieOutcome);
    }

    var versesEl = document.getElementById('versesSection');
    var moralEl = document.getElementById('moralSection');

    if (currentScene === total - 1) {
        var vHtml = '';
        storyData.bibleVerses.forEach(function (v) {
            vHtml += '<div class="verse-item">';
            vHtml += '<p class="ref">📜 ' + v.reference + '</p>';
            vHtml += '<p class="text">"' + v.text + '"</p>';
            vHtml += '</div>';
        });
        document.getElementById('versesList').innerHTML = vHtml;
        versesEl.style.display = 'block';
        document.getElementById('moralText').textContent = storyData.moral;
        moralEl.style.display = 'block';
    } else {
        versesEl.style.display = 'none';
        moralEl.style.display = 'none';
    }

    document.getElementById('btnPrev').disabled = currentScene === 0;
    var nextBtn = document.getElementById('btnNext');
    if (currentScene === total - 1) {
        nextBtn.textContent = '💬 Let\'s Talk About It!';
        nextBtn.className = 'btn btn-go btn-xl wiggle';
    } else {
        nextBtn.textContent = 'Next ➡';
        nextBtn.className = 'btn btn-nav btn-go';
    }
}

function showOutcome(type) {
    var scene = storyData.scenes[currentScene];
    var outcomeBox = document.getElementById('outcomeBox');
    var html = '<div class="both-shown">';
    if (type === 'truth') {
        html += buildOutcomeCard('truth', '💙 When Sam tells the truth:', scene.truthOutcome);
        html += buildOutcomeCard('lie', '💔 But if Sam had lied:', scene.lieOutcome);
    } else {
        html += buildOutcomeCard('lie', '💔 When Sam tells a lie:', scene.lieOutcome);
        html += buildOutcomeCard('truth', '💙 But if Sam had told the truth:', scene.truthOutcome);
    }
    html += '</div>';
    outcomeBox.innerHTML = html;
    outcomeBox.style.display = 'block';
    document.getElementById('choiceButtons').style.display = 'none';
}

function buildOutcomeCard(type, label, text) {
    return '<div class="outcome-card ' + type + '">'
         + '<span class="outcome-label">' + label + '</span>'
         + text + '</div>';
}

function showSingleOutcome(type, text) {
    var label = type === 'truth' ? '💙 Telling the truth:' : '💔 Telling a lie:';
    var outcomeBox = document.getElementById('outcomeBox');
    outcomeBox.innerHTML = buildOutcomeCard(type, label, text);
    outcomeBox.style.display = 'block';
}

function nextScene() {
    if (currentScene < storyData.scenes.length - 1) {
        currentScene++;
        renderScene();
        window.scrollTo(0, 0);
    } else {
        showPage('discussPage');
    }
}

function prevScene() {
    if (currentScene > 0) {
        currentScene--;
        renderScene();
        window.scrollTo(0, 0);
    }
}

// ========================================
//  QUIZ
// ========================================
function startQuiz() {
    currentQ = 0;
    answers = [];
    streak = 0;
    bestStreak = 0;
    renderQuestion();
    showPage('quizPage');
}

function restartQuiz() { startQuiz(); }

function renderQuestion() {
    var total = quizData.length;
    var q = quizData[currentQ];

    document.getElementById('progressBar').style.width = ((currentQ / total) * 100) + '%';
    document.getElementById('progressLabel').textContent = 'Question ' + (currentQ + 1) + ' of ' + total;
    document.getElementById('questionNum').textContent = 'Question ' + (currentQ + 1) + ' of ' + total;
    document.getElementById('questionText').textContent = q.question;

    document.getElementById('optionsList').innerHTML = '';
    document.getElementById('explanationBox').innerHTML = '';
    document.getElementById('countdownOverlay').style.display = 'block';

    updateStreakDisplay();

    var enc = encouragements[Math.floor(Math.random() * encouragements.length)];
    document.getElementById('quizEncouragement').textContent = enc;

    runCountdown(COUNTDOWN_SECONDS, function () {
        document.getElementById('countdownOverlay').style.display = 'none';
        showOptions(q);
    });
}

function runCountdown(seconds, callback) {
    var numEl = document.getElementById('countdownNum');
    var count = seconds;
    numEl.textContent = count;
    soundTick();

    var timer = setInterval(function () {
        count--;
        if (count > 0) {
            numEl.textContent = count;
            numEl.style.animation = 'none';
            numEl.offsetHeight;
            numEl.style.animation = 'countPulse 1s ease-in-out infinite';
            soundTick();
        } else {
            clearInterval(timer);
            numEl.textContent = 'GO!';
            soundGo();
            setTimeout(callback, 400);
        }
    }, 1000);
}

function revealCorrectAnswer() {
    var q = quizData[currentQ];
    var correctIdx = q.correctAnswerIndex;

    // Record as correct for scoring (presenter mode = group got it right)
    answers.push({ questionId: q.id, selectedOption: correctIdx });
    streak++;
    if (streak > bestStreak) bestStreak = streak;
    updateStreakDisplay();

    // Highlight the correct answer
    var buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(function (btn, i) {
        btn.disabled = true;
        btn.onclick = null;
        if (i === correctIdx) btn.classList.add('correct');
    });

    // Show explanation
    var eHtml = '<div class="explain-box right">';
    eHtml += '🎉 The answer is <strong>' + LETTERS[correctIdx] + '</strong>! ' + q.explanation;
    eHtml += '<br><span class="bible-tag">📖 ' + q.bibleReference + '</span></div>';

    var btnLabel = currentQ < quizData.length - 1 ? 'Next Question ➡' : '🏆 See Our Results!';
    eHtml += '<button class="btn btn-go quiz-next-btn" onclick="nextQuestion()">' + btnLabel + '</button>';

    document.getElementById('explanationBox').innerHTML = eHtml;
    launchMiniConfetti();
    soundCorrect();
}

function showOptions(q) {
    highlightedOption = -1;
    readyToConfirm = false;
    var html = '';
    q.options.forEach(function (opt, i) {
        html += '<button class="option-btn" onclick="pickAnswer(' + i + ')">';
        html += '<span class="option-letter">' + LETTERS[i] + '</span>';
        html += opt + '</button>';
    });
    document.getElementById('optionsList').innerHTML = html;
}

function updateOptionHighlight(opts) {
    for (var i = 0; i < opts.length; i++) {
        if (i === highlightedOption) {
            opts[i].classList.add('highlighted');
            opts[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            opts[i].classList.remove('highlighted');
        }
    }
}

function updateStreakDisplay() {
    var bar = document.getElementById('streakBar');
    var text = document.getElementById('streakText');
    if (streak >= 2) {
        bar.style.display = 'inline-block';
        if (streak === 2) text.textContent = '🔥 2 in a row! Nice teamwork!';
        else if (streak === 3) text.textContent = '🔥🔥 3 in a row! We\'re on fire!';
        else if (streak === 4) text.textContent = '🔥🔥🔥 4 in a row! Unstoppable!';
        else text.textContent = '🔥🔥🔥🔥 ' + streak + ' in a row! TRUTH CHAMPIONS!';
        bar.style.animation = 'none';
        bar.offsetHeight;
        bar.style.animation = 'pulse-glow 1.5s ease-in-out infinite, bounceIn 0.5s ease';
    } else {
        bar.style.display = 'none';
    }
}

function pickAnswer(index) {
    var q = quizData[currentQ];
    var isCorrect = index === q.correctAnswerIndex;

    answers.push({ questionId: q.id, selectedOption: index });

    if (isCorrect) { streak++; if (streak > bestStreak) bestStreak = streak; }
    else { streak = 0; }
    updateStreakDisplay();

    var buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(function (btn, i) {
        btn.disabled = true;
        btn.onclick = null;
        if (i === q.correctAnswerIndex) btn.classList.add('correct');
        else if (i === index && !isCorrect) btn.classList.add('wrong');
    });

    var cls = isCorrect ? 'right' : 'oops';
    var prefix = isCorrect ? '🎉 That\'s right! ' : '🤔 Not quite \u2014 here\'s what the Bible says: ';

    var eHtml = '<div class="explain-box ' + cls + '">';
    eHtml += prefix + q.explanation;
    eHtml += '<br><span class="bible-tag">📖 ' + q.bibleReference + '</span></div>';

    var btnLabel = currentQ < quizData.length - 1 ? 'Next Question ➡' : '🏆 See Our Results!';
    eHtml += '<button class="btn btn-go quiz-next-btn" onclick="nextQuestion()">' + btnLabel + '</button>';

    document.getElementById('explanationBox').innerHTML = eHtml;

    if (isCorrect) { launchMiniConfetti(); soundCorrect(); }
    else { soundWrong(); }
}

function nextQuestion() {
    if (currentQ < quizData.length - 1) {
        currentQ++;
        renderQuestion();
        window.scrollTo(0, 0);
    } else {
        calculateScore();
    }
}

// ========================================
//  SCORING (built-in, no server needed)
// ========================================
function calculateScore() {
    var correct = 0;
    var feedback = [];

    answers.forEach(function (ans) {
        var q = quizData.filter(function (item) { return item.id === ans.questionId; })[0];
        if (q) {
            var isCorrect = ans.selectedOption === q.correctAnswerIndex;
            if (isCorrect) correct++;
            feedback.push({ questionId: q.id, correct: isCorrect, explanation: q.explanation });
        }
    });

    var total = answers.length;
    var percent = total > 0 ? Math.round((correct * 100) / total) : 0;

    var message, encouragement;
    if (percent === 100) {
        message = 'Amazing job, Adventurers! We got every answer right!';
        encouragement = 'We truly understand the value of truth. Keep shining your light for Jesus!';
    } else if (percent >= 70) {
        message = 'Great work, Adventurers! We know a lot about truth!';
        encouragement = 'Keep learning and growing in God\'s Word. Jesus is the way, the truth, and the life!';
    } else if (percent >= 40) {
        message = 'Good try, Adventurers! We\'re learning!';
        encouragement = 'Let\'s read the story again and remember \u2014 God loves a truthful heart. We can always try again!';
    } else {
        message = 'Don\'t give up, Adventurers! Every try helps us learn.';
        encouragement = 'Let\'s go back and read the story of Sam. Remember Exodus 20:16 \u2014 God wants us to always tell the truth. We\'ll do better next time!';
    }

    var result = {
        playerName: playerName,
        totalQuestions: total,
        correctAnswers: correct,
        scorePercent: percent,
        message: message,
        encouragement: encouragement,
        verse: { reference: 'John 14:6', text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'" },
        feedback: feedback
    };

    renderResults(result);
    showPage('resultsPage');
    launchCelebration();
    soundCelebration();
}

function renderResults(r) {
    var pct = r.scorePercent;

    document.getElementById('scoreRing').style.background =
        'conic-gradient(#43a047 ' + pct + '%, rgba(255,255,255,0.2) ' + pct + '%)';
    document.getElementById('scoreNum').textContent = pct + '%';

    var starCount = pct >= 100 ? 5 : pct >= 80 ? 4 : pct >= 60 ? 3 : pct >= 40 ? 2 : 1;
    var stars = '';
    for (var i = 0; i < 5; i++) stars += i < starCount ? '⭐' : '☆';
    document.getElementById('scoreStars').textContent = stars;

    document.getElementById('resultMessage').textContent = r.message;
    document.getElementById('resultEncouragement').textContent = r.encouragement;

    // Badge
    var bIcon = document.getElementById('badgeIcon');
    var bTitle = document.getElementById('badgeTitle');
    var bDesc = document.getElementById('badgeDesc');

    if (pct === 100) {
        bIcon.textContent = '👑'; bTitle.textContent = 'Truth Champions!';
        bDesc.textContent = 'Perfect score! We truly understand God\'s commandment about truth!';
    } else if (pct >= 70) {
        bIcon.textContent = '🛡️'; bTitle.textContent = 'Truth Defenders!';
        bDesc.textContent = 'Great job! We know the power of honesty and following Jesus!';
    } else if (pct >= 40) {
        bIcon.textContent = '🌱'; bTitle.textContent = 'Truth Seekers!';
        bDesc.textContent = 'Good effort! Let\'s keep growing in God\'s Word!';
    } else {
        bIcon.textContent = '📖'; bTitle.textContent = 'Bible Explorers!';
        bDesc.textContent = 'Every journey starts somewhere! Let\'s read the story again and try once more!';
    }

    if (bestStreak >= 2) bDesc.textContent += ' (Best streak: ' + bestStreak + ' in a row! 🔥)';
    document.getElementById('badgeEarned').style.display = 'block';

    if (r.verse) {
        document.getElementById('resultVerse').innerHTML =
            '<p class="ref">📖 ' + r.verse.reference + '</p>' +
            '<p class="text">"' + r.verse.text + '"</p>';
    }

    if (r.feedback && r.feedback.length > 0) {
        var html = '<h3>📝 How We Did</h3>';
        r.feedback.forEach(function (fb, i) {
            var icon = fb.correct ? '✅' : '❌';
            html += '<div class="feedback-item">';
            html += '<span class="fb-icon">' + icon + '</span>';
            html += '<span class="fb-text"><strong>Q' + (i + 1) + ':</strong> ' + fb.explanation + '</span>';
            html += '</div>';
        });
        document.getElementById('feedbackList').innerHTML = html;
    }

    document.getElementById('progressBar').style.width = '100%';
}

// ========================================
//  DISCUSSION — reveal suggested answers
// ========================================
function revealDiscuss(num) {
    document.getElementById('discussAns' + num).style.display = 'block';
    var btn = document.getElementById('discussAns' + num).previousElementSibling;
    if (btn && btn.classList.contains('btn-reveal')) {
        btn.style.display = 'none';
    }
    soundChime();
}

// ========================================
//  MEMORY VERSE CHALLENGE
// ========================================
function goToMemoryVerse() {
    document.getElementById('verse1Display').innerHTML =
        '"You shall not give <span class="memory-blank">_____</span> testimony against your <span class="memory-blank">_____</span>."';
    document.getElementById('verse2Display').innerHTML =
        '"Jesus answered, \'I am the <span class="memory-blank">_____</span> and the <span class="memory-blank">_____</span> and the <span class="memory-blank">_____</span>. No one comes to the <span class="memory-blank">_____</span> except through me.\'"';

    document.getElementById('revealed1').style.display = 'none';
    document.getElementById('revealed2').style.display = 'none';
    document.getElementById('reveal1').style.display = '';
    document.getElementById('reveal2').style.display = '';

    for (var i = 1; i <= 3; i++) {
        var btn = document.getElementById('attempt' + i);
        btn.classList.remove('done');
        btn.textContent = 'Try ' + i;
    }

    showPage('memoryPage');
}

function revealVerse(num) {
    document.getElementById('revealed' + num).style.display = 'block';
    document.getElementById('reveal' + num).style.display = 'none';
    launchMiniConfetti();
    soundChime();
}

function markAttempt(num) {
    var btn = document.getElementById('attempt' + num);
    btn.classList.add('done');
    btn.textContent = '✓';
    if (num === 3) { launchCelebration(); soundCelebration(); }
    else { launchMiniConfetti(); soundChime(); }
}

// ========================================
//  TRUTH PLEDGE
// ========================================
function goToPledge() {
    pledgeLineIndex = 0;
    for (var i = 1; i <= 5; i++) {
        var line = document.getElementById('pledgeLine' + i);
        line.classList.remove('active', 'read');
    }
    document.getElementById('pledgeReadBtn').style.display = '';
    document.getElementById('pledgeReadBtn').textContent = '📢 Read It Together \u2014 Line by Line!';
    document.getElementById('pledgeReadBtn').onclick = startPledgeRead;
    document.getElementById('closingPrayer').style.display = 'none';
    document.getElementById('finalActions').style.display = 'none';
    showPage('pledgePage');
}

function startPledgeRead() {
    pledgeLineIndex = 0;
    highlightPledgeLine();
    document.getElementById('pledgeReadBtn').textContent = '👉 Next Line';
    document.getElementById('pledgeReadBtn').onclick = nextPledgeLine;
}

function highlightPledgeLine() {
    for (var i = 1; i <= 5; i++) {
        document.getElementById('pledgeLine' + i).classList.remove('active');
    }
    if (pledgeLineIndex < 5) {
        document.getElementById('pledgeLine' + (pledgeLineIndex + 1)).classList.add('active');
    }
}

function nextPledgeLine() {
    if (pledgeLineIndex < 5) {
        document.getElementById('pledgeLine' + (pledgeLineIndex + 1)).classList.remove('active');
        document.getElementById('pledgeLine' + (pledgeLineIndex + 1)).classList.add('read');
        soundPledgeLine();
    }
    pledgeLineIndex++;
    if (pledgeLineIndex < 5) {
        highlightPledgeLine();
    } else {
        document.getElementById('pledgeReadBtn').style.display = 'none';
        document.getElementById('closingPrayer').style.display = '';
        document.getElementById('finalActions').style.display = '';
        launchCelebration();
        soundCelebration();
    }
}

// ========================================
//  CONFETTI
// ========================================
var confettiPieces = [];
var confettiRunning = false;

function launchCelebration() {
    var colors = ['#ffd54f', '#43a047', '#e53935', '#1e88e5', '#ab47bc', '#ff9800', '#fff'];
    for (var i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * -window.innerHeight,
            w: Math.random() * 10 + 5, h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 4, vy: Math.random() * 4 + 2,
            rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 10, life: 1
        });
    }
    if (!confettiRunning) { confettiRunning = true; animateConfetti(); }
}

function launchMiniConfetti() {
    var colors = ['#ffd54f', '#43a047', '#66bb6a', '#fff'];
    for (var i = 0; i < 30; i++) {
        confettiPieces.push({
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
            y: window.innerHeight / 2 + (Math.random() - 0.5) * 100,
            w: Math.random() * 8 + 3, h: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 1) * 6,
            rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 15, life: 1
        });
    }
    if (!confettiRunning) { confettiRunning = true; animateConfetti(); }
}

function animateConfetti() {
    var canvas = document.getElementById('confettiCanvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var alive = [];
    for (var i = 0; i < confettiPieces.length; i++) {
        var p = confettiPieces[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.rot += p.rotV; p.life -= 0.005;
        if (p.life > 0 && p.y < canvas.height + 20) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
            alive.push(p);
        }
    }
    confettiPieces = alive;
    if (confettiPieces.length > 0) { requestAnimationFrame(animateConfetti); }
    else { confettiRunning = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

window.addEventListener('resize', function () {
    var canvas = document.getElementById('confettiCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========================================
//  KEYBOARD / WIRELESS PRESENTER CONTROLS
// ========================================
//  Most wireless presenters send these keys:
//    Next slide  → ArrowRight, ArrowDown, PageDown, Space
//    Prev slide  → ArrowLeft, ArrowUp, PageUp
//
//  Number keys 1-4 select quiz answers A-D
//  'R' reveals the next discussion answer
//  'V' reveals the next memory verse
//  'T' advances the pledge line

var discussRevealIndex = 0;
var memoryRevealIndex = 0;

function getActivePage() {
    var active = document.querySelector('.page.active');
    return active ? active.id : '';
}

document.addEventListener('keydown', function (e) {
    var key = e.key;
    var page = getActivePage();

    // === FORWARD / NEXT ===
    if (key === 'ArrowRight' || key === 'ArrowDown' || key === 'PageDown' || key === ' ') {
        e.preventDefault();
        handleNext(page);
        return;
    }

    // === BACK / PREVIOUS ===
    if (key === 'ArrowLeft' || key === 'ArrowUp' || key === 'PageUp') {
        e.preventDefault();
        handlePrev(page);
        return;
    }

    // === NUMBER KEYS: pick quiz answer ===
    if (page === 'quizPage' && key >= '1' && key <= '4') {
        var optIndex = parseInt(key) - 1;
        var optBtns = document.querySelectorAll('.option-btn');
        if (optBtns.length > optIndex && !optBtns[optIndex].disabled) {
            pickAnswer(optIndex);
        }
        return;
    }

    // === R: reveal next discussion answer ===
    if ((key === 'r' || key === 'R') && page === 'discussPage') {
        revealNextDiscuss();
        return;
    }

    // === V: reveal next memory verse ===
    if ((key === 'v' || key === 'V') && page === 'memoryPage') {
        revealNextMemoryVerse();
        return;
    }

    // === T: advance pledge line ===
    if ((key === 't' || key === 'T') && page === 'pledgePage') {
        var readBtn = document.getElementById('pledgeReadBtn');
        if (readBtn && readBtn.style.display !== 'none') {
            readBtn.onclick();
        }
        return;
    }
});

// Auto-scroll: if page has more content below, scroll down first.
// Only navigate to the next page when already at the bottom.
function isNearBottom() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var windowHeight = window.innerHeight;
    var docHeight = document.documentElement.scrollHeight;
    return (scrollTop + windowHeight) >= (docHeight - 80);
}

function smoothScrollDown() {
    window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
}

function handleNext(page) {
    // If there's content below the fold, scroll down first
    if (!isNearBottom()) {
        smoothScrollDown();
        return;
    }

    switch (page) {
        case 'welcomePage':
            goToLesson();
            break;

        case 'lessonPage':
            startStory();
            break;

        case 'storyPage':
            var choiceBtns = document.getElementById('choiceButtons');
            if (choiceBtns && choiceBtns.style.display === 'flex') {
                showOutcome('truth');
            } else {
                nextScene();
            }
            break;

        case 'discussPage':
            var unrevealed = document.querySelectorAll('#discussPage .btn-reveal');
            var hasUnrevealed = false;
            for (var i = 0; i < unrevealed.length; i++) {
                if (unrevealed[i].style.display !== 'none') { hasUnrevealed = true; break; }
            }
            if (hasUnrevealed) {
                revealNextDiscuss();
                // Scroll to the revealed answer
                setTimeout(function () {
                    var answers = document.querySelectorAll('#discussPage .discuss-answer');
                    for (var j = answers.length - 1; j >= 0; j--) {
                        if (answers[j].style.display !== 'none') {
                            answers[j].scrollIntoView({ behavior: 'smooth', block: 'center' });
                            break;
                        }
                    }
                }, 100);
            } else {
                startQuiz();
            }
            break;

        case 'quizPage':
            var nextBtn = document.querySelector('.quiz-next-btn');
            if (nextBtn) {
                // Explanation showing — move to next question
                nextQuestion();
            } else {
                // Options visible — reveal the correct answer immediately
                var opts = document.querySelectorAll('.option-btn');
                if (opts.length > 0 && !opts[0].disabled) {
                    revealCorrectAnswer();
                }
            }
            break;

        case 'resultsPage':
            goToMemoryVerse();
            break;

        case 'memoryPage':
            var rev1 = document.getElementById('reveal1');
            var rev2 = document.getElementById('reveal2');
            if (rev1 && rev1.style.display !== 'none') {
                revealVerse(1);
            } else if (rev2 && rev2.style.display !== 'none') {
                revealVerse(2);
            } else {
                goToPledge();
            }
            break;

        case 'pledgePage':
            var readBtn = document.getElementById('pledgeReadBtn');
            if (readBtn && readBtn.style.display !== 'none') {
                readBtn.onclick();
            }
            break;
    }
}

function handlePrevScroll(page) {
    // If not at the top, scroll up first before going to previous page
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 100) {
        window.scrollBy({ top: -(window.innerHeight * 0.7), behavior: 'smooth' });
        return true;
    }
    return false;
}

function handlePrev(page) {
    // Scroll up first if not at top
    if (handlePrevScroll(page)) return;

    switch (page) {
        case 'lessonPage':
            goHome();
            break;
        case 'storyPage':
            if (currentScene > 0) prevScene();
            else showPage('lessonPage');
            break;
        case 'discussPage':
            restartStory();
            currentScene = storyData.scenes.length - 1;
            renderScene();
            break;
        case 'quizPage':
            showPage('discussPage');
            break;
        case 'resultsPage':
            showPage('quizPage');
            break;
        case 'memoryPage':
            showPage('resultsPage');
            break;
        case 'pledgePage':
            goToMemoryVerse();
            break;
    }
}

function revealNextDiscuss() {
    var btns = document.querySelectorAll('#discussPage .btn-reveal');
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].style.display !== 'none') {
            // Find the answer div — it's the next sibling
            var ansDiv = btns[i].nextElementSibling;
            if (ansDiv) ansDiv.style.display = 'block';
            btns[i].style.display = 'none';
            return;
        }
    }
}

function revealNextMemoryVerse() {
    var rev1 = document.getElementById('reveal1');
    var rev2 = document.getElementById('reveal2');
    if (rev1 && rev1.style.display !== 'none') { revealVerse(1); }
    else if (rev2 && rev2.style.display !== 'none') { revealVerse(2); }
}
