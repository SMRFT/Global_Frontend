"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import styled, { createGlobalStyle } from "styled-components"
import { theme } from "./Colors"

import { Search, User, Phone, Mail, Briefcase, Building, Users, Database, Lock, X, Eye, EyeOff, Filter } from 'lucide-react'

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
// Styled components
const PageContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    right: 0;
    height: 3px;
    background: ${theme.colors.primary.gradient};
    border-radius: 3px;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.primary.main};
  margin: 0;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const SearchContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  background: linear-gradient(to right, ${theme.colors.secondary.light}, ${theme.colors.white});
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2.5rem;
  box-shadow: ${theme.shadows.md};
  border: 1px solid rgba(243, 135, 90, 0.1);
`

const SearchGroup = styled.div`
  flex: 1;
  min-width: 240px;
`

const SearchLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.primary.dark};
  margin-bottom: 0.5rem;
`

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  color: ${theme.colors.primary.light};
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${theme.colors.primary.light};
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23F3875A' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${theme.colors.primary.light};
  }
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`

const Card = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.secondary.main};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary.light};
  }
`

const CardHeader = styled.div`
  background: ${theme.colors.primary.gradient};
  padding: 1.5rem;
  position: relative;
`

const CardAvatar = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: ${theme.shadows.md};
  border: 3px solid rgba(255, 255, 255, 0.8);
`

const CardTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`

const CardSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  margin: 0.5rem 0 0;
  font-weight: 500;
`

const CardBody = styled.div`
  padding: 1.5rem;
`

const CardInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const CardInfoIcon = styled.div`
  color: ${theme.colors.primary.main};
  margin-right: 1rem;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

const CardInfoText = styled.p`
  color: ${theme.colors.neutral[700]};
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`

const CardFooter = styled.div`
  padding: 1.25rem 1.5rem;
  background-color: ${theme.colors.secondary.light};
  border-top: 1px solid ${theme.colors.secondary.main};
  display: flex;
  justify-content: flex-end;
`

const CardButton = styled.button`
  background: ${theme.colors.primary.gradient};
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.3);
  }
`

const ButtonIcon = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
`

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: ${theme.colors.neutral[500]};
  font-size: 1.125rem;
  grid-column: 1 / -1;
  background: ${theme.colors.secondary.light};
  border-radius: 1rem;
  border: 2px dashed ${theme.colors.secondary.main};
`

// Modal components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 32rem;
  box-shadow: ${theme.shadows.xl};
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
  border: 1px solid ${theme.colors.secondary.main};
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${theme.colors.secondary.main};
  background: linear-gradient(to right, ${theme.colors.secondary.light}, white);
`

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.primary.dark};
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.neutral[500]};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.colors.primary.dark};
    background-color: ${theme.colors.secondary.main};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
  }
`

const ModalBody = styled.div`
  padding: 1.75rem;
`

const ModalInfo = styled.div`
  margin-bottom: 2rem;
  padding: 1.25rem;
  background-color: ${theme.colors.secondary.light};
  border-radius: 0.75rem;
  border: 1px solid ${theme.colors.secondary.main};
`

const ModalInfoItem = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const ModalInfoLabel = styled.span`
  font-weight: 600;
  color: ${theme.colors.primary.dark};
  width: 8rem;
`

const ModalInfoValue = styled.span`
  color: ${theme.colors.neutral[800]};
  font-weight: 500;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.primary.dark};
  margin-bottom: 0.5rem;
`

const PasswordInputWrapper = styled.div`
  position: relative;
`

const PasswordInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.75rem;
  font-size: 0.875rem;
  padding-right: 2.75rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
    outline: none;
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${theme.colors.primary.light};
  }
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.primary.light};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 0.25rem;
  
  &:hover {
    color: ${theme.colors.primary.dark};
    background-color: ${theme.colors.secondary.light};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(243, 135, 90, 0.2);
  }
`

const ErrorMessage = styled.p`
  color: ${theme.colors.error.main};
  font-size: 0.875rem;
  margin: 0.5rem 0 0;
  font-weight: 500;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${theme.colors.secondary.main};
  gap: 1rem;
  background: linear-gradient(to right, white, ${theme.colors.secondary.light});
`

const CancelButton = styled.button`
  background-color: white;
  color: ${theme.colors.neutral[700]};
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${theme.colors.secondary.light};
    border-color: ${theme.colors.primary.light};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
  }
`

const SaveButton = styled.button`
  background: ${theme.colors.primary.gradient};
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${theme.shadows.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.3);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #f3875a80, #f0575280, #ec444f80);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, ${theme.colors.secondary.light}, ${theme.colors.secondary.main});
  color: ${theme.colors.primary.dark};
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${theme.colors.secondary.main};
`

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: ${theme.colors.primary.gradient};
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${theme.shadows.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`

// API wrapper with standardized error handling
const apiRequest = async (url, method = "GET", data = null, headers = {}) => {
  try {
    const branch_code = localStorage.getItem("selected_branch")
    const token = localStorage.getItem("access_token")

    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: token,
      "branch-code": branch_code,
    }

    const config = {
      method,
      url,
      headers: { ...defaultHeaders, ...headers },
      validateStatus: () => true, // Allow all status codes to be handled in the then block
    }

    if (data && (method === "POST" || method === "PUT")) {
      config.data = data
    }

    const response = await axios(config)

    // Handle different status codes
    if (response.status === 201 || response.status === 200) {
      return { success: true, data: response.data }
    } else if (response.status === 400) {
      console.warn("Bad Request:", response.data)
      return { success: false, error: "Invalid data sent to server.", status: 400, data: response.data }
    } else if (response.status === 401) {
      console.warn("Unauthorized:", response.data)
      return { success: false, error: "Session expired. Please log in again.", status: 401, data: response.data }
    } else {
      console.warn("Unexpected status:", response.status, response.data)
      return { success: false, error: "Something went wrong. Try again.", status: response.status, data: response.data }
    }
  } catch (error) {
    console.error("Network or unexpected error:", error)
    return { success: false, error: "Network error or unexpected issue occurred.", networkError: true }
  }
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [departments, setDepartments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const GlobalBaseUrl = import.meta.env.VITE_BACKEND_GLOBAL_BASE_URL

const getAllEmployees = async () => {
  setIsLoading(true);
  const result = await apiRequest(GlobalBaseUrl + "get_employees_with_labels/");

  if (result.success) {
    const employeeData = (result.data.employees || []).map((emp) => ({
      ...emp,
      additionalRoles: safeParseJSON(emp.additionalRoles, []),
      dataEntitlements: safeParseJSON(emp.dataEntitlements, []),
      qualifications: safeParseJSON(emp.qualifications, []),
      experiences: safeParseJSON(emp.experiences, []),
      bankDetails: safeParseJSON(emp.bankDetails, {}),
    }));

    setEmployees(employeeData);
    setFilteredEmployees(employeeData);

    const uniqueDepartments = [...new Set(employeeData.map((emp) => emp.department_name))].filter(Boolean);
    setDepartments(uniqueDepartments);
  } else {
    if (result.status === 401) {
      alert("Your session has expired. Please log in again.");
    } else {
      alert(`Error fetching employees: ${result.error}`);
    }
  }

  setIsLoading(false);
};

// Helper to parse JSON with fallback
const safeParseJSON = (input, fallback) => {
  try {
    return typeof input === "string" ? JSON.parse(input) : input || fallback;
  } catch {
    return fallback;
  }
};


  useEffect(() => {
    getAllEmployees()
  }, [])

  useEffect(() => {
    filterEmployees()
  }, [searchTerm, departmentFilter, employees])

  const filterEmployees = () => {
    let filtered = [...employees]

    // Filter by search term (name, mobile, or department)
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (emp) =>
          (emp.employeeName && emp.employeeName.toLowerCase().includes(term)) ||
          (emp.mobileNumber && emp.mobileNumber.toLowerCase().includes(term)) ||
          (emp.department && emp.department.toLowerCase().includes(term)),
      )
    }

    // Filter by department
    if (departmentFilter) {
      filtered = filtered.filter((emp) => emp.department_name === departmentFilter)
    }

    setFilteredEmployees(filtered)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleDepartmentChange = (e) => {
    setDepartmentFilter(e.target.value)
  }

  const openCredentialsModal = (employee) => {
    setSelectedEmployee(employee)
    setPassword("")
    setConfirmPassword("")
    setPasswordError("")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEmployee(null)
  }

  const validatePasswords = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return false
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return false
    }

    setPasswordError("")
    return true
  }

const handleSaveCredentials = async () => {
  if (!validatePasswords()) return;

  try {
    const response = await apiRequest(GlobalBaseUrl + "set_employee_password/", "POST", {
      employeeId: selectedEmployee.employeeId,
      employeeName: selectedEmployee.employeeName,
      department: selectedEmployee.department,
      designation: selectedEmployee.designation,
      password: password,
    });

    if (response?.success) {
      alert(response.message || "Password set successfully.");
      closeModal();
    } else {
      if (response?.message) {
        setPasswordError(response.message);
      } else {
        setPasswordError("Something went wrong. Please try again.");
      }
    }
  } catch (error) {
    // Handle HTTP error responses or connection failures
    if (error?.response?.status === 400) {
      setPasswordError("Invalid input. Please check your data.");
    } else if (error?.response?.status === 401) {
      setPasswordError("Unauthorized. Your session has expired.");
      // Optional: redirect to login
    } else if (error?.response?.status === 500) {
      setPasswordError("Server error. Please try again later.");
    } else {
      setPasswordError("Unknown error occurred.");
    }
  }
};


  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <Header>
          <Title>Employee Directory</Title>
        </Header>

        <SearchContainer>
          <SearchGroup>
            <SearchLabel>Search Employees</SearchLabel>
            <SearchInputWrapper>
              <SearchIcon>
                <Search size={18} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search by name, mobile, or department"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </SearchInputWrapper>
          </SearchGroup>

          <SearchGroup>
            <SearchLabel>Department</SearchLabel>
            <SearchInputWrapper>
              <SearchIcon>
                <Building size={18} />
              </SearchIcon>
              <Select value={departmentFilter} onChange={handleDepartmentChange}>
                <option value="">All Departments</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </Select>
            </SearchInputWrapper>
          </SearchGroup>
        </SearchContainer>

        <CardsGrid>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <Card key={employee.employeeId}>
                <CardHeader>
                  <CardAvatar>
                    <User size={32} color={theme.colors.primary.dark} />
                  </CardAvatar>
                  <CardTitle>{employee.employeeName || "N/A"}</CardTitle>
                  <CardSubtitle>{employee.designation_name || "No Designation"}</CardSubtitle>
                </CardHeader>

                <CardBody>
                  <CardInfo>
                    <CardInfoIcon>
                      <Briefcase size={18} />
                    </CardInfoIcon>
                    <CardInfoText>{employee.department_name|| "No Department"}</CardInfoText>
                  </CardInfo>

                  <CardInfo>
                    <CardInfoIcon>
                      <Phone size={18} />
                    </CardInfoIcon>
                    <CardInfoText>{employee.mobileNumber || "No Phone"}</CardInfoText>
                  </CardInfo>

                  <CardInfo>
                    <CardInfoIcon>
                      <Mail size={18} />
                    </CardInfoIcon>
                    <CardInfoText>{employee.email || "No Email"}</CardInfoText>
                  </CardInfo>

                  <CardInfo>
                    <CardInfoIcon>
                      <User size={18} />
                    </CardInfoIcon>
                    <CardInfoText>Primary Role: {employee.primary_role_name || "None"}</CardInfoText>
                  </CardInfo>

                  {employee.additionalRoles && employee.additionalRoles.length > 0 && (
                    <CardInfo>
                      <CardInfoIcon>
                        <Users size={18} />
                      </CardInfoIcon>
                      <div>
                        <CardInfoText>Additional Roles:</CardInfoText>
                        <BadgeContainer>
                          {employee.additionalRoles.map((role, index) => (
                            <Badge key={index}>{role}</Badge>
                          ))}
                        </BadgeContainer>
                      </div>
                    </CardInfo>
                  )}

                  {employee.dataEntitlements && employee.dataEntitlements.length > 0 && (
                    <CardInfo>
                      <CardInfoIcon>
                        <Database size={18} />
                      </CardInfoIcon>
                      <div>
                        <CardInfoText>Data Entitlements:</CardInfoText>
                        <BadgeContainer>
                          {employee.dataEntitlements.map((entitlement, index) => (
                            <Badge key={index}>{entitlement}</Badge>
                          ))}
                        </BadgeContainer>
                      </div>
                    </CardInfo>
                  )}
                </CardBody>

                <CardFooter>
                  <CardButton onClick={() => openCredentialsModal(employee)}>
                    <ButtonIcon>
                      <Lock size={16} />
                    </ButtonIcon>
                    Login Credentials
                  </CardButton>
                </CardFooter>
              </Card>
            ))
          ) : (
            <NoResults>
              <p>No employees found matching your search criteria.</p>
            </NoResults>
          )}
        </CardsGrid>

        {/* Credentials Modal */}
        {isModalOpen && selectedEmployee && (
          <ModalOverlay>
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>Set Login Credentials</ModalTitle>
                <CloseButton onClick={closeModal}>
                  <X size={20} />
                </CloseButton>
              </ModalHeader>

              <ModalBody>
                <ModalInfo>
                  <ModalInfoItem>
                    <ModalInfoLabel>Employee ID:</ModalInfoLabel>
                    <ModalInfoValue>{selectedEmployee.employeeId}</ModalInfoValue>
                  </ModalInfoItem>
                  <ModalInfoItem>
                    <ModalInfoLabel>Name:</ModalInfoLabel>
                    <ModalInfoValue>{selectedEmployee.employeeName}</ModalInfoValue>
                  </ModalInfoItem>
                  <ModalInfoItem>
                    <ModalInfoLabel>Department:</ModalInfoLabel>
                    <ModalInfoValue>{selectedEmployee.department_name || "N/A"}</ModalInfoValue>
                  </ModalInfoItem>
                  <ModalInfoItem>
                    <ModalInfoLabel>Designation:</ModalInfoLabel>
                    <ModalInfoValue>{selectedEmployee.designation_name || "N/A"}</ModalInfoValue>
                  </ModalInfoItem>
                </ModalInfo>

                <FormGroup>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <PasswordInputWrapper>
                    <PasswordInput
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                    <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </PasswordToggle>
                  </PasswordInputWrapper>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <PasswordInputWrapper>
                    <PasswordInput
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                    />
                    <PasswordToggle type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </PasswordToggle>
                  </PasswordInputWrapper>
                  {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <CancelButton onClick={closeModal}>Cancel</CancelButton>
                <SaveButton onClick={handleSaveCredentials} disabled={!password || !confirmPassword}>
                  Save Credentials
                </SaveButton>
              </ModalFooter>
            </ModalContainer>
          </ModalOverlay>
        )}
      </PageContainer>
    </>
  )
}

export default EmployeeList
