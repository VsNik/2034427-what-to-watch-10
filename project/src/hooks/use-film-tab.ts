import {useSearchParams} from 'react-router-dom';
import {TabName} from '../constants/common';

const QUERY_PARAM_NAME = 'tab';

export const useFilmTab = () => {
  const [searchParams] = useSearchParams();

  return searchParams.get(QUERY_PARAM_NAME) ?? TabName.Overview;
};
