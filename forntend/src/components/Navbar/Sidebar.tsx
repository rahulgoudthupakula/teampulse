import React, { useRef, useEffect, useState } from "react";
import { authService } from '../../services/authService'
import { Link, useNavigate } from 'react-router-dom'


import { useGlobalState } from '../../context/GlobalState'
import {
  X,
  ChevronRight,
  Settings,
  Award,
  PartyPopper,
  BookOpen,
  Gift,
  LogOut,
} from "lucide-react";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = {
  forOrganizers: [
    {
      icon: "fa-solid fa-bars",
      label: "Manage Listings",
      href: "/manage/user/competition-listings/all/approved",
    },
    {
      icon: "fa-solid fa-republican",
      label: "My Festivals",
      href: "/manage/festival/list",
    },
    {
      icon: "fa-solid fa-money-check-dollar",
      label: "Plans & Billing",
      href: "/user/my-account",
    },
  ],
  forUsers: [
    {
      icon: "fas fa-file-alt",
      label: "Registrations/Applications",
      href: "/user/registrations/all/all?search=&page=1&sort=",
    },
    { icon: "fa-solid fa-people-group", label: "Referrals", href: "/user/my-referrals" },
    {
      icon: "fa-solid fa-user-plus",
      label: "My Rounds",
      href: "/user/rounds/all/live?search=&page=1",
    },
    {
      icon: "fas fa-award",
      label: "Unstop Awards Nominations",
      href: "/user/nominations",
    },
    {
      icon: "fa-regular fa-heart",
      label: "Watchlist",
      href: "/user/watchlist/all/live?search=&page=1",
    },
    {
      icon: "fas fa-clock",
      label: "Recently Viewed",
      href: "/user/recently-viewed",
    },
    {
      icon: "fas fa-users",
      label: "Mentor Sessions",
      href: "/user/mentor-sessions/upcoming/all?search=&page=1",
    },
    {
      icon: "fas fa-graduation-cap",
      label: "Courses",
      href: "/user/myCourses/all/all?search=&page=1",
    },
    {
      icon: "fas fa-certificate",
      label: "Certificates",
      href: "/user/certificates",
    },
    { icon: "fas-solid fa-ticket-alt", label: "Coupons and Rewards", href: "/coupons" },
    { icon: "fas fa-cog", label: "Settings", href: "/user/notifications" },
  ],
  ourProperties: [
    { icon: "icon-uta", label: "obbyssy Talent Awards", href: "/awards/2024" },
    {
      icon: "icon-oqf",
      label: "Online Quizzing festival",
      href: "/online-quizzing-festival",
    },
    {
      icon: "fa-solid fa-laptop",
      label: "Online Hackathon Festivals",
      href: "/online-hackathon-festival",
    },
    
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()
  const { state, dispatch } = useGlobalState()
  const handleLogout = () => {
    authService.logout()
    dispatch({ type: 'CLEAR_USER' })
    dispatch({ type: 'ADD_NOTIFICATION', payload: 'Logged out successfully' })
    navigate('/login')
  }
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isOpen, onClose]);

  const [percentage, setPercentage] = useState(78);

  const incrementProgress = () => {
    setPercentage((prev) => Math.min(prev + 5, 100));
  };

  const decrementProgress = () => {
    setPercentage((prev) => Math.max(prev - 5, 0));
  };

  // Calculate the stroke-dashoffset based on percentage
  const circumference = 2 * Math.PI * 30; // r=30
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      ></div>
      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="w-[375px] max-h-[90vh] overflow-y-auto  bg-white rounded-lg shadow-lg ">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Profile</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-4 pb-10">
              <div className="relative w-20 h-20">
                {/* Progress ring ff */}
                <svg className="absolute w-full h-full -rotate-90 transition-all duration-500">
                  {/* Background circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="6"
                    className="w-full h-full"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="6"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset: offset,
                      transition: "stroke-dashoffset 0.5s ease",
                    }}
                  />
                </svg>

                {/* Avatar */}
                <div className="absolute inset-2 rounded-full overflow-hidden bg-pink-500">
                  <img
                    src={ state.user?.profile_url || "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/user-avatar/png/15.png"}
                    alt="Profile avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Percentage indicator */}
                <span className="absolute -bottom-1 right-0 bg-white text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-gray-100">
                  {percentage}%
                </span>
              </div>

              <div className="flex flex-col">
                <h2 className="text-gray-900 font-medium text-2xl">sairam padala</h2>
                <span className="text-gray-600 text-base">
                  padalasairam18@gmail.com
                </span>
                <Link onClick={onClose} to="/profile" >View Profile
                
                </Link>
                
              </div>
            </div>

            

            <div className="bg-orange-100 p-4 rounded-lg mb-6">
              <h4 className="font-bold">You're missing out</h4>
              <p className="text-sm mb-2">
                on opportunities to create an impact!
              </p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                onClick={() => alert("Complete profile clicked")}
              >
                Complete my profile <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="space-y-6">
              <MenuSection
                title="For Organizers"
                items={menuItems.forOrganizers}
              />
              <MenuSection title="For Users" items={menuItems.forUsers} />
              <MenuSection
                title="Our Properties"
                items={menuItems.ourProperties}
              />
            </div>

            <button
              className=" logout-btn w-full mt-6 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-red transition-colors flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

function MenuSection({
  title,
  items,
}: {
  title: string;
  items: { icon: string; label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className="flex items-center text-sm hover:text-blue-600 transition-colors"
            >
              <span
                className={`w-6 h-6 mr-2  flex items-center justify-center ${item.icon}`}
              >
                {item.icon === "icon-settings" && (
                  <Settings className="h-4 w-4" />
                )}
                {item.icon === "icon-uta" && <Award className="h-4 w-4" />}
                {item.icon === "icon-oqf" && <BookOpen className="h-4 w-4" />}
                {item.icon === "icon-coupons" && <Gift className="h-4 w-4" />}
              </span>
              {item.label}
              {item.icon === "icon-coupons" && (
                <span className="ml-auto flex items-center">
                  <img
                    src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/unstop-coin.svg"
                    alt="Balance"
                    className="w-4 h-4 mr-1"
                  />
                  222
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
