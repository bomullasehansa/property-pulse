import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SearchPage from './SearchPage'

describe('SearchPage Tests', () => {
  
  // TEST 1: Page renders
  it('TEST 1: Page renders without crashing', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    )
    const heading = screen.getByRole('heading', { name: /Search Properties/i })
    expect(heading).toBeDefined()
  })

  // TEST 2: Property type dropdown exists
  it('TEST 2: Property type dropdown exists', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    )
    const dropdown = screen.getByRole('combobox')
    expect(dropdown).toBeDefined()
  })

})