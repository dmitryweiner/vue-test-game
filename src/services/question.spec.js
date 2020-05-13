import {checkAnswer, generateQuestion} from "./questions";

describe("Questions service", () => {
  test("should generate question", () => {
    const question = generateQuestion();
    expect(question.firstOperand + "").toMatch(/[0-9]?/);
    expect(question.secondOperand + "").toMatch(/[0-9]?/);
    expect(question.operator).toMatch(/[+\-*]?/);
  });

  test.each`
    a     | b     | operator | result
    ${1}  | ${2}  | ${'+'}   | ${3}
    ${7}  | ${6}  | ${'+'}   | ${13}
    ${4}  | ${2}  | ${'+'}   | ${6}
    ${1}  | ${2}  | ${'-'}   | ${-1}
    ${7}  | ${5}  | ${'-'}   | ${2}
    ${10} | ${3}  | ${'-'}   | ${7}
    ${1}  | ${2}  | ${'*'}   | ${2}
    ${3}  | ${7}  | ${'*'}   | ${21}
    ${4}  | ${8}  | ${'*'}   | ${32}
  `("should correctly check answer: $a $operator $b should be $result", ({a, b, operator, result}) => {
    const question = {
      firstOperand: a,
      secondOperand: b,
      operator
    };
    expect(checkAnswer(question, result)).toBe(true);
  });
});
