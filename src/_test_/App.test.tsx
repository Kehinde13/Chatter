import { render, screen } from '@testing-library/react' 
import { BrowserRouter } from 'react-router-dom'
import LoginPage from '../Auth/LoginPage'


test("login", () => {
  render (<BrowserRouter>
           <LoginPage />
        </BrowserRouter>) 
        const linkElement = screen.getByText(/login test/i)
        expect(linkElement).toBeInTheDocument()
})