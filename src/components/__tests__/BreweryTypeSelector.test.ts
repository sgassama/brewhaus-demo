import BreweryTypeSelector from '@/components/BreweryTypeSelector.vue'
import { fireEvent, render, screen } from '@testing-library/vue'

describe('BreweryTypeSelector', () => {

  test('renders the BreweryTypeSelector correctly', () => {
    const rendered = render(BreweryTypeSelector)

    expect(rendered).toBeDefined()
  })

  test('emits update:modelValue event when select changes', async () => {
    const { emitted } = render(BreweryTypeSelector, {
      props: {
        modelValue: '',
      },
    })

    const select = screen.getByRole('combobox') as HTMLSelectElement

    expect(select.value).toBe('')

    await fireEvent.update(select, 'large')

    expect(select.value).toBe('large')
    expect(emitted()['update:modelValue']).toBeTruthy()
    expect(emitted()['update:modelValue'][0]).toEqual(['large'])
  })
})
