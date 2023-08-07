// components/Sidebar.js
'use client'
import { FontAwesomeIcon } from '../../lib/fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const path = usePathname();
    return (
        <div className="bg-gray-700 w-[17rem] py-4 px-6 text-white min-h-full min-h-screen">
            <h2 className="text-2xl font-bold mb-4"><img className="px-6 pt-6" src="https://shekinahland.com/wp-content/uploads/2022/01/logoipsum-logo-17-01.png" alt="ChitChat Logo" /></h2>
            <ul className="pt-8">
                <li className={`flex nav-item rounded hover:bg-gray-500 focus:ring-gray-300 ${path === '/dashboard/view' ? 'text-blue-300' : ''}`}>
                    <Link href={'/dashboard/view'}>
                        <div className="px-3 py-3 float-left">
                            <FontAwesomeIcon className='w-6 h-6' icon='chart-line' />
                        </div>
                        <p className="text-l font-bold float-left px-3 py-3">Dashboard</p>
                    </Link>
                </li>
                <li className={`flex nav-item rounded hover:bg-gray-600 focus:ring-gray-300 ${path == '/users/view' ? 'text-blue-300' : ''}`}>
                    <Link href={'/users/view'}>
                        <div className="px-3 py-3 float-left">
                            <FontAwesomeIcon className='w-6 h-6' icon='users' />
                        </div>
                        <p className="text-l font-bold float-left px-3 py-3">Manage Users</p>
                    </Link>
                </li>
                <li className={`flex nav-item rounded hover:bg-gray-600 focus:ring-gray-300 ${path == '/jenis_perusahaan/view' ? 'text-blue-300' : ''}`}>
                    <Link href={'/jenis_perusahaan/view'}>
                        <div className="px-3 py-3 float-left">
                            <FontAwesomeIcon className='w-6 h-6' icon='building' />
                        </div>
                        <p className="text-l font-bold float-left px-3 py-3">Jenis Perusahaan</p>
                    </Link>
                </li>
                <li className={`flex nav-item rounded hover:bg-gray-600 focus:ring-gray-300 ${path == '/setting' ? 'text-blue-300' : ''}`}>
                    <Link href={'/setting'}>
                        <div className="px-3 py-3 float-left">
                            <FontAwesomeIcon className='w-6 h-6' icon='gear' />
                        </div>
                        <p className="text-l font-bold float-left px-3 py-3">Setting</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;