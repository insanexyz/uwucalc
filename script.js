class Calculator {

  currenOperand = "";
  previousOperand = "";
  operation = undefined;

  constructor(previousOperandTextElement, currenOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currenOperandTextElement = currenOperandTextElement;
    this.clear();
  }

  clear() {
    this.currenOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {

  }

  appendNumber(number) {
    // this.currenOperand = this.currenOperand.toString() + number.toString();

    // Allow only one period
    if (number === "." && this.currenOperand.includes(".")) return;

    this.currenOperand += number;
  }

  chooseOperation(operation) {
    this.operation = operation;
    this.previousOperand = this.currenOperand;
    this.currenOperand = "";
  }

  compute() {

  }

  updateDisplay() {
    this.currenOperandTextElement.innerText = this.currenOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const clickSound = new Audio("./audios/gunshot.mp3");
const uwuSound = new Audio("./audios/uwu.mp3");

const calculatorContainer = document.querySelector(".calculator-container");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currenOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currenOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();

      // Floating heart
    const heart = document.createElement('span');
    heart.innerHTML = '💖';  // Or ❤️
    heart.classList.add('floating-heart');
    
    // Randomize position/speed
    heart.style.left = Math.random() * 80 + 'vw';
    heart.style.animationDuration = (2.5 + Math.random() * 1) + 's';
    
    document.body.appendChild(heart);
    
    // Auto-remove after animation
    setTimeout(() => heart.remove(), 3500);


    uwuSound.currentTime = 0; // For rapid sound
    uwuSound.play();

  })
})

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
})

equalsButton.addEventListener("click", () => {

    clickSound.currentTime = 0; // For rapid sound
    clickSound.play();
    calculatorContainer.classList.remove("shake");
    void calculatorContainer.offsetWidth;  // Forces reflow
    calculatorContainer.classList.add("shake");
})