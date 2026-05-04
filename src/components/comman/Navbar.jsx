import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/images__1___1_-removebg-preview.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import {ACCOUNT_TYPE} from "../../utils/constants"

// const subLinks = [
//     {
//         title: "python",
//         link: "catalog/python"
//     },
//     {
//         title: "Web Development",
//         link: "catalog/web-development"
//     },
// ]

const Navbar = () => {

    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=> state.profile)
    const {totalItems} = useSelector((state)=>state.cart)
    const location = useLocation()

    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("total items", totalItems);
    

    const fetchSublinks = async () => {
      setLoading(true)
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("printing sublinks results");
            console.log(result.data);
            

            setSubLinks(result.data.data);
        } catch (error) {
            console.log("could not fetch the category list", error);
        }
        setLoading(false)
    };

    useEffect(()=>{
        fetchSublinks();
    },[])

    const matchRoute = (route) =>{
        return matchPath({path:route}, location.pathname)
    }

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-richblack-700 ">
      <div className="w-11/12 flex max-w-maxContent items-center justify-between">
        {/*image links */}
        <Link to="/">
          <img src={logo} width={160} height={42} loading="lazy" alt=''/>
        </Link>

        {/*Nav links */}
        <nav className='hidden md:block'>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />

                      <div
                        className="invisible absolute left-[50%] top-[50%] translate-x-[-51%] translate-y-[20%] flex flex-col rounded-md bg-richblack-5 p-4
                         text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible 
                         group-hover:opacity-100 lg:w-[300px] z-10"
                      >
                        <div className="absolute left-[50%] top-0 translate-y-[-20%] translate-x-[80%] h-6 w-6 rotate-45 rounded bg-richblack-5 -z-10"></div>
                        {subLinks.length ? (
                          subLinks.map((sublink, index) => (
                            <Link
                              to={`/catalog/${sublink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              key={index}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            >
                              <p>{sublink.name}</p>
                            </Link>
                          )) 
                        ) : (
                          <div className="text-center">No Courses Found</div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login/signup/dashboard */}
        <div className="md:flex gap-x-4 items-center hidden">
          {user && user?.accountType != ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute bottom-3 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[4px] text-richblack-100 rounded-[8px]">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[4px] text-richblack-100 rounded-[8px]">
                Sign up
              </button>
            </Link>
          )}
          {token != null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar
