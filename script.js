function playSound(audio) {
  audio.currentTime = 0;
  audio.play();
}

// 🔊 Sound effects
const soundCorrect = new Audio("correct.mp3");
const soundWrong = new Audio("wrong.mp3");
const soundNext = new Audio("next.mp3");
const soundFinish = new Audio("finish.mp3");

// 🔹 All available quiz questions (10 total)
const fullQuizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style System"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used to define a link?",
    options: ["<link>", "<a>", "<href>", "<button>"],
    answer: "<a>"
  },
  {
    question: "What does JS stand for?",
    options: ["JavaScript", "JavaServer", "JustScript", "JumboScript"],
    answer: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HighText Machine Language", "HyperText Markdown Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which tag is used to create a Unordered list in HTML?",
    options: ["<table>", "<ul>", "<list>", "<ol>"],
    answer: "<ul>"
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Float"],
    answer: "Float"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Microsoft", "Netscape", "Oracle"],
    answer: "Netscape"
  },
  {
    question: "How do you write a comment in JavaScript?",
    options: ["<!-- Comment -->", "// Comment", "** Comment **", "# Comment"],
    answer: "// Comment"
  },
  {
    question: "Which method is used to output data in JS?",
    options: ["console.log()", "print()", "echo()", "write()"],
    answer: "console.log()"
  }
];

// 🔹 Shuffle the array using Fisher-Yates Algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 🔹 Pick first 5 after shuffling
const quizData = shuffle(fullQuizData).slice(0, 5);

// 🔹 Quiz State Variables
let current = 0;
let score = 0;

// 🔹 DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("question-box");
const finalScore = document.getElementById("final-score");
const progressBar = document.getElementById("progress");

// 🔹 Load question dynamically
function loadQuestion() {
  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  // Update progress bar
  const progress = ((current) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;

  // Load each option
  q.options.forEach(opt => {
    const li = document.createElement("li");
    li.textContent = opt; // safer than innerHTML
    li.addEventListener("click", () => handleAnswer(li, q.answer));
    optionsEl.appendChild(li);
  });
}

// 🔹 Handle user selection
function handleAnswer(selected, correctAnswer) {
if (selected.textContent.trim() === correctAnswer) {
  soundCorrect.play(); // ✅ play correct sound
  
} else {
  soundWrong.play(); // ❌ play wrong sound
  
}

  const allOptions = document.querySelectorAll("#options li");
  allOptions.forEach(opt => opt.style.pointerEvents = "none"); // disable other clicks

  // Add icon & feedback
  const icon = document.createElement("i");
  icon.classList.add("ph");

  if (selected.textContent.trim() === correctAnswer) {
    selected.classList.add("correct");
    icon.classList.add("ph-check-circle");
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    selected.classList.add("incorrect");
    icon.classList.add("ph-x-circle");
    feedbackEl.textContent = `❌ Correct answer: "${correctAnswer}"`;
    allOptions.forEach(li => {
      if (li.textContent.trim() === correctAnswer) li.classList.add("correct");
    });
  }

  selected.appendChild(icon);
  nextBtn.disabled = false;
}

// 🔹 Next Question Button Handler
nextBtn.addEventListener("click", () => {
  const isLastQuestion = current === quizData.length - 1;

  if (!isLastQuestion) {
    playSound(soundNext); // Only play "next" sound if not the last question
    current++;
    loadQuestion();
  } else {
    showResult(); // Automatically plays finish sound here
  }
});



// 🔹 Show Final Result
function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  finalScore.innerHTML = `🎯 You got <strong>${score}</strong> out of <strong>${quizData.length}</strong>`;
  progressBar.style.width = `100%`;
  soundFinish.play(); // 🏁 play finish sound
}

// 🔹 Start Quiz
loadQuestion();
