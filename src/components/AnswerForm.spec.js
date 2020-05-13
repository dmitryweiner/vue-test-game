import { shallowMount } from "@vue/test-utils";
import AnswerForm from "./AnswerForm.vue";

describe("AnswerForm.vue", () => {
  test("renders question", () => {
    const answer = "Test answer";
    const wrapper = shallowMount(AnswerForm);

    wrapper.find('input[type="text"]').setValue(answer);
    wrapper.find('button').trigger('click');
    
    expect(wrapper.emitted('checked')).toBeTruthy()
    expect(wrapper.emitted('checked').length).toBe(1)
  });
});
