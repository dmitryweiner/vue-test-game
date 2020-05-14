import { shallowMount } from "@vue/test-utils";
import Question from "./Question.vue";
import { generateQuestion } from "../services/questions";

describe("Question.vue", () => {
  test("renders question", () => {
    const question = generateQuestion();
    const wrapper = shallowMount(Question, {
      propsData: { question }
    });
    expect(wrapper.text().replace(/\s/g, '')).toMatch(
      `${question.firstOperand} ${question.operator} ${question.secondOperand} = ?`.replace(/\s/g, '')
    );
  });
});
