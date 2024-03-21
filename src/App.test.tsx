import { render, screen } from '@testing-library/react';
import LoginPage from './Auth/LoginPage'; 
import { BrowserRouter as Router } from 'react-router-dom';
import ForYou from './Pages/HomePage/Feed/ForYou';


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
  test('feed', () => {

    const mockPosts = [
        {
          id: 1,
          title: 'Test Post 1',
          content: 'This is test post 1 content',
        },
        {
          id: 2,
          title: 'Test Post 2',
          content: 'This is test post 2 content',
        },
      ];
      
    render(<Router>
        <ForYou />
    </Router>);
     const postCards = screen.getByTestId("feeds")
    
     expect(postCards).toHaveLength(mockPosts.length);

    mockPosts.forEach((post: object, index) => {
      expect(postCards[index]).toHaveTextContent(post.title);
      expect(postCards[index]).toHaveTextContent(post.content);
    });
  })
})

