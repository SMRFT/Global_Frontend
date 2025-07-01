"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled, { createGlobalStyle } from "styled-components"
import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import { theme } from "./Components/Colors"

// Import your page components directly
import Admin from "./Components/Admin"
import Profile from "./Components/Profile"
import EmployeeList from "./Components/EmployeeList"
import Performance from "./Components/Performance"
import EmployeeData from "./Components/EmployeeData"

// Global styles with gradient theme
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, ${theme.colors.secondary.light} 0%, ${theme.colors.neutral[50]} 100%);
    min-height: 100vh;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.neutral[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.gradient};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary.gradientReverse};
  }
`

// Dynamic content that adjusts based on sidebar state
const Content = styled.div`
  margin-left: ${({ $sidebarWidth }) => $sidebarWidth};
  flex: 1;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContent = styled.main`
  padding: 20px;
  flex: 1;
  background: linear-gradient(135deg, ${theme.colors.secondary.light} 0%, ${theme.colors.neutral[50]} 100%);

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 16px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 12px;
  }
`

// Default placeholder component for missing pages
const DefaultPage = ({ pageName }) => (
  <div style={{ 
    padding: '40px', 
    textAlign: 'center', 
    background: 'white', 
    borderRadius: '8px', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
  }}>
    <h2>{pageName} Page</h2>
    <p>This page is under development.</p>
  </div>
)

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  // Calculate sidebar width based on state
  const sidebarWidth = isMobile ? "0px" : isCollapsed ? "64px" : "280px"

  return (
    <>
      <GlobalStyle />
      <Router>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} isMobile={isMobile} />
        <Content $sidebarWidth={sidebarWidth}>
          {/* <Header /> */}
          <MainContent>
            <Routes>
              {/* Define all routes directly */}
              <Route path="/" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/employee-list" element={<EmployeeList />} />
              <Route path="/employee-data" element={<EmployeeData />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/reports" element={<DefaultPage pageName="Reports" />} />
              <Route path="/dashboard" element={<DefaultPage pageName="Dashboard" />} />
              
              {/* Handle base URL routes if needed */}
              <Route path={`${import.meta.env.BASE_URL || ""}/`} element={<Profile />} />
              <Route path={`${import.meta.env.BASE_URL || ""}/admin`} element={<Admin />} />
              <Route path={`${import.meta.env.BASE_URL || ""}/EmployeeList`} element={<EmployeeList />} />
              <Route path={`${import.meta.env.BASE_URL || ""}/EmployeeData`} element={<EmployeeData />} />
              <Route path={`${import.meta.env.BASE_URL || ""}/performance`} element={<Performance />} />

            </Routes>
          </MainContent>
        </Content>
      </Router>
    </>
  )
}

export default App