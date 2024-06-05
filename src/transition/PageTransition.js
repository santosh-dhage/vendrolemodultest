// PageTransition.js
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './PageTransition.css';

const PageTransition = ({ children, location }) => {
  return (
    <CSSTransition
      key={location}
      classNames="page"
      timeout={300}
      unmountOnExit
      in
    >
      <div className="page">{children}</div>
    </CSSTransition>
  );
};

export default PageTransition;
