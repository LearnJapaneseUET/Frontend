import {React, useState} from 'react'
import { AiOutlineSetting, AiOutlineFileText, AiOutlineBarChart, AiOutlineMail, AiOutlineLogout } from 'react-icons/ai';
import { BsArrowLeftShort, BsChevronDown, BsPerson, BsFillImageFill, BsReverseLayoutTextSidebarReverse  } from "react-icons/bs";
import { GiJapaneseBridge } from "react-icons/gi";
import { RiDashboardFill } from "react-icons/ri";


const Sidebar = () => {
    const [open, setOpend] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState(false)
    const Menus = [
        { title: "Dashboard" },
        { title: "Pages", icon: <AiOutlineFileText /> },
        { title: "Media", spacing: true, icon: <BsFillImageFill /> },
        {
          title: "Projects",
          icon: <BsReverseLayoutTextSidebarReverse />,
          submenu: true,
          submenuItems: [{ title: "Submenu 1" }, { title: "Submenu 2" }, { title: "Submenu 3" }],
        },
        { title: "Analytics", icon: <AiOutlineBarChart /> },
        { title: "Inbox", icon: <AiOutlineMail /> },
        { title: "Profile", spacing: true, icon: <BsPerson />},
        { title: "Setting", icon: <AiOutlineSetting/>},
        { title: "Logout", icon: <AiOutlineLogout/> },
      ];

    return (
        <div className='flex'>
            <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" :"w-20"} duration-300 relative`}>
                <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl rounded-full 
                absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`} 
                onClick={() => setOpend(!open)} />
                <div className='inline-flex'>
                    <GiJapaneseBridge className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}/>
                    <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "hidden"}`}>Learning Japanese</h1>
                </div>
                <ul className='pt-2'>
                    {Menus.map((menu, index) => (
                        <>
                            <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}>
                                <span className='text-2xl block float-left'>
                                    {menu.icon ? menu.icon : <RiDashboardFill/>}
                                </span>
                                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>{menu.title}</span>
                                {menu.submenu && open && (
                                    <BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() => setSubmenuOpen(!submenuOpen)}/>
                                )}
                            </li>
                            
                            {menu.submenu && submenuOpen && open && (
                                <ul>
                                    {menu.submenuItems.map((submenuItem, index) => (
                                        <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md`}>
                                            {submenuItem.title}
                                        </li>
                                    ))} 
                                </ul>
                            )}
                        </>  
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar