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

  // TEST 3: Favourites sidebar exists
  it('TEST 3: Favourites sidebar exists', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    )
    const sidebar = screen.getByText('Drag properties here or click the ★ icon')
    expect(sidebar).toBeDefined()
  })

  // TEST 4: Search button exists
  it('TEST 4: Search button exists', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    )
    const searchBtn = screen.getByRole('button', { name: /Search Properties/i })
    expect(searchBtn).toBeDefined()
  })

})