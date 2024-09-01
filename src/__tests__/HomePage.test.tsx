import { render } from '@testing-library/react';
import HomePage from '../Pages/HomePage/HomePage'; 
import { MemoryRouter } from 'react-router-dom';

jest.mock('../Pages/HomePage/Navbar', () => () => <div>Mocked Header</div>);
jest.mock('../Pages/HomePage/SideBar', () => () => <div>Mocked SideBar</div>);
/* jest.mock('react-router-dom', () => ({
  Outlet: () => <div>Mocked Outlet</div>,
})); */

test('HomePage matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  
  expect(asFragment()).toMatchSnapshot();
});
