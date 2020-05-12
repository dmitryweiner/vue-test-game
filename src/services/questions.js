export function generateQuestion() {
  const firstOperand = Math.ceil(Math.random() * 10 + 1);
  const secondOperand = Math.ceil(Math.random() * 10 + 1);
  const operatorNum = Math.ceil(Math.random() * 3);
  let operator;
  switch (operatorNum) {
    case 1:
      operator = "+";
      break;
    case 2:
      operator = "-";
      break;
    case 3:
      operator = "*";
      break;
    default:
      operator = "";
  }
  return {
    firstOperand,
    secondOperand,
    operator
  };
}

export function checkAnswer(question, answer) {
  let result;
  switch (question.operator) {
    case "+":
      result = question.firstOperand + question.secondOperand === answer;
      break;
    case "-":
      result = question.firstOperand - question.secondOperand === answer;
      break;
    case "*":
      result = question.firstOperand * question.secondOperand === answer;
      break;
    default:
      result = false;
  }
  return result;
}
