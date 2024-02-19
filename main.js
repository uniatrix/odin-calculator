let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("keydown", function (event) {
  const key = event.key; // '0' to '9', '-', '+', '*', '/', 'Enter', 'Backspace'
  if (
    (key >= "0" && key <= "9") ||
    key === "-" ||
    key === "+" ||
    key === "*" ||
    key === "/" ||
    key === "Enter" ||
    key === "Backspace"
  ) {
    // if the key is a number, an operator, 'Enter', or 'Backspace'
    let buttonClass;
    if (key >= "0" && key <= "9") {
      buttonClass = "btn number";
    } else if (key === "Enter") {
      buttonClass = "btn equal";
    } else if (key === "Backspace") {
      // Target the clear button by its ID
      document.getElementById("clear-btn").click();
      return;
    } else {
      buttonClass = "btn operator";
    }
    const buttons = document.getElementsByClassName(buttonClass);
    for (let button of buttons) {
      if (
        button.textContent == key ||
        button.classList.contains("btn equal") ||
        button.id == "clear-btn"
      ) {
        button.click(); // simulate a click on the button
        break;
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let clear = document.querySelector("#clear-btn");
  let equal = document.querySelector(".equal");
  let decimal = document.querySelector(".decimal");

  let numbers = document.querySelectorAll(".number");
  let operators = document.querySelectorAll(".operator");

  let previousScreen = document.querySelector(".previous");
  let currentScreen = document.querySelector(".current");

  numbers.forEach((number) =>
    number.addEventListener("click", function (e) {
      handleNumber(e.target.textContent);
      currentScreen.textContent = currentValue;
    })
  );

  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      handleOperator(e.target.textContent);
      previousScreen.textContent = previousValue + " " + operator;
      currentScreen.textContent = currentValue;
    })
  );

  clear.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
  });

  equal.addEventListener("click", function () {
    if (currentValue != "" && previousValue != "") {
      calculate();
      previousScreen.textContent = "";
      if (previousValue.length <= 8) {
        currentScreen.textContent = previousValue;
      } else {
        currentScreen.textContent = previousValue.slice(0, 5) + "...";
      }
    }
  });

  decimal.addEventListener("click", function () {
    addDecimal();
  });
});

function handleNumber(num) {
  if (currentValue.length <= 8) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "*") {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}
