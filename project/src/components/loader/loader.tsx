import {Spinner} from '../';
import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className="loader">
      <Spinner/>
    </div>
  );
}

export default Loader;
