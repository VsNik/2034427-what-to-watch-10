import {createMemoryHistory} from 'history';
import {Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import Logo from './logo';
import {RouteName} from '../../constants/route-name';

const FAKE_ROUTE = '/fake-route';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should redirect to main, if user clicked to link', async () => {
    history.push(FAKE_ROUTE);

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={RouteName.Main}
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<Logo />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('logo'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
