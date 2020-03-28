import React from 'react';

const Footer = () => {
  return (
    <footer className="relative border-t border-gray-200 flex flex-wrap items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-gray-500">
        <span>Juan Luis Rojas León - 2020</span>
        <a
          className="hover:text-gray-700"
          href="mailto:rojasleon.dev@gmail.com"
          rel="nofollow">
          rojasleon.dev@gmail.com
        </a>
      </div>
      <div className="flex justify-center items-center text-gray-500">
        <a href="https://github.com/rojasleon" target="_blank">
          <i className="hover:text-gray-700 mr-5 text-xl fab fa-github cursor-pointer"></i>
        </a>
        <a href="https://twitter.com/rojas_leon_" target="_blank">
          <i className="hover:text-gray-700 mr-5 text-xl fab fa-twitter cursor-pointer"></i>
        </a>
        <a href="https://www.linkedin.com/in/rojasleon/" target="_blank">
          <i className="hover:text-gray-700 mr-5 text-xl fab fa-linkedin-in cursor-pointer"></i>
        </a>
      </div>
    </footer>
  );
};
export default Footer;
