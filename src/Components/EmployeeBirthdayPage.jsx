"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import confetti from "canvas-confetti";
import { Calendar, Gift, Cake, Star, Sparkles } from "lucide-react";
import { theme } from "./Colors";

// Import Poppins font
const GlobalStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  font-family: 'Poppins', sans-serif;
`;

// Enhanced Styled Components
const PageContainer = styled(GlobalStyle)`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg,rgb(102, 111, 158) 50%,rgb(145, 164, 238) 0%, #3A3F66 10%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: titleGlow 3s ease-in-out infinite alternate;

  @keyframes titleGlow {
    0% { 
      filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
      transform: translateY(0px);
    }
    100% { 
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(24, 20, 20, 0.9);
  font-weight: 300;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: subtitleFloat 4s ease-in-out infinite;

  @keyframes subtitleFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
`;

const FloatingIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  pointer-events: none;
  overflow: hidden;

  svg {
    position: absolute;
    color: rgba(255, 255, 255, 0.1);
    animation: float 20s linear infinite;
  }

  svg:nth-child(1) {
    left: 10%;
    animation-delay: 0s;
    font-size: 2rem;
  }
  
  svg:nth-child(2) {
    left: 20%;
    animation-delay: -5s;
    font-size: 1.5rem;
  }
  
  svg:nth-child(3) {
    left: 30%;
    animation-delay: -10s;
    font-size: 2.5rem;
  }
  
  svg:nth-child(4) {
    left: 40%;
    animation-delay: -15s;
    font-size: 1.8rem;
  }
  
  svg:nth-child(5) {
    left: 60%;
    animation-delay: -3s;
    font-size: 2rem;
  }

  svg:nth-child(6) {
    left: 70%;
    animation-delay: -8s;
    font-size: 1.6rem;
  }

  svg:nth-child(7) {
    left: 80%;
    animation-delay: -12s;
    font-size: 2.2rem;
  }

  svg:nth-child(8) {
    left: 90%;
    animation-delay: -7s;
    font-size: 1.7rem;
  }

  @keyframes float {
    0% {
      transform: translateY(200px) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.3;
    }
    90% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(-200px) rotate(360deg);
      opacity: 0;
    }
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
  position: relative;
  justify-content: left;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: left;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  width: fit-content;
  min-width: 320px;
  max-width: 400px;
  height: auto;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: cardEntry 0.8s ease-out, cardFloat 6s ease-in-out infinite;
  animation-delay: ${props => props.index * 0.2}s, ${props => props.index * 0.3}s;
  animation-fill-mode: both, both;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4d96ff, #9b59b6);
    background-size: 300% 100%;
    animation: shimmer 3s linear infinite;
    border-radius: 20px 20px 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    opacity: 0;
    animation: cardGlow 4s ease-in-out infinite;
    animation-delay: ${props => props.index * 0.5}s;
  }

  &:hover {
    transform: translateY(-15px) rotateX(5deg) rotateY(2deg) scale(1.03);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.4);

    &::after {
      opacity: 1;
      animation-duration: 2s;
    }

    &::before {
      animation-duration: 1.5s;
    }
  }

  &:hover .card-content {
    transform: translateZ(20px);
  }

  @keyframes cardEntry {
    0% {
      opacity: 0;
      transform: translateY(50px) rotateX(20deg) scale(0.8);
      filter: blur(10px);
    }
    60% {
      transform: translateY(-10px) rotateX(-2deg) scale(1.05);
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotateX(0) scale(1);
      filter: blur(0px);
    }
  }

  @keyframes cardFloat {
    0%, 100% {
      transform: translateY(0px) rotateZ(0deg);
    }
    25% {
      transform: translateY(-8px) rotateZ(1deg);
    }
    50% {
      transform: translateY(-5px) rotateZ(0deg);
    }
    75% {
      transform: translateY(-12px) rotateZ(-1deg);
    }
  }

  @keyframes shimmer {
    0% { background-position: -300% 0; }
    100% { background-position: 300% 0; }
  }

  @keyframes cardGlow {
    0%, 100% {
      opacity: 0;
      transform: scale(0.8) rotate(0deg);
    }
    50% {
      opacity: 0.3;
      transform: scale(1.2) rotate(180deg);
    }
  }

  @media (max-width: 480px) {
    min-width: 280px;
    max-width: 100%;
    margin: 0 auto;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
  position: relative;
  transition: transform 0.3s ease;
  
  .card-content {
    transition: transform 0.3s ease;
  }
`;

const AvatarContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;
  animation: avatarBounce 3s ease-in-out infinite;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: avatarShine 4s ease-in-out infinite;
  }

  @keyframes avatarBounce {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-3px) scale(1.05); }
  }

  @keyframes avatarShine {
    0% { 
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
      opacity: 0;
    }
    50% { 
      opacity: 1;
    }
    100% { 
      transform: translateX(100%) translateY(100%) rotate(45deg);
      opacity: 0;
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: #2d3748;
  margin: 0;
  background: linear-gradient(45deg, #2d3748, #4a5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titlePulse 2s ease-in-out infinite;

  @keyframes titlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
`;

const CardSubtitle = styled.p`
  font-size: 0.85rem;
  font-family: 'Poppins', sans-serif;
  color: #718096;
  margin: 0.25rem 0 0 0;
  font-weight: 400;
  animation: subtitleSlide 3s ease-in-out infinite;

  @keyframes subtitleSlide {
    0%, 100% { transform: translateX(0px); }
    50% { transform: translateX(2px); }
  }
`;

const InfoGrid = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1.2rem;
  flex-wrap: wrap;

  @media (max-width: 360px) {
    flex-direction: column;
    gap: 0.6rem;
  }
`;

const InfoItem = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  flex: 1;
  min-width: 120px;
  animation: itemFloat 4s ease-in-out infinite;
  animation-delay: ${props => props.index * 0.2}s;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @keyframes itemFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-2px); }
  }
`;

const InfoLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: #a0aec0;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 0.3rem;
  animation: labelGlow 3s ease-in-out infinite;

  @keyframes labelGlow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
`;

const InfoValue = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  animation: valueSlide 2.5s ease-in-out infinite;

  svg {
    animation: iconSpin 4s linear infinite;
  }

  @keyframes valueSlide {
    0%, 100% { transform: translateX(0px); }
    50% { transform: translateX(1px); }
  }

  @keyframes iconSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const BirthdayBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 15px rgba(238, 90, 82, 0.4);
  animation: badgeDance 3s ease-in-out infinite;
  z-index: 10;

  @keyframes badgeDance {
    0%, 100% { 
      transform: translateY(0) rotate(-2deg) scale(1);
    }
    25% { 
      transform: translateY(-3px) rotate(2deg) scale(1.05);
    }
    50% { 
      transform: translateY(-1px) rotate(-1deg) scale(1.02);
    }
    75% { 
      transform: translateY(-4px) rotate(3deg) scale(1.08);
    }
  }
`;

const MessageContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: messageEntry 0.6s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f);
    animation: shimmer 2s linear infinite;
  }

  @keyframes messageEntry {
    0% {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const MessageIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: iconFloat 3s ease-in-out infinite;

  @keyframes iconFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }
`;

const MessageText = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  font-weight: 500;
  line-height: 1.6;
`;

const LoadingContainer = styled(MessageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(102, 126, 234, 0.1);
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled(MessageContainer)`
  border: 1px solid rgba(239, 68, 68, 0.2);
  background: rgba(254, 242, 242, 0.95);

  &::before {
    background: linear-gradient(90deg, #ef4444, #f87171);
  }
`;

const EmployeeBirthdayPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    return moment().diff(moment(dateOfBirth), 'years');
  };

  // Fetch employees with birthdays today
  useEffect(() => {
    const fetchBirthdays = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get token from localStorage (try both possible keys)
        const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      const branchCode = localStorage.getItem("selected_branch")

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_GLOBAL_BASE_URL}employees_birthdays_today/`,
          {
            headers: {
              Authorization: token,
          "Branch-Code": branchCode,

              'Content-Type': 'application/json',
            },
            timeout: 10000,
          }
        );

        // Handle different response formats
        const data = response.data?.birthdays || response.data?.data || [];
        setEmployees(Array.isArray(data) ? data : []);

        // Trigger confetti animation if there are birthdays
        if (Array.isArray(data) && data.length > 0) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.1 },
            colors: ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#9b59b6'],
            disableForReducedMotion: true,
            duration: 4000,
          });
        }

      } catch (err) {
        console.error("Error fetching employee birthdays:", err);

        let errorMessage = "Failed to load birthday data. Please try again.";

        if (err.code === 'ECONNABORTED') {
          errorMessage = "Request timed out. Please check your connection.";
        } else if (err.response?.status === 401) {
          errorMessage = "Authentication failed. Please log in again.";
        } else if (err.response?.status === 403) {
          errorMessage = "You don't have permission to view this data.";
        } else if (err.response?.status === 404) {
          errorMessage = "Birthday API endpoint not found.";
        } else if (err.response?.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (err.message === "No authentication token found") {
          errorMessage = "Please log in to view birthday data.";
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdays();
  }, []);

  return (
    <PageContainer>
      <ContentWrapper>
        <HeaderSection>
          <FloatingIcons>
            <Gift />
            <Cake />
            <Star />
            <Sparkles />
            <Gift />
            <Cake />
            <Star />
            <Sparkles />
          </FloatingIcons>
          
          <Title>
            <Calendar size={50} />
            Today's Birthdays
          </Title>
          <Subtitle>
            {moment().format("dddd, MMMM Do YYYY")}
          </Subtitle>
        </HeaderSection>

        {loading && (
          <LoadingContainer>
            <LoadingSpinner />
            <MessageText>Loading birthday celebrations...</MessageText>
          </LoadingContainer>
        )}

        {error && (
          <ErrorContainer>
            <MessageIcon>⚠️</MessageIcon>
            <MessageText>{error}</MessageText>
          </ErrorContainer>
        )}

        {!loading && !error && employees.length === 0 && (
          <MessageContainer>
            <MessageIcon>🎈</MessageIcon>
            <MessageText>
              No employees have birthdays today, but every day is worth celebrating! 
              Check back tomorrow for more birthday surprises.
            </MessageText>
          </MessageContainer>
        )}

        {!loading && !error && employees.length > 0 && (
          <CardContainer>
            {employees.map((employee, index) => (
<Card key={employee.employeeId || employee.id || index} index={index}>
  <BirthdayBadge>🎉 Birthday!</BirthdayBadge>

  <div className="card-content">
    <CardHeader>
      <AvatarContainer>
        {getInitials(employee.employeeName || employee.name)}
      </AvatarContainer>
      <div>
        <CardTitle>
          {employee.employeeName || employee.name || "Unknown Employee"}
        </CardTitle>
        <CardSubtitle>
          ID: {employee.employeeId || employee.id || "N/A"}
        </CardSubtitle>
      </div>
    </CardHeader>

    <InfoGrid>
      {/* Date of Birth */}
      <InfoItem index={0}>
        <InfoLabel>Date of Birth</InfoLabel>
        <InfoValue>
          <Cake size={14} />
          {employee.dateOfBirth
            ? moment(employee.dateOfBirth).format("DD/MM/YYYY")
            : "N/A"}
        </InfoValue>
      </InfoItem>

      {/* Age */}
      <InfoItem index={1}>
        <InfoLabel>Age Today</InfoLabel>
        <InfoValue>
          <Star size={14} />
          {employee.age ?? calculateAge(employee.dateOfBirth)} years
        </InfoValue>
      </InfoItem>

      {/* Department */}
      <InfoItem index={2}>
        <InfoLabel>Department</InfoLabel>
        <InfoValue>
          🏢 {employee.department || "N/A"}
        </InfoValue>
      </InfoItem>

      {/* Designation */}
      <InfoItem index={3}>
        <InfoLabel>Designation</InfoLabel>
        <InfoValue>
          💼 {employee.designation || "N/A"}
        </InfoValue>
      </InfoItem>
    </InfoGrid>
  </div>
</Card>

            ))}
          </CardContainer>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default EmployeeBirthdayPage;