"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Users, Briefcase, Search, Filter, RefreshCw, Plus, Edit, Eye } from "lucide-react"
import styled, { createGlobalStyle, keyframes } from "styled-components"
import { theme } from "./colors"

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, ${theme.colors.secondary.light} 0%, ${theme.colors.neutral[50]} 100%);
  }
`

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// Styled Components
const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;
`

const Content = styled.div`
  padding: 2rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  animation: ${slideIn} 0.6s ease-out;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    justify-content: flex-end;
  }
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${theme.colors.primary.gradient};
  color: ${theme.colors.white};
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${theme.shadows.md};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.secondary {
    background: ${theme.colors.neutral[600]};
    
    &:hover {
      background: ${theme.colors.neutral[700]};
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`

const TabContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: 16px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.neutral[200]};
`

const TabList = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Tab = styled.button`
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => (props.active ? theme.colors.white : theme.colors.neutral[600])};
  background: ${(props) => (props.active ? theme.colors.primary.gradient : "transparent")};
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover:before {
    left: 100%;
  }
  
  &:hover {
    color: ${(props) => (props.active ? theme.colors.white : theme.colors.neutral[800])};
    background: ${(props) => (props.active ? theme.colors.primary.gradient : theme.colors.secondary.light)};
  }
  
  .tab-icon {
    transition: transform 0.3s ease;
  }
  
  &:hover .tab-icon {
    transform: scale(1.1);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
  }
`

const SearchAndFilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const SearchContainer = styled.div`
  flex: 1;
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${theme.colors.neutral[200]};
  border-radius: 12px;
  font-size: 0.875rem;
  background: ${theme.colors.white};
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.sm};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 4px rgba(243, 135, 90, 0.1), ${theme.shadows.md};
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${theme.colors.neutral[300]};
  }
  
  &::placeholder {
    color: ${theme.colors.neutral[400]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
    font-size: 0.8rem;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.neutral[500]};
  transition: color 0.3s ease;
  
  ${SearchInput}:focus + & {
    color: ${theme.colors.primary.main};
  }
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.neutral[200]};
  border-radius: 12px;
  color: ${theme.colors.neutral[600]};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.sm};
  
  &:hover {
    border-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.main};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
  }
`

const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: 20px;
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
  border: 1px solid ${theme.colors.neutral[200]};
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.6s ease-out 0.2s both;
`

const TableContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.neutral[100]};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.gradient};
    border-radius: 4px;
    
    &:hover {
      background: ${theme.colors.primary.gradientReverse};
    }
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`

const Th = styled.th`
  padding: 1.5rem 2rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${theme.colors.neutral[600]};
  background: linear-gradient(135deg, ${theme.colors.secondary.light}, ${theme.colors.neutral[50]});
  border-bottom: 2px solid ${theme.colors.neutral[200]};
  position: sticky;
  top: 0;
  z-index: 10;
  
  &:first-child {
    border-top-left-radius: 20px;
  }
  
  &:last-child {
    border-top-right-radius: 20px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem;
    font-size: 0.7rem;
  }
`

const Td = styled.td`
  padding: 1.5rem 2rem;
  font-size: 0.875rem;
  color: ${theme.colors.neutral[800]};
  border-bottom: 1px solid ${theme.colors.neutral[100]};
  transition: all 0.3s ease;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem;
    font-size: 0.8rem;
  }
`

const Tr = styled.tr`
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, rgba(243, 135, 90, 0.02), rgba(240, 87, 82, 0.02));
    transform: scale(1.001);
  }
  
  &:hover ${Td} {
    color: ${theme.colors.neutral[900]};
  }
`

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  
  ${(props) =>
    props.active
      ? `
    background: linear-gradient(135deg, ${theme.colors.success.light}, #bbf7d0);
    color: ${theme.colors.success.dark};
    border: 1px solid ${theme.colors.success.main};
    
    &:before {
      content: '';
      width: 6px;
      height: 6px;
      background: ${theme.colors.success.main};
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `
      : `
    background: linear-gradient(135deg, ${theme.colors.error.light}, #fecaca);
    color: ${theme.colors.error.dark};
    border: 1px solid ${theme.colors.error.main};
    
    &:before {
      content: '';
      width: 6px;
      height: 6px;
      background: ${theme.colors.error.main};
      border-radius: 50%;
    }
  `}
`

// Enhanced Toggle Switch
const ToggleWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => (props.active ? theme.colors.success.main : theme.colors.error.main)};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 32px;
  box-shadow: ${(props) =>
    props.active ? `0 4px 12px ${theme.colors.success.main}30` : `0 4px 12px ${theme.colors.error.main}30`};

  &:before {
    position: absolute;
    content: "";
    height: 28px;
    width: 28px;
    left: 2px;
    bottom: 2px;
    background: ${theme.colors.white};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 50%;
    box-shadow: ${theme.shadows.md};
    transform: ${(props) => (props.active ? "translateX(28px)" : "translateX(0)")};
  }

  &:hover {
    box-shadow: ${(props) =>
      props.active ? `0 6px 16px ${theme.colors.success.main}40` : `0 6px 16px ${theme.colors.error.main}40`};
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.view {
    background: ${theme.colors.primary.gradient};
    color: ${theme.colors.white};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
    }
  }
  
  &.edit {
    background: ${theme.colors.warning.main};
    color: ${theme.colors.white};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${theme.colors.warning.main}30;
    }
  }
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.neutral[200]};
  border-radius: 50%;
  border-top-color: ${theme.colors.primary.main};
  animation: ${spin} 1s ease-in-out infinite;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: ${theme.colors.neutral[500]};
  
  .empty-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  .empty-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${theme.colors.neutral[700]};
  }
  
  .empty-description {
    font-size: 0.875rem;
    max-width: 400px;
  }
`

function Admin() {
  const [activeTab, setActiveTab] = useState("departments")
  const [departments, setDepartments] = useState([])
  const [designations, setDesignations] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  const apiRequest = async (url, method = "GET", data = null, headers = {}) => {
    try {
      const branch_code = localStorage.getItem("selected_branch")
      const token = localStorage.getItem("access_token")

      const defaultHeaders = {
        "Content-Type": "application/json",
        Authorization: token,
        "branch-code": branch_code || "",
      }

      const config = {
        method,
        url,
        headers: { ...defaultHeaders, ...headers },
        validateStatus: () => true,
      }

      if (data && (method === "POST" || method === "PUT")) {
        config.data = data
      }

      const response = await axios(config)

      if (response.status === 200) {
        return { success: true, data: response.data }
      } else if (response.status === 400) {
        return { success: false, error: "Invalid data sent to server.", status: 400, data: response.data }
      } else if (response.status === 401) {
        return { success: false, error: "Session expired. Please log in again.", status: 401, data: response.data }
      } else {
        return {
          success: false,
          error: "Something went wrong. Try again.",
          status: response.status,
          data: response.data,
        }
      }
    } catch (error) {
      console.error("Network or unexpected error:", error)
      return { success: false, error: "Network error or unexpected issue occurred.", networkError: true }
    }
  }

  const GlobalBaseUrl = import.meta.env.VITE_BACKEND_GLOBAL_BASE_URL

  const fetchData = async () => {
    setIsRefreshing(true)

    const fetchDepartments = async () => {
      const result = await apiRequest(GlobalBaseUrl + "get_data_departments/")
      if (result.success) {
        setDepartments(result.data.departments)
      } else {
        console.error("Error fetching departments:", result.error)
      }
    }

    const fetchDesignations = async () => {
      const result = await apiRequest(GlobalBaseUrl + "get_data_designation/")
      if (result.success) {
        setDesignations(result.data.designations)
      } else {
        console.error("Error fetching designations:", result.error)
      }
    }

    await Promise.all([fetchDepartments(), fetchDesignations()])
    setIsRefreshing(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleStatusToggle = async (item, type) => {
    const id = type === "department" ? item.department_code : item.Designation_code
    if (loading[id]) return

    setLoading((prev) => ({ ...prev, [id]: true }))

    try {
      const endpoint =
        type === "department" ? `${GlobalBaseUrl}update_department/${id}/` : `${GlobalBaseUrl}update_designation/${id}/`

      const result = await apiRequest(endpoint, "PUT", {
        is_active: !item.is_active,
      })

      if (result.success) {
        const updatedStatus = result.data.new_status
        if (type === "department") {
          setDepartments(
            departments.map((dept) => (dept.department_code === id ? { ...dept, is_active: updatedStatus } : dept)),
          )
        } else {
          setDesignations(
            designations.map((desig) =>
              desig.Designation_code === id ? { ...desig, is_active: updatedStatus } : desig,
            ),
          )
        }
      } else {
        if (result.status === 400) {
          alert("Invalid data sent to server.")
        } else if (result.status === 401) {
          alert("Session expired. Please log in again.")
        } else {
          alert("Something went wrong. Try again.")
        }
      }
    } catch (error) {
      console.error("Network or unexpected error:", error)
      alert("Network error or unexpected issue occurred.")
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }))
    }
  }

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.department_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.department_code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredDesignations = designations.filter(
    (desig) =>
      desig.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desig.Designation_code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentData = activeTab === "departments" ? filteredDepartments : filteredDesignations

  return (
    <>
      <GlobalStyle />
      <Container>
        <Content>
          <Header>
            <Title>Admin Dashboard</Title>
          </Header>

          <TabContainer>
            <TabList>
              <Tab active={activeTab === "departments"} onClick={() => setActiveTab("departments")}>
                <Users size={20} className="tab-icon" />
                Departments
              </Tab>
              <Tab active={activeTab === "designations"} onClick={() => setActiveTab("designations")}>
                <Briefcase size={20} className="tab-icon" />
                Designations
              </Tab>
            </TabList>
          </TabContainer>

          <SearchAndFilterContainer>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon>
                <Search size={20} />
              </SearchIcon>
            </SearchContainer>

          </SearchAndFilterContainer>

          <Card>
            <TableContainer>
              {currentData.length === 0 ? (
                <EmptyState>
                  <div className="empty-icon">
                    {activeTab === "departments" ? <Users size={64} /> : <Briefcase size={64} />}
                  </div>
                  <div className="empty-title">No {activeTab} found</div>
                  <div className="empty-description">
                    {searchTerm
                      ? `No ${activeTab} match your search criteria. Try adjusting your search terms.`
                      : `No ${activeTab} have been added yet. Click "Add New" to get started.`}
                  </div>
                </EmptyState>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <Th>Code</Th>
                      <Th>{activeTab === "departments" ? "Name" : "Designation"}</Th>
                      <Th>Status</Th>
                      <Th>Description</Th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === "departments"
                      ? filteredDepartments.map((dept) => (
                          <Tr key={dept.department_code}>
                            <Td>{dept.department_code}</Td>
                            <Td>{dept.department_name}</Td>
                            <Td>
                              <StatusBadge active={dept.is_active}>
                                {dept.is_active ? "Active" : "Inactive"}
                              </StatusBadge>
                            </Td>
                            <Td>{dept.description}</Td>
                            <Td>
                              <ActionButtons>
                               
                                <ToggleWrapper>
                                  <ToggleInput
                                    type="checkbox"
                                    checked={dept.is_active}
                                    onChange={() => handleStatusToggle(dept, "department")}
                                    disabled={loading[dept.department_code]}
                                  />
                                  <ToggleSlider active={dept.is_active} />
                                </ToggleWrapper>
                              </ActionButtons>
                            </Td>
                          </Tr>
                        ))
                      : filteredDesignations.map((desig) => (
                          <Tr key={desig.Designation_code}>
                            <Td>{desig.Designation_code}</Td>
                            <Td>{desig.designation}</Td>
                            <Td>
                              <StatusBadge active={desig.is_active}>
                                {desig.is_active ? "Active" : "Inactive"}
                              </StatusBadge>
                            </Td>
                            <Td>{desig.description}</Td>

                            <Td>
                              <ActionButtons>
                                <ToggleWrapper>
                                  <ToggleInput
                                    type="checkbox"
                                    checked={desig.is_active}
                                    onChange={() => handleStatusToggle(desig, "designation")}
                                    disabled={loading[desig.Designation_code]}
                                  />
                                  <ToggleSlider active={desig.is_active} />
                                </ToggleWrapper>
                              </ActionButtons>
                            </Td>
                          </Tr>
                        ))}
                  </tbody>
                </Table>
              )}
            </TableContainer>
          </Card>
        </Content>
      </Container>
    </>
  )
}

export default Admin
