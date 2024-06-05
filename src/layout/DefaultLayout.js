import React from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';

const DefaultLayout = ({color}) => {
  return (
    <div className="d-flex min-vh-100">
      <AppSidebar />
      <div className="wrapper d-flex flex-column flex-grow-1 bg-light">
        <AppHeader />
       
        <div className="body flex-grow-1 px-3 " style={{ overflowX: 'hidden' }}>
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
