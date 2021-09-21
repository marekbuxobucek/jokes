import { shallowMount, createLocalVue } from '@vue/test-utils';
import Form from '@/components/joke/form.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Joke form component unit', () => {
  let store;
  beforeEach(() => {
    const getters = {
      getOptions: jest.fn().mockReturnValue({
        idRange: {
          cs: { from: 0, to: 1 },
          en: { from: 0, to: 1 },
        },
        categories: ['my', 'yours'],
      }),
    };
    const mutations = {
      showAlert: jest.fn(),
      addMyJoke: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      mutations,
    });
  });

  test('is mounted Joke form', () => {
    const wrapper = shallowMount(Form, {
      propsData: {
        visible: true,
      },
      store,
      localVue,
    });
    expect(wrapper.vm).toBeTruthy();
  });

  test('is joke form reset after submit', async () => {
    const wrapper = shallowMount(Form, {
      propsData: {
        visible: true,
      },
      store,
      localVue,
    });
    const spyReset = jest.spyOn(wrapper.vm, 'reset');
    const submitButton = wrapper.find('form');
    submitButton.trigger('submit');
    await wrapper.vm.$nextTick();

    expect(submitButton.exists()).toBeTruthy();
    expect(spyReset).toHaveBeenCalled();
  });
});
