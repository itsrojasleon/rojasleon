import React from 'react';
import Link from 'next/link';

interface Props {
  transparent?: boolean;
}

const Header = (props: Props) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const links = [
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' }
  ].map(({ label, href }) => (
    <li
      key={label}
      className="flex items-center hover:bg-gray-200 pt-2 pb-2 border-t border-gray-200 cursor-pointer lg:border-none lg:hover:bg-transparent">
      <Link href={href}>
        <a className="ml-8 text-black hover:text-blue-600 focus:outline-none transition duration-150">
          <span className="inline-block">{label}</span>
        </a>
      </Link>
    </li>
  ));

  return (
    <nav className="relative bg-white border-b border-gray-200 flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link href="/">
            <a>
              <img
                width="54"
                height="54"
                src="https://i.imgur.com/FmUZg5p.png"
                alt="rojasleon"
                className="rounded"
              />
            </a>
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}>
            <i className="text-gray-800 fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            'lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none' +
            (navbarOpen ? ' block rounded' : ' hidden')
          }>
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {links}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
