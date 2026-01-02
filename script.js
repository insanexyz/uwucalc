class Calculator {

  currentOperand = "";
  previousOperand = "";
  operation = undefined;

  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    // this.currentOperand = this.currentOperand.toString() + number.toString();

    // Allow only one period
    if (number === "." && this.currentOperand.includes(".")) return;

    this.currentOperand += number;
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation !== undefined) {
      this.previousOperandTextElement.innerText = ` ${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
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
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

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

  calculator.compute();
  calculator.updateDisplay();

  clickSound.currentTime = 0; // For rapid sound
  clickSound.play();
  calculatorContainer.classList.remove("shake");
  void calculatorContainer.offsetWidth;  // Forces reflow
  calculatorContainer.classList.add("shake");
})

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
})