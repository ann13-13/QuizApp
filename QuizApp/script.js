const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;
};

let questions = [],
    time = 30,
    score = 0,
    currentQuestion,
    timer;


const startBtn = document.querySelector(".start"),
    numQuestions = document.querySelector('#num-questions'),
    category = document.querySelector('#category'),
    difficulty = document.querySelector('#difficulty'),
    timePerQuestion = document.querySelector('#time'),
    quiz = document.querySelector('.quiz'),
    startscreen = document.querySelector('.start-screen');

const startQuiz = () => {
    const num = numQuestions.value;
    cat = category.value;
    diff = difficulty.value;

    //api url
    const YOUR_API_KEY = 'UcIUK3bGAsgs1XlsxJODNWWKVPGos3ouL6740zg6'; 
    const url = `https://quizapi.io/api/v1/questions?apiKey=${YOUR_API_KEY}&category=code&difficulty=${diff}&limit=${num}&tags=${cat}`;
    fetch(url)
        .then((res) => res.json())
        .then((results) => {
            questions = results;
            console.log(questions);
            startscreen.classList.add("hide");
            quiz.classList.remove("hide");
            currentQuestion = 1;
            showQuestion(questions[0]);
        });
};

startBtn.addEventListener('click', startQuiz);

const showQuestion = (question) => {
    const questionText = document.querySelector(".question");
    answersWrapper = document.querySelector(".answer-wrapper"),
    questionNumber = document.querySelector(".number");
    questionText.innerHTML = question.question;

    const answers = [question.answers.answer_a,
         question.answers.answer_b,
        question.answers.answer_c,
        question.answers.answer_d];

       answers.forEach(function(item, i, answers){
        if (item != null && item != undefined){
            answers[i] = item.toString();
        }
       });

    answers.sort(() => Math.random() - 0.5);
    answersWrapper.innerHTML = " ";
    answers.forEach((answer) => {
        answersWrapper.innerHTML += `
        <div class="answer">
            <span class="text">${answer}</span>
            <span class="checkbox">
                <span class="icon">✓</span>
            </span>
            </div>              
    `;
    });

    questionNumber.innerHTML = `
    Question <span class = "current"> ${
        questions.indexOf(question) + 1
    }</span><span class = "total">/${questions.length}</span>
    `;

const answersDiv = document.querySelectorAll(".answers");
answersDiv.forEach((answer) => {
    answer.addevwntListener("click", () => {
        if (!answer.classList.contains("checked")) {
            answersDiv.forEach((answer) => {
                answer.classList.remove("selected");
            }); 
            answer.classList.add("selected");
            submitBtn.disabled = false; 
        };
    });
});

    time = timePerQuestion.value;
    startTimer (time);
};
const startTimer = (time) => {
    timer = setInterval(() => {
      if (time >= 0) {
        progress(time);
        time--;
      } else {
        checkAnswer();
      }
    }, 1000);
  };
  
  const loadingAnimation = () => {
    startBtn.innerHTML = "Загрузка";
    const loadingInterval = setInterval(() => {
      if (startBtn.innerHTML.length === 10) {
        startBtn.innerHTML = "Загрузка";
      } else {
        startBtn.innerHTML += ".";
      }
    }, 500);
  };
  const submitBtn = document.querySelector(".submit"),
    nextBtn = document.querySelector(".next");
  submitBtn.addEventListener("click", () => {
    checkAnswer();
  });
  
  nextBtn.addEventListener("click", () => {
    nextQuestion();
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
  });
  
  const checkAnswer = () => {
    clearInterval(timer);
    const selectedAnswer = document.querySelector(".answer.selected");
    if (selectedAnswer) {
      const answer = selectedAnswer.querySelector(".text").innerHTML;
      console.log(currentQuestion);
      if (answer === questions[currentQuestion - 1].correct_answer) {
        score++;
        selectedAnswer.classList.add("correct");
      } else {
        selectedAnswer.classList.add("wrong");
        const correctAnswer = document
          .querySelectorAll(".answer")
          .forEach((answer) => {
            if (
              answer.querySelector(".text").innerHTML ===
              questions[currentQuestion - 1].correct_answers
            ) {
              answers.classList.add("correct");
            }
          });
      }
    } else {
      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answers
          ) {
            answers.classList.add("correct");
          }
        });
    }
    const answersDiv = document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
      answer.classList.add("checked");
    });
  
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length) {
      currentQuestion++;
      showQuestion(questions[currentQuestion - 1]);
    } else {
      showScore();
    }
  };
  
  const endScreen = document.querySelector(".end-screen"),
    finalScore = document.querySelector(".final-score"),
    totalScore = document.querySelector(".total-score");
  const showScore = () => {
    endScreen.classList.remove("hide");
    quiz.classList.add("hide");
    finalScore.innerHTML = score;
    totalScore.innerHTML = `/ ${questions.length}`;
  };
  
  const restartBtn = document.querySelector(".restart");
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });

  