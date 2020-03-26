import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow sm:m-0 md:m-10 lg:m-20 xl:m-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
