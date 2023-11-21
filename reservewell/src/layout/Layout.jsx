import React from 'react';

// import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />

      <main className="min-h-[calc(100vh-96px)] bg-rwKhaki">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
