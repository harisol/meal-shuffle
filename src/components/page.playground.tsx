import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import inlineCSS from '../css/playground.css?inline';
import btnStyle from '../css/button.module.css';
import viteLogo from '../assets/logo-with-shadow.png';

const cssId = 'css-page-playground';

export default function Playground() {
  // how to load css when this page is loaded
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = inlineCSS;
    style.id = cssId;
    document.head.appendChild(style);

    // to remove the inlineCSS when this component is unloaded
    return () => {
      document.getElementById(cssId)?.remove();
    };
  }, []);

  return (
    <>
      <div className="playground-header">
        <img src={viteLogo} alt="vite-logo" style={{ height: '100px' }} />
        <FadingButton />
      </div>
      <div className="playground-body">
        <Navigation />
        <div className="main-content">
          {/* this is children for nesting routes */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

const Navigation = () => {
  return (
    <ul className="navigation">
      <li>
        <Link to="/playground">Page 1</Link>
      </li>
      <li>
        <Link to="/playground/2">Page 2</Link>
      </li>
      <li>
        <Link to="/">Meal Shuffle</Link>
      </li>
    </ul>
  );
};

const FadingButton = () => {
  return (
    <button
      type="button"
      className={`${btnStyle.fade} ${btnStyle.red}`}
      style={{ marginLeft: 'auto' }}
      onClick={(e) => {
        e.currentTarget.innerHTML = 'Noooooooo..!!';
        e.currentTarget.style.opacity = '0';
      }}
      onTransitionEnd={(e) => {
        // must be combined with css 'transition'
        e.currentTarget.style.display = 'none';
      }}>
      Don't click me!
    </button>
  );
};
