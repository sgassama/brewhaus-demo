import BreweryTypeSelector from '@/components/BreweryTypeSelector.vue';
import { fireEvent, render, screen } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

describe('BreweryTypeSelector', () => {
  test('renders the BreweryTypeSelector correctly', () => {
    const rendered = mount(BreweryTypeSelector, {
      props: {
        modelValue: '',
      },
    });

    expect(rendered).toBeDefined();
  });

  test('emits update:modelValue event when select changes', async () => {
    const wrapper = render(BreweryTypeSelector, {
      props: {
        modelValue: '',
      },
    });

    const select = screen.getByRole('combobox') as HTMLSelectElement;

    await fireEvent.update(select, 'large');

    expect(select.value).toBe('large');
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['large']);
  });
});
