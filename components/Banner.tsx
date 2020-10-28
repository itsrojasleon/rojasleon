const Banner: React.FC = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="px-2 py-3 w-11/12 xl:w-10/12 lg-w/12 md:w-10/12 m-auto">
        <a
          href="mailto:rojasleon.dev@gmail.com"
          target="_blank"
          className="text-white font-bold underline cursor-pointer">
          {children}
        </a>
      </div>
    </div>
  );
};

export default Banner;
