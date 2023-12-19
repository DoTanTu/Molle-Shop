import React, { useState } from "react";
import {Link, NavLink} from "react-router-dom"

function Navbar() {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuVisible(!isSubMenuVisible);
  };

  return (
    <>
      <div className="left__nav bg-slate-700 col-span-1">
        <div className="logo">
          <div className="title py-10">
            <a href="fsdfsff" className="account_navbar flex flex-col items-center text-gray-400">
              <div className="image_top">
                <img
                  className="w-24 h-24 rounded-lg object-cover"
                  src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                  alt=""
                />
              </div>
              <span className="name font-bold mt-2">Nguyen Van A</span>
              <span className="Role text-sm">Admintrator</span>
            </a>
          </div>
          <div className="option_navbar">
            <ul className="text-white">
              <li className={`relative after:content-[''] after:float-right after:top-6 after:font-normal after:absolute after:right-4 after:w-2 after:h-2 after:border-r-2 after:border-b-2 after:rotate-45 ${
                  isSubMenuVisible ? "open" : ""
                }`}
              >
                <a
                  href="products"
                  onClick={toggleSubMenu}
                  className="px-3 py-4 flex items-center hover:bg-black transform transition-all ease-in-out duration-75"
                >
                  <svg className="w-6 mr-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                  <span>Sản phẩm</span>
                </a>
                <ul
                  className={`submenu font-semibold ${
                    isSubMenuVisible ? "open" : ""
                  }`}
                >
                  <li>
                    <Link to="/all-products">
                      <span className="pl-16 py-4 flex items-center text-gray-400 hover:text-gray-300">
                      Tất cả sản phẩm
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/new-product" >
                      <span className="pl-16 py-4 flex items-center text-gray-400 hover:text-gray-300"> Thêm sản phẩm</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="đfdfdsfsf"
                  className="px-3 py-4 flex items-center hover:bg-black transform transition-all ease-in-out duration-75"
                >
                  <svg
                    className="w-6 mr-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                    />
                  </svg>
                  <span>Thống kê</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
