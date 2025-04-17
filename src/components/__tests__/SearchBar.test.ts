import { render, fireEvent, screen } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchBar from '@/components/SearchBar.vue'
import { useRoute } from 'vue-router'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}))

const mockUseRoute = (query: Record<string, any> = {}) => {
  (useRoute as ReturnType<typeof vi.fn>).mockReturnValue({ query })
}

describe('SearchBar.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the search input', () => {
    mockUseRoute({ search: '' })

    render(SearchBar)
    const input = screen.getByPlaceholderText('Search breweries...')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('emits "search" event with the correct query value when Enter is pressed', async () => {
    mockUseRoute({ search: '' })

    const { emitted } = render(SearchBar)
    const input = screen.getByPlaceholderText('Search breweries...')

    await fireEvent.update(input, 'beer')
    await fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' })

    expect(emitted().search).toHaveLength(1)
    expect(emitted().search[0]).toEqual(['beer']) // The emitted search query
  })

  it('emits empty "search" event when Enter is pressed with an empty search query', async () => {
    mockUseRoute({ search: '' })

    const { emitted } = render(SearchBar)
    const input = screen.getByPlaceholderText('Search breweries...')

    await fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' })

    expect(emitted().search).toEqual([ [ '' ] ])
  })

  it('updates the searchQuery when typing into the input', async () => {
    mockUseRoute({ search: '' })

    render(SearchBar)
    const input = screen.getByPlaceholderText('Search breweries...')

    await fireEvent.update(input, 'breweries')

    expect(input).toHaveValue('breweries')
  })
})
