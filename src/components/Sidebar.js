import {React, useState} from 'react'
import { AiOutlineSetting } from 'react-icons/ai';
import { BsArrowLeftShort  } from "react-icons/bs";
import { GiJapaneseBridge,GiCardPick } from "react-icons/gi";
import { RiDashboardFill } from "react-icons/ri";
import { MdSlowMotionVideo } from "react-icons/md";
import { TbMessageChatbot } from "react-icons/tb";
import Styding from "../Assets/sidebar_decor.png"
import {Link} from 'react-router-dom'

const Sidebar = () => {
    const [open, setOpend] = useState(true);
    const Menus = [
        { title: "Dashboard", link: null },
        // { title: "Dictionary", link: "/",icon: <AiOutlineFileText /> },
        { title: "Flashcard", link: "/list/all", icon: <GiCardPick /> },
        { title: "Sub Video", link: null, icon: <MdSlowMotionVideo /> },
        { title: "Kaiwa", link: "/chatbot", icon: <TbMessageChatbot /> },
        { title: "Setting", link: null,spacing: true, icon: <AiOutlineSetting/>},
      ];

    return (
        <div className='flex border border-solid border-2 flex-col h-screen'>
            <div className={`p-5 pt-8 ${open ? "w-[17rem]" :"w-20"} duration-300 relative`}>
                <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl rounded-full 
                absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`} 
                onClick={() => setOpend(!open)} />
                <div className='inline-flex'>
                    <GiJapaneseBridge className={`text-red-600 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}/>
                    <h1 className={`text-red-500 origin-left font-medium text-xl duration-300 ${!open && "hidden"}`}>Learning_Japanese</h1>
                </div>
                <ul className='pt-2'>
                    {Menus.map((menu, index) => (
                        <div key={index}>
                            <Link to={menu.link || "/"}>
                                <li className={`text-blue-90 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-8" : "mt-2"}`}>
                                    <span className='text-2xl block float-left'>
                                        {menu.icon ? menu.icon : <RiDashboardFill/>}
                                    </span>
                                    <span className={`text-slate-500 text-base font-normal flex-1 duration-100 hover:font-semibold hover:uppercase ${!open && "hidden"}`}>{menu.title}</span>
                                </li>
                            </Link>
                        </div>  
                    ))}
                </ul>
                <div className={`flex justify-center mt-10 relative ${open ? "" :"hidden"}`}>
                    <img src={Styding} alt='' className='duration-500 w-10/12'/>
                    <span className='absolute top-[80%] bg-white text-black font-semibold border border-8 border-white rounded-md cursor-pointer'>
                        Get started
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Sidebar
