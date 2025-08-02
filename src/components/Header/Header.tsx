import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import LogoutModal from "../LogoutModal/LogoutModal";
import { useAuth } from "../../context/AuthProvider";

const Header: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout, isLoggedIn } = useAuth();

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");
    setIsModalOpen(false);
    logout();
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
    setIsNavCollapsed(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <>
      <header className={`header no-print ${visible ? "active" : "hidden"}`}>
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            <img
              src="./healthu-logo.png"
              style={{ width: "100px", height: "auto" }}
              alt="Descriptive Text"
            ></img>
          </Link>
          <button
            className={`navbar-toggler ${isNavCollapsed ? "" : "open"}`}
            type="button"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`navbar-collapse ${
              isNavCollapsed ? "collapsed" : "collapse show"
            }`}
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/search" className="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="m505 442.7-99.7-99.7c-4.5-4.5-10.6-7-17-7h-16.3c27.6-35.3 44-79.7 44-128 0-114.9-93.1-208-208-208s-208 93.1-208 208 93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zm-297-106.7c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                  </svg>
                  <span className="link-item">Search</span>
                </Link>
              </li>
              {isLoggedIn ? (
                <li
                  className="nav-item"
                  onMouseOver={() => setIsOpen(true)}
                  onMouseOut={() => setIsOpen(false)}
                >
                  <div onClick={toggleDropdown} className="nav-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                    >
                      <path d="m248 8c-137 0-248 111-248 248s111 248 248 248 248-111 248-248-111-248-248-248zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9s28-2.7 40.9-6.9c2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8-35.2 41.6-87.8 68.2-146.5 68.2z" />
                    </svg>
                    <span className="link-item">My Account</span>
                  </div>
                  {isOpen && (
                    <div className="dropdown-content">
                      <button
                        className="dropdown-item"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </button>
                      <Link to="/profile" className="dropdown-item">
                        My Profile
                      </Link>
                    </div>
                  )}
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/sing-in" className="nav-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                    >
                      <path d="m248 8c-137 0-248 111-248 248s111 248 248 248 248-111 248-248-111-248-248-248zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9s28-2.7 40.9-6.9c2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8-35.2 41.6-87.8 68.2-146.5 68.2z" />
                    </svg>
                    <span className="link-item">Sing in</span>
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link to="/bmi-page" className="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="m400 0h-352c-25.6 0-48 22.4-48 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48v-416c0-25.6-22.4-48-48-48zm-272 435.2c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-166.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm0-256c0 6.4-6.4 12.8-12.8 12.8h-294.4c-6.4 0-12.8-6.4-12.8-12.8v-102.4c0-6.4 6.4-12.8 12.8-12.8h294.4c6.4 0 12.8 6.4 12.8 12.8z" />
                  </svg>
                  <span className="link-item">BMI Calculator</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/chat-page" className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                  <span className="link-item">Chat Assistant</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about-us" className="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="m504 256c0 136.997-111.043 248-248 248s-248-111.003-248-248c0-136.917 111.043-248 248-248s248 111.083 248 248zm-241.345-166c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976-23.524 13.187-54.652 29.6-54.652 70.659v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zm-6.655 248c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" />
                  </svg>
                  <span className="link-item">About Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div
          className={`mobile-mega-menu ${
            !isNavCollapsed && !prevScrollPos ? "mobile-mega-menu--active" : ""
          }`}
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/search" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="m505 442.7-99.7-99.7c-4.5-4.5-10.6-7-17-7h-16.3c27.6-35.3 44-79.7 44-128 0-114.9-93.1-208-208-208s-208 93.1-208 208 93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zm-297-106.7c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                </svg>
                <span className="link-item">Search</span>
              </Link>
            </li>
            {isLoggedIn ? (
              <li
                className="nav-item"
                onMouseOver={() => setIsOpen(true)}
                onMouseOut={() => setIsOpen(false)}
              >
                <div onClick={toggleDropdown} className="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path d="m248 8c-137 0-248 111-248 248s111 248 248 248 248-111 248-248-111-248-248-248zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9s28-2.7 40.9-6.9c2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8-35.2 41.6-87.8 68.2-146.5 68.2z" />
                  </svg>
                  <span className="link-item">My Account</span>
                </div>
                {isOpen && (
                  <div className="dropdown-content">
                    <button
                      className="dropdown-item"
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </button>
                    <Link to="/profile" className="dropdown-item">
                      My Profile
                    </Link>
                  </div>
                )}
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/sing-in" className="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path d="m248 8c-137 0-248 111-248 248s111 248 248 248 248-111 248-248-111-248-248-248zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9s28-2.7 40.9-6.9c2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8-35.2 41.6-87.8 68.2-146.5 68.2z" />
                  </svg>
                  <span className="link-item">Sing in</span>
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link to="/bmi-page" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="m400 0h-352c-25.6 0-48 22.4-48 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48v-416c0-25.6-22.4-48-48-48zm-272 435.2c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-166.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm0-256c0 6.4-6.4 12.8-12.8 12.8h-294.4c-6.4 0-12.8-6.4-12.8-12.8v-102.4c0-6.4 6.4-12.8 12.8-12.8h294.4c6.4 0 12.8 6.4 12.8 12.8z" />
                </svg>
                <span className="link-item">BMI Calculator</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chat-page" className="nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
                <span className="link-item">Chat Assistant</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="m504 256c0 136.997-111.043 248-248 248s-248-111.003-248-248c0-136.917 111.043-248 248-248s248 111.083 248 248zm-241.345-166c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976-23.524 13.187-54.652 29.6-54.652 70.659v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zm-6.655 248c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" />
                </svg>
                <span className="link-item">About Us</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
