const display = document.getElementById("display");
let expression = "";

//For Factorial
function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

//To make the visible vale zero after a claculation
function updateDisplay() {
  display.value = expression || "0";
}

function calculate() {
  try {
    let expr = expression
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/\^/g, "**")
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E")
      .replace(/√/g, "Math.sqrt");

    //Calling factorial function
    if (expr.includes("!")) {
      expr = expr.replace(/(\d+)!/g, (_, n) => factorial(Number(n)));
    }

    const result = eval(expr);  //To evaluate the expression
    saveToHistory(expression, result); //It is saved here.
    expression = result.toString();
    updateDisplay();
  } catch {
    display.value = "Error";  //To catcj errors in cases like dividing by zero
    expression = "";
  }
}

//For functioning of the buttons like = and C
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.textContent;
    if (val === "C") expression = "";
    else if (val === "=") return calculate();
    else expression += val;
    updateDisplay();
  });
});

//For Keyboard input
document.addEventListener("keydown", e => {
  const key = e.key;
  if (/[0-9+\-*/.%^]/.test(key)) expression += key;  //For signs
  else if (key === "Enter") calculate(); //For equals to
  else if (key === "Backspace") expression = expression.slice(0, -1); //For clear only one digit
  else if (key === "Escape") expression = ""; //For ersing everything
  updateDisplay();
});

//For seeing the history
function saveToHistory(expr, result) {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.push({ expr, result });
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

function clearHistory() {
  localStorage.removeItem("calcHistory");
}

