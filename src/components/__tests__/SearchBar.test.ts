import { render, fireEvent, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import SearchBar from '@/components/SearchBar.vue'

describe('SearchBar.vue', () => {
  it('renders the search input', () => {
    render(SearchBar)
    const input = screen.getByPlaceholderText('Search breweries...')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('emits "search" event with the correct query value when Enter is pressed', async () => {
    const { emitted } = render(SearchBar)
    const input = screen.getByPlaceholderText('Search breweries...')

    await fireEvent.update(input, 'beer')
    await fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' })

    expect(emitted().search).toHaveLength(1)
    expect(emitted().search[0]).toEqual(['beer']) // The emitted search query
  })

  it('emits empty "search" event when Enter is pressed with an empty search query', async () => {
    const { emitted } = render(SearchBar)
    const input = screen.getByPlaceholderText('Search breweries...')

    await fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' })

    expect(emitted().search).toEqual([ [ '' ] ])
  })

  it('updates the searchQuery when typing into the input', async () => {
    render(SearchBar)
    const input = screen.getByPlaceholderText('Search breweries...')

    await fireEvent.update(input, 'breweries')

    expect(input).toHaveValue('breweries')
  })
})
