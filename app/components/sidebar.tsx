// components/Sidebar.js
'use client'
import { FontAwesomeIcon } from '../../lib/fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useAnimate, stagger, motion } from "framer-motion";
import { getTokenFromLocalStorage, storeTokenInLocalStorage } from "../middleware/apis"

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean, from: string) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            "ul"+from,
            {
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)"
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5
            }
        );

        animate(
            "li"+from,
            isOpen
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0
            }
        );
    }, [isOpen]);

    return scope;
}

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [from, setFrom] = useState('');
    const scope = useMenuAnimation(isOpen, from);

    const { push } = useRouter();

    const redirectIfAuthenticated = async () => {
        const isUserAuthenticated = await getTokenFromLocalStorage();
        if (isUserAuthenticated == null || isUserAuthenticated == 'null' || isUserAuthenticated == undefined) {
            push('/');
        }
    };

    useEffect(() => {
        redirectIfAuthenticated();
    }, []);

    const logout = async () => {
        storeTokenInLocalStorage('null')
    }

    const path = usePathname();
    return (
        <div className="bg-gray-700 w-[17rem] py-4 px-6 text-white min-h-full min-h-screen">
            <h2 className="text-2xl font-bold mb-4"><img className="px-6 pt-6" src="https://shekinahland.com/wp-content/uploads/2022/01/logoipsum-logo-17-01.png" alt="ChitChat Logo" /></h2>
            <nav className="menu pt-8" ref={scope}>
                <motion.button
                    className='flex nav-item rounded text-slate-400'
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setIsOpen(!isOpen), setFrom('.chart-menu') }}
                >
                    <div className=" float-left">
                        <FontAwesomeIcon className='w-4 h-3' icon='chart-line' />
                    </div>
                    <p className="text-sm font-bold float-left px-1 py-1">{isOpen ? 'Chart Menu' : 'Chart Menu'}</p>
                </motion.button>
                <ul className='chart-menu'>
                    <li className={`flex chart-menu nav-item rounded hover:bg-gray-500 focus:ring-gray-300 ${path === '/dashboard/view' ? 'text-blue-300' : ''}`}>
                        <Link href={'/dashboard/view'}>
                            <div className="px-3 py-3 float-left">
                                <FontAwesomeIcon className='w-6 h-6' icon='chart-line' />
                            </div>
                            <p className="text-l font-bold float-left px-3 py-3">Dashboard</p>
                        </Link>
                    </li>
                </ul>
                <motion.button
                    className='flex nav-item rounded text-slate-400'
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setIsOpen(!isOpen), setFrom('.company-menu') }}
                >
                    <div className=" float-left">
                        <FontAwesomeIcon className='w-4 h-3' icon='gear' />
                    </div>
                    <p className="text-sm font-bold float-left px-1 py-1">{isOpen ? 'Company Menu' : 'Company Menu'}</p>
                </motion.button>
                <ul className='company-menu'
                    style={{
                        pointerEvents: isOpen ? "auto" : "none",
                        clipPath: "inset(10% 50% 90% 50% round 10px)"
                    }}
                >
                    <li className={`flex company-menu nav-item rounded hover:bg-gray-600 focus:ring-gray-300 ${path == '/jenis_perusahaan/view' ? 'text-blue-300' : ''}`}>
                        <Link href={'/jenis_perusahaan/view'}>
                            <div className="px-3 py-3 float-left">
                                <FontAwesomeIcon className='w-6 h-6' icon='building' />
                            </div>
                            <p className="text-l font-bold float-left px-3 py-3">Jenis Perusahaan</p>
                        </Link>
                    </li>
                </ul>
                <motion.button
                    className='flex nav-item rounded text-slate-400'
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setIsOpen(!isOpen), setFrom('.user-menu') }}
                >
                    <div className=" float-left">
                        <FontAwesomeIcon className='w-4 h-3' icon='users' />
                    </div>
                    <p className="text-sm font-bold float-left px-1 py-1">{isOpen ? 'Users Menu' : 'Users Menu'}</p>
                </motion.button>
                <ul className='user-menu'>
                    <li className={`flex user-menu nav-item rounded hover:bg-gray-600 focus:ring-gray-300 ${path == '/users/view' ? 'text-blue-300' : ''}`}>
                        <Link href={'/users/view'}>
                            <div className="px-3 py-3 float-left">
                                <FontAwesomeIcon className='w-6 h-6' icon='users' />
                            </div>
                            <p className="text-l font-bold float-left px-3 py-3">Manage Users</p>
                        </Link>
                    </li>
                </ul>
                <motion.button
                    className='flex nav-item rounded text-slate-400'
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setIsOpen(!isOpen), setFrom('.setting-menu') }}
                >
                    <div className=" float-left">
                        <FontAwesomeIcon className='w-4 h-3' icon='right-from-bracket' />
                    </div>
                    <p className="text-sm font-bold float-left px-1 py-1">{isOpen ? 'Setting Menu' : 'Setting Menu'}</p>
                </motion.button>
                <ul className='setting-menu'>
                    <li className={`flex setting-menu nav-item rounded hover:bg-gray-600 focus:ring-gray-300 ${path == '/setting' ? 'text-blue-300' : ''}`}>
                        <Link href={'/setting'}>
                            <div className="px-3 py-3 float-left">
                                <FontAwesomeIcon className='w-6 h-6' icon='gear' />
                            </div>
                            <p className="text-l font-bold float-left px-3 py-3">Setting</p>
                        </Link>
                    </li>
                </ul>
                <li className={`flex setting-menu nav-item rounded hover:bg-gray-500 focus:ring-gray-300`}>
                    <Link href={'#'} onClick={logout}>
                        <div className="px-3 py-3 float-left">
                            <FontAwesomeIcon className='w-6 h-6' icon='right-from-bracket' />
                        </div>
                        <p className="text-l font-bold float-left px-3 py-3">Logout</p>
                    </Link>
                </li>
            </nav>
        </div>
    );
};

export default Sidebar;