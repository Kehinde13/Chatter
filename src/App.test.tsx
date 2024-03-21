import {render, screen} from '@testing-library/react'
import LoginPage from './Auth/LoginPage'
import { BrowserRouter as Router } from 'react-router-dom';

describe('unit testing fro chatter component', () => {
    test.skip("should have welcome", () => {
        render(<Router>
         <LoginPage />    
         </Router>);
        const message = screen.queryByText(/welcome/i)
        expect(message).toBeInTheDocument()
    })
    test("should have welcome", () => {
        render(<Router>
         <LoginPage />    
         </Router>);
        const message = screen.queryByText(/welcome/i)
        expect(message).toBeInTheDocument()
     })
})


