import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Notes', href: '/notes' }
  ].map(({ label, href }) => (
    <li
      key={label}
      className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-800 pt-2 pb-2 border-t border-gray-200 dark:bg-black cursor-pointer lg:border-none lg:hover:bg-transparent">
      <Link href={href}>
        <span className="ml-8 text-black dark:text-white hover:text-green-400 focus:outline-none transition duration-150">
          {label}
        </span>
      </Link>
    </li>
  ));

  return (
    <nav className="relative bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link href="/">
            <Image
              alt="Logo"
              className="rounded"
              src="/rojasleon.png"
              width="55"
              height="55"
            />
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setIsOpen(!isOpen)}>
            <i
              className={`text-gray-800 dark:text-white ${
                isOpen ? 'fas fa-times' : 'fas fa-bars'
              }`}></i>
          </button>
        </div>
        <div
          className={
            'lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none' +
            (isOpen ? ' block rounded' : ' hidden')
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
