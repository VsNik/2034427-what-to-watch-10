import {render, screen} from '@testing-library/react';
import ServerError from './server-error';

describe('Component: ServerError', () => {
  it('should render correctly', () => {
    render(
      <ServerError/>
    );

    expect(screen.getByText(/Sorry/i)).toBeInTheDocument();
    expect(screen.getByText(/server is not available/i)).toBeInTheDocument();
    expect(screen.getByText(/try to come back later/i)).toBeInTheDocument();
  });
});
