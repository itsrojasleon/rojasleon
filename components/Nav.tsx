import React from 'react';
import Link from 'next/link';

interface Props {
  transparent?: boolean;
}

const Nav = (props: Props) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <nav className="relative shadow-lg bg-white shadow-lg flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
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
            (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
          }
          id="example-navbar-warning">
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">
              <Link href="/about">
                <a className="ml-8 text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
                  <span className="inline-block">About</span>
                </a>
              </Link>
            </li>

            <li className="flex items-center">
              <Link href="/portfolio">
                <a className="ml-8 text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
                  <span className="inline-block">Portfolio</span>
                </a>
              </Link>
            </li>

            <li className="flex items-center">
              <Link href="/blog">
                <a className="ml-8 text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
                  <span className="inline-block">Blog</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
