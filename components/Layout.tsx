import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-8">
        <div className="w-11/12 xl:w-10/12 lg-w/12 md:w-10/12 m-auto flex justify-center flex-col">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
