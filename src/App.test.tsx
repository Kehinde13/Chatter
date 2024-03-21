import { render} from '@testing-library/react';
import LoginPage from './Auth/LoginPage'; 
import { BrowserRouter as Router } from 'react-router-dom';


describe('unit testing for chatter App', () => {
  test('renders login page correctly', () => {
    const { getByText, getByPlaceholderText } = render( <Router>
    <LoginPage />
    </Router>
    );
    expect(getByText('LOGIN')).toBeInTheDocument();
    expect(getByPlaceholderText('johndoe@gmail.com')).toBeInTheDocument();
    expect(getByPlaceholderText('**********')).toBeInTheDocument();
  });
  
})

