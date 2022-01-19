const Banner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="px-2 py-2 w-11/12 xl:w-10/12 lg-w/12 md:w-10/12 m-auto flex lg:justify-between justify-center lg:flex-row flex-col gap-3 items-center text-lg">
        <p>
          Hey there! I'm looking for my next adventure, if you have an open
          position please let me know, I may be able to help.
        </p>
        <a
          href="mailto:rojasleon.dev@gmail.com"
          target="_blank"
          className="text-white font-bold underline cursor-pointer">
          rojasleon.dev@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Banner;
