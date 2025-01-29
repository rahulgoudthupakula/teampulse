import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation  } from 'react-router-dom'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { authService } from '../../services/authService'
import Sidebar from './Sidebar';
import './Header.css';
import { useGlobalState } from '../../context/GlobalState'


const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    
    const checkLoginStatus = () => {
      
      const token = true;
      setIsLoggedIn(authService.isAuthenticated());
    };

    checkLoginStatus();
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      
      console.log('Searching for:', searchQuery);
      
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    
    setSuggestions(['Suggestion 1', 'Suggestion 2', 'Suggestion 3']);
  };

  const handleSearchBlur = () => {
    
    setTimeout(() => {
      setIsSearchFocused(false);
      setSuggestions([]);
    }, 200);
  };
  
  const toggleSidebar = () => {
    
    const path = window.location.pathname;
    if(path != "/profile"){
      setIsSidebarOpen(!isSidebarOpen);
    }
    
  };

  const [ProfileImg, setProfileImg] = useState("");

  const handleChildMessage = (data: string) => {
    setProfileImg(data); // Update parent state with data from the child
  };


  const navigate = useNavigate()
  const { state, dispatch } = useGlobalState()

  const handleLogout = () => {
    authService.logout()
    dispatch({ type: 'CLEAR_USER' })
    dispatch({ type: 'ADD_NOTIFICATION', payload: 'Logged out successfully' })
    navigate('/login')
  }

  const location = useLocation();
  
  return (
    <>
      <header className='header'>
        <div className={`header-container ${isSidebarOpen ? '' : ''}`}>
          <div className={`logo_search ${isSearchFocused ? 'search-focused' : ''}`}>
            <a href="/" className="logo">
              <img src="/oDDyssy.png?" alt="oDDyssy" height="40" width="40" />
            </a>

            <div className="search-container">
              <span className="search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                id="main_search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder="Search Here"
              />
              {isSearchFocused && (
                <div className="search-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="suggestion-item">
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <nav className={`headerNav ${isSearchFocused ? 'hidden' : ''}`}>
            <ul className="nav-links">
              <li id="homeLi" className={`nav-item ${location.pathname.toLowerCase().startsWith("/home") ? 'active' : ''}`}>
              <Link to="/Home" className="flex-shrink-0 flex items-center">
                Home
              </Link></li>
              <li id="internshipLi" className={`nav-item ${location.pathname.toLowerCase().startsWith("/internships") ? 'active' : ''}`}><Link to="/internships/home" className="flex-shrink-0 flex items-center">
              Internships
              </Link></li>
              
              <li id="jobLi" className={`nav-item ${location.pathname.toLowerCase().startsWith("/jobs") ? 'active' : ''}`}>
              <Link to="/jobs/home" className="flex-shrink-0 flex items-center">
              Jobs
              </Link></li>
              
              <li id="scholarshipLi" className={`nav-item ${location.pathname.toLowerCase().startsWith("/scholarship") ? 'active' : ''}`}>
              <Link to="/scholarship/home" className="flex-shrink-0 flex items-center">
              Scholarships
              </Link></li>
              <li id="courseLi"><a href="/career">Career</a></li>
              <li id="mentorshipLi"><a href="/mentorships">Mentorship</a></li>
              <li id="competeLi"><a href="/compete">Compete</a></li>
            </ul>
          </nav>

          <div className="right-section">
          {isLoggedIn ? (
              <>
                <button className="icon-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </button>

                <div className="profile-pic" onClick={toggleSidebar}>
                  <img
                    width="37"
                    height="37"
                    alt=""
                    src= { state.user?.profile_url ||"https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/user-avatar/png/15.png?d=100x100"}
                  />
                </div>
              </>
            ) : (
              <button className="login-button" >
                <LockOpenOutlinedIcon style={{ fontSize: 22, color: 'black' }}/>
                Login
              </button>
            )}

            <button className="host-button" onClick={() => window.location.href = '/payment'}>
              <RocketLaunchOutlinedIcon style={{ fontSize: 22, color: 'black' }}/>
              <span>Pro</span>
            </button>

            
            
          </div>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;

