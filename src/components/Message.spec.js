import { shallowMount } from "@vue/test-utils";
import Message from "./Message.vue";

describe("Message.vue", () => {
  test("renders question", () => {
    const message = "Test message";
    const wrapper = shallowMount(Message, {
      propsData: { message }
    });
    expect(wrapper.text()).toContain(message);
  });
});
