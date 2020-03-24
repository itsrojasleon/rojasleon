import React from 'react';
import Link from 'next/link';

interface Props {
  transparent?: boolean;
}

const Nav = (props: Props) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <nav
      className={
        (props.transparent
          ? 'top-0 absolute z-50 w-full'
          : 'relative shadow-lg bg-white shadow-lg') +
        ' flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg'
      }>
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <img
            width="54"
            height="54"
            src="https://i.imgur.com/FmUZg5p.png"
            alt="rojasleon"
            className="rounded"
          />
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
              <a className="text-gray-800 hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                <i className="text-gray-500 fab fa-facebook text-lg leading-lg" />
                <span className="lg:hidden inline-block ml-2">Share</span>
              </a>
            </li>

            <li className="flex items-center">
              <a className="text-gray-800 hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                <i className="text-gray-500 fab fa-twitter text-lg leading-lg" />
                <span className="lg:hidden inline-block ml-2">Tweet</span>
              </a>
            </li>

            <li className="flex items-center">
              <Link href="/blog">
                <a className="text-gray-800 hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                  <i className="text-gray-500 fab fa-github text-lg leading-lg" />
                  <span className="lg:hidden inline-block ml-2">Star</span>
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
