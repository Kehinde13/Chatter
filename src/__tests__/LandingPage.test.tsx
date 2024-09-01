// LandingPage.test.jsx
import { render } from '@testing-library/react';
import LandingPage from '../Pages/LandingPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../components/NavBar', () => () => <div>Mocked NavBar</div>);
jest.mock('../components/Footer', () => () => <div>Mocked Footer</div>);

test('LandingPage matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );
  
  expect(asFragment()).toMatchSnapshot();
});
