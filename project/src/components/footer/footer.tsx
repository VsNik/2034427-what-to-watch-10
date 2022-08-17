import {Logo} from '../';

function Footer(): JSX.Element {
  return (
    <footer className="page-footer">
      <Logo className="logo__link--light"/>

      <div className="copyright">
        <p>© {new Date().getFullYear()} What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
