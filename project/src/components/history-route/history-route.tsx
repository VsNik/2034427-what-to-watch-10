import {ReactNode} from 'react';
import type {BrowserHistory} from 'history';
import {useState, useLayoutEffect} from 'react';
import {Router} from 'react-router-dom';

export type HistoryRouterProps = {
  history: BrowserHistory;
  basename?: string;
  children?: ReactNode;
}

function HistoryRouter(props: HistoryRouterProps) {
  const {basename, history, children} = props;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
