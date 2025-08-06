"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import {
  Menu,
  LogOut,
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  ShoppingCart,
  Calendar,
  Mail,
  Bell,
  User,
  Database,
} from "lucide-react"
import { theme } from "./Colors"

// Sidebar Container with responsive behavior
const SidebarContainer = styled.aside`
  width: ${({ $isCollapsed, $isMobile }) =>
    $isMobile ? ($isCollapsed ? "0" : "100%") : $isCollapsed ? "64px" : "280px"};
  height: 100vh;
  background: ${theme.colors.primary.gradient};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${({ $isMobile, $isCollapsed }) => ($isMobile && !$isCollapsed ? theme.shadows.xl : "none")};
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.md}) {
    transform: ${({ $isCollapsed }) => ($isCollapsed ? "translateX(-100%)" : "translateX(0)")};
  }
`

// Header integrated into sidebar
const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
`

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const Logo = styled.h1`
  font-size: ${({ $isCollapsed }) => ($isCollapsed ? "18px" : "24px")};
  font-weight: 700;
  color: ${theme.colors.white};
  margin: 0;
  background: linear-gradient(135deg, ${theme.colors.white}, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
  text-align: ${({ $isCollapsed }) => ($isCollapsed ? "center" : "left")};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const MenuToggle = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${theme.colors.white};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
    box-shadow: ${theme.shadows.md};
  }
`

// User info section
const UserInfo = styled.div`
  display: ${({ $isCollapsed }) => ($isCollapsed ? "none" : "block")};
  transition: all 0.3s ease;
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${theme.colors.white}, rgba(255, 255, 255, 0.9));
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.primary.main};
    font-weight: 600;
    font-size: 16px;
    margin: 0 auto 12px auto;
    box-shadow: ${theme.shadows.md};
  }
  
  .user-details {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.4;
    text-align: center;
    
    .user-name {
      color: ${theme.colors.white};
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .user-email {
      opacity: 0.7;
      margin-bottom: 4px;
    }
    
    .user-branch {
      opacity: 0.8;
      font-size: 11px;
    }
  }
`

// Collapsed user avatar
const CollapsedUserAvatar = styled.div`
  display: ${({ $isCollapsed }) => ($isCollapsed ? "flex" : "none")};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.white}, rgba(255, 255, 255, 0.9));
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary.main};
  font-weight: 600;
  font-size: 14px;
  margin: 0 auto;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.md};
`

// Navigation section
const NavSection = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`

const NavTitle = styled.h3`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  padding-left: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "12px")};
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "1")};
  transition: all 0.3s ease;
  text-align: ${({ $isCollapsed }) => ($isCollapsed ? "center" : "left")};
  height: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "auto")};
  overflow: hidden;
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ $active }) => ($active ? theme.colors.white : "rgba(255, 255, 255, 0.8)")};
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.15)" : "transparent")};
  padding: 12px;
  margin-bottom: 4px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? "center" : "flex-start")};
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: ${theme.colors.white};
    transform: scaleY(${({ $active }) => ($active ? "1" : "0")});
    transition: transform 0.3s ease;
    border-radius: 0 2px 2px 0;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.white};
    transform: ${({ $isCollapsed }) => ($isCollapsed ? "scale(1.05)" : "translateX(4px)")};
    box-shadow: ${theme.shadows.md};
  }
  
  .nav-icon {
    min-width: 20px;
    height: 20px;
    margin-right: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "12px")};
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .nav-text {
    opacity: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "1")};
    transform: ${({ $isCollapsed }) => ($isCollapsed ? "translateX(-10px)" : "translateX(0)")};
    transition: all 0.3s ease;
    white-space: nowrap;
    width: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "auto")};
    overflow: hidden;
  }
`

// Bottom section with logout
const SidebarFooter = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
`

const LogoutButton = styled.button`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.white};
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "8px")};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
  
  .logout-icon {
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .logout-text {
    opacity: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "1")};
    transform: ${({ $isCollapsed }) => ($isCollapsed ? "translateX(-10px)" : "translateX(0)")};
    transition: all 0.3s ease;
    width: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "auto")};
    overflow: hidden;
    white-space: nowrap;
  }
`

// Overlay for mobile
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $show }) => ($show ? "1" : "0")};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  transition: all 0.3s ease;
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

// Define all navigation pages directly
const navigationPages = [
  {
    name: 'Profile',
    path: '/',
    icon: User,
  },
  {
    name: 'Admin',
    path: '/admin',
    icon: Settings,
  },
  {
    name: 'Employee List',
    path: '/EmployeeList',
    icon: Users,
  },
  {
    name: 'Employee Data',
    path: '/EmployeeData',
    icon: Database,
  },
  // {
  //   name: 'Performance',
  //   path: '/performance',
  //   icon: BarChart3,
  // },
  // {
  //   name: 'Reports',
  //   path: '/reports',
  //   icon: FileText,
  // },
  // {
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   icon: Home,
  // },
]

const Sidebar = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Get user data from localStorage
  const userPayload = JSON.parse(localStorage.getItem("user_payload") || "{}")
  const selectedBranch = localStorage.getItem("selected_branch")

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (mobile) {
        setIsCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

const handleLogout = () => {
  if (typeof Storage !== "undefined") {
    localStorage.removeItem("user_payload");
    localStorage.removeItem("selected_branch");
    localStorage.removeItem("access_token"); // also clear token if used
  }

  const redirectURL = import.meta.env.VITE_LOGIN_REDIRECT_URL;

  // Clear page cache and redirect
  window.location.href = redirectURL; // More reliable than navigate()
};


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const closeSidebar = () => {
    if (isMobile) {
      setIsCollapsed(true)
    }
  }

  return (
    <>
      <Overlay $show={isMobile && !isCollapsed} onClick={closeSidebar} />

      <SidebarContainer $isCollapsed={isCollapsed} $isMobile={isMobile}>
        <SidebarHeader $isCollapsed={isCollapsed}>
          <HeaderTop $isCollapsed={isCollapsed}>
            <Logo $isCollapsed={isCollapsed}>{isCollapsed ? "SH" : "Shanmuga HR"}</Logo>
            <MenuToggle onClick={toggleSidebar}>
              <Menu size={20} />
            </MenuToggle>
          </HeaderTop>

          {userPayload && (
            <>
              <UserInfo $isCollapsed={isCollapsed}>
                <div className="user-avatar">{userPayload.name ? userPayload.name.charAt(0).toUpperCase() : "U"}</div>
                <div className="user-details">
                  <div className="user-name">{userPayload.name || "Unknown User"}</div>
                  <div className="user-email">{userPayload.email || "No email"}</div>
                  {selectedBranch && <div className="user-branch">Branch: {selectedBranch}</div>}
                </div>
              </UserInfo>

              <CollapsedUserAvatar $isCollapsed={isCollapsed}>
                {userPayload.name ? userPayload.name.charAt(0).toUpperCase() : "U"}
              </CollapsedUserAvatar>
            </>
          )}
        </SidebarHeader>

        <NavSection>
          <NavTitle $isCollapsed={isCollapsed}>Navigation</NavTitle>
          {navigationPages.map((page) => {
            const fullPath = `${import.meta.env.BASE_URL || ""}${page.path}`
            const isActive = location.pathname === fullPath || location.pathname === page.path
            const IconComponent = page.icon

            return (
              <NavLink key={page.path} to={fullPath} $active={isActive} $isCollapsed={isCollapsed} onClick={closeSidebar}>
                <span className="nav-icon">
                  <IconComponent size={20} />
                </span>
                <span className="nav-text">{page.name}</span>
              </NavLink>
            )
          })}
        </NavSection>

        <SidebarFooter>
          <LogoutButton onClick={handleLogout} $isCollapsed={isCollapsed}>
            <span className="logout-icon">
              <LogOut size={20} />
            </span>
            <span className="logout-text">Logout</span>
          </LogoutButton>
        </SidebarFooter>
      </SidebarContainer>

      {children}
    </>
  )
}

export default Sidebar