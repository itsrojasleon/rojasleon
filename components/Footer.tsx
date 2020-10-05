import React from 'react';

const Footer = () => {
  const links = [
    { iconName: 'fab fa-github', href: 'https://github.com/rojasleon' },
    { iconName: 'fab fa-twitter', href: 'https://twitter.com/rojas_leon_' },
    {
      iconName: 'fab fa-linkedin-in',
      href: 'https://www.linkedin.com/in/rojasleon'
    },
    { iconName: 'fab fa-youtube', href: 'https://www.youtube.com/channel/UCMmSIbY7b5S1ayAiqD8jt_g/' },
    
  ].map(({ href, iconName }) => (
    <a key={iconName} href={href} target="_blank" className="text-xl">
      <i
        className={`text-black hover:text-gray-700 mr-5 cursor-pointer ${iconName}`}></i>
    </a>
  ));

  return (
    <footer className="relative border-t border-gray-200 flex flex-wrap items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-black">
        <span>Juan Luis Rojas León - 2020</span>
        <a
          className="hover:text-blue-600"
          href="mailto:rojasleon.dev@gmail.com"
          rel="nofollow">
          rojasleon.dev@gmail.com
        </a>
      </div>
      <div className="flex justify-center items-center">{links}</div>
    </footer>
  );
};

export default Footer;
