const lightModeBtn = document.getElementById("theme-light");
const darkModeBtn = document.getElementById("theme-dark");
const displayInput = document.getElementById("display-input");
const displayResult = document.getElementById("display-result");
const resetBtn = document.getElementById("reset");
const deeBtn = document.getElementById("delete");
const operatorBtn = document.querySelectorAll(".btn--operator");
const numberBtn = document.querySelectorAll(".btn--number");
const equalsBtn = document.getElementById("equals");

let value = "";
let sign = "";
let currentNumber = "";
let isNextNumber = false;
let inputString = "";
let result = "0";
let isDark = true;

darkModeBtn.style.display = "none";

function applyTheme(dark) {
  isDark = dark;

  lightModeBtn.style.display = dark ? "" : "none";
  darkModeBtn.style.display = dark ? "none" : "";
}

lightModeBtn.addEventListener("click", () => applyTheme(false));
darkModeBtn.addEventListener("click", () => applyTheme(true));

function updateDisplayInput() {
  displayInput.textContent = inputString;
}

function updateDisplayResult(result) {
  displayResult.textContent = result;
}

resetBtn.addEventListener("click", () => {
  value = "";
  sign = "";
  currentNumber = "";
  isNextNumber = false;
  inputString = "";
  result = "0";
  updateDisplayInput();
  updateDisplayResult("");
});

deeBtn.addEventListener("click", () => {
  inputString = inputString.slice(0, -1);
  currentNumber = currentNumber.slice(0, -1);
  updateDisplayInput();
});

operatorBtn.forEach((op) => {
  op.addEventListener("click", (o) => {
    sign = o.currentTarget.dataset.value;
    const lastChar = inputString.at(-1);
    const isOperator = ["+", "-", "*", "/"].includes(lastChar);

    if (sign && currentNumber && !isOperator) {
      isNextNumber = true;
      inputString += sign;
      updateDisplayInput();
    }
  });
});

numberBtn.forEach((num) => {
  num.addEventListener("click", (n) => {
    value = n.currentTarget.dataset.value;

    if (value === "." && currentNumber.includes(".")) return;

    if (value) {
      if (isNextNumber) {
        currentNumber = value;
        isNextNumber = false;
      } else {
        currentNumber += value;
      }
      inputString += value;
      updateDisplayInput();
    }
  });
});

equalsBtn.addEventListener("click", () => {
  if (inputString) {
    result = eval(inputString);
    updateDisplayResult(result);
    inputString = String(result);
    currentNumber = String(result);
    isNextNumber = true;
  }
});
