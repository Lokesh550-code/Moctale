import { FaFolder, FaLinkedin, FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="w-full h-34 px-10 flex flex-col items-center justify-center bg-stone-900 border border-t-stone-700">
        <div className="h-[50%] w-full m-0 border-b border-b-stone-700 flex items-center justify-between">
          <h1 className="text-white text-2xl">Made with Love ❤️</h1>
          <div className="flex gap-3">
            <a
              className="text-white hover:text-gray-400 transition-all text-3xl"
              href="https://github.com/Lokesh550-code"
              target="_blank"
            >
              <FaGithub />
            </a>
            <a
              className="text-white hover:text-gray-400 transition-all text-3xl"
              href="https://portfolio-lfhc.vercel.app/"
              target="_blank"
            >
              <FaFolder />
            </a>
            <a
              className="text-white hover:text-gray-400 transition-all text-3xl"
              href="https://www.linkedin.com/in/lokesh-kumar-071351366/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="h-1/2 w-full m-0 flex items-center justify-between">
          <div>
            <h6 className="text-md text-stone-400 transition-all">Kshan</h6>
            <p className="text-md text-stone-400">
              Discover movies, TV shows and people powered by TMDB.
            </p>
          </div>
          <div className="flex flex-col text-sm text-end text-stone-400">
            <p>Built with React • Tailwind • TMDB API</p>
            <p>© 2026 Kshan</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
