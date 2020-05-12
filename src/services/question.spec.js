import {checkAnswer, generateQuestion} from "./questions";

describe("Questions service", () => {
  test("should generate question", () => {
    const question = generateQuestion();
    expect(question.firstOperand + "").toMatch(/[0-9]?/);
    expect(question.secondOperand + "").toMatch(/[0-9]?/);
    expect(question.operator).toMatch(/[+\-*]?/);
  });

  test("should correctly check answer", () => {
    const question = generateQuestion();
    switch (question.operator) {
      case "+":
        expect(checkAnswer(question, question.firstOperand + question.secondOperand)).toBe(true);
        expect(checkAnswer(question, question.firstOperand + question.secondOperand + 1)).toBe(false);
        break;
      case "-":
        expect(checkAnswer(question, question.firstOperand - question.secondOperand)).toBe(true);
        expect(checkAnswer(question, question.firstOperand - question.secondOperand + 1)).toBe(false);
        break;
      case "*":
        expect(checkAnswer(question, question.firstOperand * question.secondOperand)).toBe(true);
        expect(checkAnswer(question, question.firstOperand * question.secondOperand + 1)).toBe(false);
        break;
      default:
    }
  });
});
