import React, { useState } from 'react'
import { VscSignOut } from "react-icons/vsc";
import SidebarLink from './SidebarLink';
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from '../../comman/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const {user, loading:profileLoading} = useSelector((state)=>state.profile)
    const {loading:authLoading} = useSelector((state)=>state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmation, setConfirmation] = useState(null)

    if(profileLoading || authLoading){
        return (
          <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
            <div className="spinner"></div>
          </div>
        );
    }
  return (
    <div>
      <div className="flex flex-col h-[calc(100vh-3.5rem)] min-w-[220px] border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link, index) => {
            if (link.type && link.type !== user?.accountType) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        <div className="w-10/12 h-[2px] bg-richblack-700 mx-auto mt-6 mb-6" />

        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmation({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmation(null),
              })
            }
            className="text-richblack-300 text-sm font-medium px-8 py-2"
          >
            <div className="flex flex-row items-center gap-x-2">
              <VscSignOut className="text-xl" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmation && <ConfirmationModal modalData={confirmation}/>}
    </div>
  );
}

export default Sidebar
