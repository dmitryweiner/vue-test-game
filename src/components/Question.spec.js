// TESTED BY DEVELOPER'S HANDS AND EYES
import { shallowMount } from "@vue/test-utils";
import Question from "./Question.vue";
import { generateQuestion } from "../services/questions";

describe("Question.vue", () => {
  test("renders question", () => {
    const question = generateQuestion();
    const wrapper = shallowMount(Question, {
      propsData: { question }
    });
    expect(wrapper.text().replace(/\s/g, '')).toContain(
      `${question.firstOperand} ${question.operator} ${question.firstOperand} = ?`.replace(/\s/g, '')
    );
  });
});
