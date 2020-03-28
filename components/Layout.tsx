import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow sm:m-0 md:m-10 lg:m-20 xl:m-20">
        <div className="xl:w-8/12 lg-w/12 md:w-10/12 sm:w-full sm:m-4 xl:m-auto flex justify-center flex-col">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
