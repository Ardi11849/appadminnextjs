// components/Header.js
'use client'
import { FontAwesomeIcon } from '../../../utils/fontawesome';
interface HeaderProps {
    title: string; // Provide a type annotation here
    url: string;
}

const Header = ({ title, url }: HeaderProps) => {
    return (
        <header className="bg-gray-500 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-white font-semibold text-xl">Welcome To {title} Page</div>
            <nav className="space-x-4"><div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="py-2 pl-10 pr-4 text-black border rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300"
              />
              <FontAwesomeIcon
                icon="search"
                className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
            </nav>
          </div>
        </header>
    );
};

export default Header;