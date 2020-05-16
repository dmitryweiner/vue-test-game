import { shallowMount } from "@vue/test-utils";
import Counter from "./Counter";

describe("Counter.vue", () => {
  test("renders question", async () => {
    const initialAmount = 2;
    const callback = jest.fn();
    const wrapper = shallowMount(Counter, {
      propsData: {
        amount: initialAmount,
        isRunning: false,
        timeoutHandler: callback,
      },
    });
    expect(wrapper.text()).toMatch(`Timer: ${initialAmount}`);
    expect(callback).not.toBeCalled();
    wrapper.setProps({ isRunning: true });
    // TODO?
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(wrapper.text()).toMatch(`Timer: ${initialAmount - 1}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
