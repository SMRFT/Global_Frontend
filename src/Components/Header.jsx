"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { Clock, User, Mail, Building, Hash } from "lucide-react"
import { theme } from "./Colors"

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.neutral[200]};
  box-shadow: ${theme.shadows.sm};
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;
  }
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    justify-content: space-between;
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
  }
`

const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${theme.colors.primary.gradient};
  color: ${theme.colors.white};
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: ${theme.shadows.md};
  
  .time-icon {
    color: ${theme.colors.white};
  }
  
  .time-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.2;
  }
  
  .current-time {
    font-size: 16px;
    font-weight: 700;
  }
  
  .current-date {
    font-size: 11px;
    opacity: 0.9;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    .time-text {
      display: none;
    }
  }
`

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: ${theme.colors.secondary.light};
  border: 1px solid ${theme.colors.secondary.main};
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.secondary.main};
    border-color: ${theme.colors.primary.light};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 8px 12px;
  }
`

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-weight: 700;
  font-size: 16px;
  box-shadow: ${theme.shadows.md};

  @media (max-width: ${theme.breakpoints.md}) {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
`

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const UserInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  font-size: 12px;
  color: ${theme.colors.neutral[600]};
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  
  .info-icon {
    width: 14px;
    height: 14px;
    color: ${theme.colors.primary.main};
    flex-shrink: 0;
  }
  
  .info-label {
    font-weight: 600;
    color: ${theme.colors.neutral[700]};
  }
  
  .info-value {
    color: ${theme.colors.neutral[600]};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
  }
`

const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  
  .greeting {
    font-size: 14px;
    color: ${theme.colors.neutral[600]};
    font-weight: 500;
  }
  
  .user-name {
    font-size: 16px;
    color: ${theme.colors.neutral[900]};
    font-weight: 700;
    background: ${theme.colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${theme.colors.neutral[100]};
  border-radius: 12px;
  color: ${theme.colors.neutral[600]};
  font-size: 14px;
`

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${theme.colors.neutral[200]};
  border-top: 2px solid ${theme.colors.primary.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [greeting, setGreeting] = useState("")

  const user = JSON.parse(localStorage.getItem("user_payload") || "{}")
  const selectedBranch = localStorage.getItem("selected_branch")

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Set greeting based on time of day
  useEffect(() => {
    const hour = currentTime.getHours()
    if (hour < 12) {
      setGreeting("Good Morning")
    } else if (hour < 17) {
      setGreeting("Good Afternoon")
    } else {
      setGreeting("Good Evening")
    }
  }, [currentTime])

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getUserInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (!user || !user.name) {
    return (
      <HeaderWrapper>
        <LeftSection>
          <TimeDisplay>
            <Clock size={20} className="time-icon" />
            <div className="time-text">
              <div className="current-time">{formatTime(currentTime)}</div>
              <div className="current-date">{formatDate(currentTime)}</div>
            </div>
          </TimeDisplay>
        </LeftSection>

        <RightSection>
          <LoadingContainer>
            <LoadingSpinner />
            <span>Loading user info...</span>
          </LoadingContainer>
        </RightSection>
      </HeaderWrapper>
    )
  }

  return (
    <HeaderWrapper>
      <LeftSection>
        <TimeDisplay>
          <Clock size={20} className="time-icon" />
          <div className="time-text">
            <div className="current-time">{formatTime(currentTime)}</div>
            <div className="current-date">{formatDate(currentTime)}</div>
          </div>
        </TimeDisplay>

        <WelcomeText>
          <div className="greeting">{greeting},</div>
          <div className="user-name">{user.name}</div>
        </WelcomeText>
      </LeftSection>

      <RightSection>
        <UserInfoContainer>
          <UserAvatar>{getUserInitials(user.name)}</UserAvatar>

          <UserDetails>
            <UserInfoGrid>
              <InfoItem>
                <Hash className="info-icon" />
                <span className="info-label">ID:</span>
                <span className="info-value">{user.aud || "N/A"}</span>
              </InfoItem>

              <InfoItem>
                <User className="info-icon" />
                <span className="info-label">Name:</span>
                <span className="info-value">{user.name}</span>
              </InfoItem>

              <InfoItem>
                <Mail className="info-icon" />
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </InfoItem>

              {selectedBranch && (
                <InfoItem>
                  <Building className="info-icon" />
                  <span className="info-label">Branch:</span>
                  <span className="info-value">{selectedBranch}</span>
                </InfoItem>
              )}
            </UserInfoGrid>
          </UserDetails>
        </UserInfoContainer>
      </RightSection>
    </HeaderWrapper>
  )
}

export default Header
