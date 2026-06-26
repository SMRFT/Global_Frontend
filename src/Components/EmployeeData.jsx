"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Eye,
  Edit,
  Plus,
  ArrowLeft,
  FileText,
  ExternalLink,
  User,
  Phone,
  Mail,
  Building,
  Award,
  GraduationCap,
  Briefcase,
  UserX,
  UserCheck,
} from "lucide-react"
import styled from "styled-components"
import { theme } from "./colors"
import Profile from "./profile"

// Enhanced styled components
export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background.secondary};
  min-height: 100vh;
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border.main};
`

export const Title = styled.h1`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize["2xl"]};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0;
`

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.primary.main};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animation.normal} ${theme.animation.easing.ease};
  &:hover {
    background: ${theme.colors.primary.dark};
    transform: translateY(-1px);
  }
`

export const FilterSection = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;
  align-items: center;
  background: ${theme.colors.white};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border.main};
`

export const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
  }
`

export const Select = styled.select`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  background: ${theme.colors.white};
  cursor: pointer;
`

export const TableContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border.main};
  overflow: hidden;
  margin-bottom: ${theme.spacing.xl};
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`

export const Th = styled.th`
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.tertiary};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${theme.colors.border.main};
`

export const Td = styled.td`
  padding: ${theme.spacing.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  border-bottom: 1px solid ${theme.colors.border.light};
  vertical-align: middle;
`

export const Tr = styled.tr`
  transition: background ${theme.animation.fast};
  &:hover {
    background: ${theme.colors.neutral[50]};
  }
  &:last-child td {
    border-bottom: none;
  }
`

export const AvatarCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary.main};
  font-weight: ${theme.typography.fontWeight.bold};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const NameText = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`

export const IdText = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.tertiary};
`

export const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
`

export const IconButton = styled.button`
  background: ${(props) => (props.variant === "view" ? theme.colors.background.tertiary : theme.colors.background.tertiary)};
  color: ${(props) => (props.variant === "view" ? theme.colors.primary.main : theme.colors.warning.dark)};
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  cursor: pointer;
  transition: all ${theme.animation.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  &:hover {
    background: ${theme.colors.border.light};
    border-color: ${theme.colors.border.dark};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`


export const StatusBadge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${(props) => {
    switch (props.status) {
      case "full-time":
        return theme.colors.success.light
      case "part-time":
        return theme.colors.warning.light
      case "contract":
        return theme.colors.info.light
      default:
        return theme.colors.neutral[100]
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "full-time":
        return theme.colors.success.dark
      case "part-time":
        return theme.colors.warning.dark
      case "contract":
        return theme.colors.info.dark
      default:
        return theme.colors.neutral[600]
    }
  }};
`

// Enhanced Modal Components
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${theme.zIndex.modal};
  padding: ${theme.spacing.md};
  backdrop-filter: blur(4px);
`

export const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  max-width: 1200px;
  max-height: 95vh;
  overflow-y: auto;
  width: 100%;
  box-shadow: ${theme.shadows.xl};
  position: relative;
`

export const ModalHeader = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl} ${theme.borderRadius.xl} 0 0;
  color: ${theme.colors.text.primary};
  position: relative;
  border-bottom: 1px solid ${theme.colors.border.main};
`

export const ModalTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0;
  text-align: center;
`

export const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.xl};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.animation.fast};
  &:hover {
    background: ${theme.colors.neutral[100]};
    color: ${theme.colors.text.primary};
  }
`


export const ModalBody = styled.div`
  padding: ${theme.spacing.xl};
`

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg};
`

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid ${theme.colors.white};
  box-shadow: ${theme.shadows.lg};
  margin-bottom: ${theme.spacing.md};
`

export const ProfileImagePlaceholder = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${theme.colors.neutral[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize["2xl"]};
  border: 6px solid ${theme.colors.white};
  box-shadow: ${theme.shadows.lg};
  margin-bottom: ${theme.spacing.md};
`

export const ProfileName = styled.h3`
  font-size: ${theme.typography.fontSize["2xl"]};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.xs} 0;
  text-align: center;
`

export const ProfileRole = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.primary.main};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0 0 ${theme.spacing.sm} 0;
  text-align: center;
`

export const ProfileId = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
  margin: 0;
  text-align: center;
`

// Enhanced Detail Sections
export const DetailTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.border.light};
  overflow-x: auto;
`

export const TabButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  background: none;
  color: ${(props) => (props.active ? theme.colors.primary.main : theme.colors.text.secondary)};
  font-weight: ${(props) => (props.active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium)};
  border-bottom: 2px solid ${(props) => (props.active ? theme.colors.primary.main : "transparent")};
  cursor: pointer;
  transition: all ${theme.animation.normal} ${theme.animation.easing.ease};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  &:hover {
    color: ${theme.colors.primary.main};
  }
`

export const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
`

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`

export const DetailSection = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border.light};
  box-shadow: ${theme.shadows.sm};
`

export const SectionTitle = styled.h4`
  color: ${theme.colors.primary.main};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0 0 ${theme.spacing.md} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.primary.light};
  padding-bottom: ${theme.spacing.xs};
`

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing.md};
  &:last-child {
    margin-bottom: 0;
  }
`

export const InfoLabel = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${theme.spacing.xs};
`

export const InfoValue = styled.span`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
`

// File Components
export const FileLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primary.light};
  color: ${theme.colors.primary.dark};
  text-decoration: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all ${theme.animation.normal} ${theme.animation.easing.ease};
  max-width: fit-content;
  &:hover {
    background: ${theme.colors.primary.main};
    color: ${theme.colors.white};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.sm};
  }
`

export const NoFileText = styled.span`
  color: ${theme.colors.text.tertiary};
  font-style: italic;
  font-size: ${theme.typography.fontSize.xs};
`

export const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
`

// Loading and Error Components
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.secondary};
`

export const ErrorMessage = styled.div`
  background: ${theme.colors.error.light};
  color: ${theme.colors.error.dark};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  margin: ${theme.spacing.lg} 0;
`

// Edit Mode Components
export const EditContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.white};
  z-index: ${theme.zIndex.modal};
  overflow-y: auto;
`

export const EditHeader = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border.main};
  position: sticky;
  top: 0;
  z-index: 10;
`


export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.white};
  color: ${theme.colors.primary.main};
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.borderRadius.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animation.fast};
  &:hover {
    background: ${theme.colors.neutral[50]};
  }
`

// Add these to your styled-components definition section

export const StatusRadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border.light};
  margin-top: ${theme.spacing.sm};
  justify-content: center;
`

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${(props) => (props.checked ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium)};
  color: ${(props) => {
    if (props.disabled) return theme.colors.text.tertiary;
    if (props.checked) {
      return props.value === "active" ? theme.colors.success.dark : theme.colors.error.dark;
    }
    return theme.colors.text.secondary;
  }};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => !props.disabled && theme.colors.text.primary};
  }
`

export const RadioInput = styled.input`
  accent-color: ${(props) => (props.value === "active" ? theme.colors.success.main : theme.colors.error.main)};
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin: 0;

  &:disabled {
    cursor: not-allowed;
  }
`

// --- Toggle Switch Components ---

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.xs};
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border.light};
`

export const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`

export const HiddenCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`
// --- Add these new components for Toast ---
const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ToastMessage = styled.div`
  background: ${(props) => (props.type === "success" ? theme.colors.success.main : theme.colors.error.main)};
  color: white;
  padding: 12px 24px;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideIn 0.3s ease-out forwards;
  min-width: 300px;

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`

// --- UPDATE Existing Slider Component ---
export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Default (Inactive) is now Red instead of Grey */
  background-color: ${(props) => (props.disabled ? theme.colors.neutral[300] : theme.colors.error.main)};
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  /* Checked State (Active) remains Green */
  ${HiddenCheckbox}:checked + & {
    background-color: ${theme.colors.success.main};
  }

  ${HiddenCheckbox}:checked + &:before {
    transform: translateX(20px);
  }
  
  ${(props) => props.disabled && `
    cursor: not-allowed;
    opacity: 0.6;
  `}
`

// --- UPDATE StatusText to handle Red color ---
export const StatusText = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  min-width: 60px;
  color: ${(props) => (props.active ? theme.colors.success.dark : theme.colors.error.dark)};
`

// File Link Component
const FileLinkComponent = ({ fileId, fileName, label }) => {
  const GlobalBaseUrl = import.meta.env.VITE_BACKEND_GLOBAL_BASE_URL

  if (!fileId) {
    return <NoFileText>No {label.toLowerCase()} uploaded</NoFileText>
  }

  const fileUrl = `${GlobalBaseUrl}serve_file/${fileId}/`

  const handleFileClick = (e) => {
    e.preventDefault()
    window.open(fileUrl, "_blank")
  }

  return (
    <FileLink href={fileUrl} onClick={handleFileClick} target="_blank" rel="noopener noreferrer">
      <FileText size={14} />
      {fileName || `View ${label}`}
      <ExternalLink size={12} />
    </FileLink>
  )
}

// Enhanced Experience Component
const ExperienceItem = ({ experience, index }) => (
  <DetailSection key={index}>
    <SectionTitle>
      <Briefcase size={18} />
      Experience {index + 1}
    </SectionTitle>
    <InfoItem>
      <InfoLabel>Company</InfoLabel>
      <InfoValue>{experience.company || "N/A"}</InfoValue>
    </InfoItem>
    <InfoItem>
      <InfoLabel>Position</InfoLabel>
      <InfoValue>{experience.position || "N/A"}</InfoValue>
    </InfoItem>
    <InfoItem>
      <InfoLabel>Years of Experience</InfoLabel>
      <InfoValue>{experience.yearsOfExperience || "N/A"}</InfoValue>
    </InfoItem>
    <InfoItem>
      <InfoLabel>Salary</InfoLabel>
      <InfoValue>{experience.salary ? `₹${experience.salary}` : "N/A"}</InfoValue>
    </InfoItem>
    <InfoItem>
      <InfoLabel>Documents</InfoLabel>
      <FileGrid>
        <FileLinkComponent
          fileId={experience.certificateFileId}
          fileName="Experience Certificate"
          label="Experience Certificate"
        />
        <FileLinkComponent
          fileId={experience.salaryCertificateFileId}
          fileName="Salary Certificate"
          label="Salary Certificate"
        />
      </FileGrid>
    </InfoItem>
  </DetailSection>
)

// Enhanced Qualification Component
const QualificationItem = ({ qualification, index }) => (
  <DetailSection key={index}>
    <SectionTitle>
      <GraduationCap size={18} />
      Qualification {index + 1}
    </SectionTitle>
    <InfoItem>
      <InfoLabel>Degree</InfoLabel>
      <InfoValue>{qualification.degree || "N/A"}</InfoValue>
    </InfoItem>
    <InfoItem>
      <InfoLabel>Institution</InfoLabel>
      <InfoValue>{qualification.institution || "N/A"}</InfoValue>
    </InfoItem>
    <InfoItem>
      <InfoLabel>Passed Out</InfoLabel>
      <InfoValue>{qualification.passedOut || "N/A"}</InfoValue>
    </InfoItem>
    <InfoItem>
      <InfoLabel>Percentage</InfoLabel>
      <InfoValue>{qualification.percentage ? `${qualification.percentage}%` : "N/A"}</InfoValue>
    </InfoItem>
    <InfoItem>
      <InfoLabel>Certificate</InfoLabel>
      <FileLinkComponent
        fileId={qualification.certificateFileId}
        fileName="Educational Certificate"
        label="Educational Certificate"
      />
    </InfoItem>
  </DetailSection>
)

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [fetchingEmployee, setFetchingEmployee] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const [updatingStatusId, setUpdatingStatusId] = useState(null)

  // 1. Add Toast State
  const [toast, setToast] = useState(null) // { message, type }

  // 2. Add Toast Helper
  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000) // Auto-hide after 3 seconds
  }

  const GlobalBaseUrl = import.meta.env.VITE_BACKEND_GLOBAL_BASE_URL

  // Fetch employees data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)

        const token = localStorage.getItem("access_token") // Or sessionStorage
        const branchCode = localStorage.getItem("selected_branch")

        const response = await fetch(GlobalBaseUrl + "get_employees_with_labels/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            "Branch-Code": branchCode,
          },
        })

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong.")
        }

        setEmployees(data.employees || [])
        setError(null)
      } catch (err) {
        setError("Failed to fetch employee data. Please try again.")
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])


  // Fetch individual employee data by ID
  const fetchEmployeeById = async (employeeId) => {
    try {
      setFetchingEmployee(true)

      const token = localStorage.getItem("access_token")
      const branchCode = localStorage.getItem("selected_branch")

      const response = await fetch(`${GlobalBaseUrl}get_employee_by_id/${employeeId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          "Branch-Code": branchCode,
        },
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch employee details.")
      }

      return data.employee
    } catch (err) {
      console.error("Fetch employee by ID error:", err)
      setError("Failed to fetch employee details. Please try again.")
      return null
    } finally {
      setFetchingEmployee(false)
    }
  }

  // Update employee data

  // In EmployeeData.jsx

  const updateEmployee = async (employeeId, formData) => {
    try {
      setSaving(true);

      const token = localStorage.getItem("access_token");
      const branchCode = localStorage.getItem("selected_branch");

      const response = await fetch(`${GlobalBaseUrl}update_employee/${employeeId}/`, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Branch-Code": branchCode,
          // Do NOT set Content-Type for FormData
        },
        body: formData,
      });

      const data = await response.json();

      // ✅ FIX: Check for success:false and read 'details' (where your specific error lives)
      if (!response.ok || data.success === false) {
        // Prioritize 'details' because that's where the "get() returned 2" message is
        const errorText = data.details || data.error || data.message || "Failed to update employee.";
        throw new Error(errorText);
      }

      // Success case
      alert("Employee updated successfully!");
      window.location.reload();

      return data;
    } catch (err) {
      console.error("Update employee error:", err);
      // Throw the error so Profile.jsx can catch it
      throw err;
    } finally {
      setSaving(false);
    }
  };
  // Get unique departments for filter
  const departments = useMemo(() => {
    const deptSet = new Set(employees.map((emp) => emp.department_name).filter(Boolean))
    return Array.from(deptSet).sort()
  }, [employees])

  // Filter employees based on search and department
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = !selectedDepartment || employee.department_name === selectedDepartment
      return matchesSearch && matchesDepartment
    })
  }, [employees, searchTerm, selectedDepartment])

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee)
    setIsModalOpen(true)
    setEditMode(false)
    setActiveTab("personal")
  }

  const handleEdit = async (employee) => {
    try {
      const fullEmployeeData = await fetchEmployeeById(employee.employeeId)
      if (fullEmployeeData) {
        setSelectedEmployee(fullEmployeeData)
        setEditMode(true)
        setIsCreating(false)
      }
    } catch (err) {
      console.error("Error preparing edit mode:", err)
      setError("Failed to load employee data for editing.")
    }
  }

  const handleCreate = () => {
    setSelectedEmployee(null)
    setEditMode(true)
    setIsCreating(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEmployee(null)
    setEditMode(false)
    setIsCreating(false)
  }

  const handleBackFromEdit = () => {
    setEditMode(false)
    setIsCreating(false)
    setSelectedEmployee(null)
  }

  // NEW: Handle Deactivate Logic
  // 3. Update Status Handler to use Toast
  const handleStatusUpdate = async (employeeId, newIsActiveStatus) => {
    // Determine labels
    const actionLabel = newIsActiveStatus ? "reactivate" : "deactivate"

    // Optional: Keep confirm dialog or remove it for smoother toggle action
    // if (!window.confirm(`Are you sure you want to ${actionLabel} this employee?`)) return;

    try {
      setUpdatingStatusId(employeeId)
      const token = localStorage.getItem("access_token")
      const branchCode = localStorage.getItem("selected_branch")

      const response = await fetch(`${GlobalBaseUrl}UpdateUserStatus-user/${employeeId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          "Branch-Code": branchCode,
        },
        body: JSON.stringify({
          is_active: newIsActiveStatus,
          employment_status: newIsActiveStatus ? "Active" : "Inactive"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.details || `Failed to ${actionLabel} employee.`)
      }

      // ✅ SUCCESS: Show Toast instead of Alert
      showToast(`Employee ${actionLabel}d successfully!`, "success")

      setEmployees((prev) =>
        prev.map((emp) => {
          if (emp.employeeId === employeeId) {
            return {
              ...emp,
              is_active: newIsActiveStatus,
              employmentStatus: newIsActiveStatus ? "Active" : "Inactive"
            }
          }
          return emp
        })
      )

    } catch (err) {
      console.error(`${actionLabel} error:`, err)
      // ❌ ERROR: Show Toast
      showToast(err.message || "An error occurred", "error")
    } finally {
      setUpdatingStatusId(null)
    }
  }

  const handleSaveSuccess = async (savedEmployee) => {
    try {
      if (isCreating) {
        setEmployees((prev) => [savedEmployee, ...prev])
      } else {
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.employeeId === savedEmployee.employeeId
              ? {
                ...emp,
                ...savedEmployee,
                department_name: savedEmployee.department_name || emp.department_name,
                designation_name: savedEmployee.designation_name || emp.designation_name,
                primary_role_name: savedEmployee.primary_role_name || emp.primary_role_name,
                additional_role_names: savedEmployee.additional_role_names || emp.additional_role_names,
                data_entitlement_names: savedEmployee.data_entitlement_names || emp.data_entitlement_names,
              }
              : emp,
          ),
        )
      }
      handleBackFromEdit()
    } catch (err) {
      console.error("Error handling save success:", err)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return "Invalid Date"
    }
  }

  // Show edit mode (full screen)
  if (editMode) {
    return (
      <EditContainer>
        <EditHeader>
          <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.lg }}>
            <BackButton onClick={handleBackFromEdit}>
              <ArrowLeft size={18} />
              Back to List
            </BackButton>
            <ModalTitle style={{ color: theme.colors.white, margin: 0 }}>
              {isCreating ? "Create New Employee" : `Edit Employee - ${selectedEmployee?.employeeName}`}
            </ModalTitle>
          </div>
          {fetchingEmployee && (
            <div style={{ color: theme.colors.white, fontSize: theme.typography.fontSize.sm }}>
              Loading employee data...
            </div>
          )}
        </EditHeader>
        <Profile
          employeeData={selectedEmployee}
          isEditing={!isCreating}
          onSaveSuccess={handleSaveSuccess}
          onCancel={handleBackFromEdit}
          updateEmployee={updateEmployee}
          saving={saving}
        />
      </EditContainer>
    )
  }

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading employees...</LoadingSpinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    )
  }

  return (
    <Container>
      {/* 4. Render Toast Component at the top level */}
      {toast && (
        <ToastContainer>
          <ToastMessage type={toast.type}>
            {toast.type === "success" ? <UserCheck size={18} /> : <UserX size={18} />}
            {toast.message}
          </ToastMessage>
        </ToastContainer>
      )}

      <Header>
        <Title>Employee Management System</Title>
        <AddButton onClick={handleCreate}>
          <Plus size={20} />
          Add New Employee
        </AddButton>
      </Header>

      <FilterSection>
        <SearchInput
          type="text"
          placeholder="Search by name, ID, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </Select>
      </FilterSection>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Employee</Th>
              <Th>Designation & Dept</Th>
              <Th>Contact Information</Th>
              <Th>Employment</Th>
              <Th>Status</Th>
              <Th style={{ textAlign: "right" }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => {
              const isActive = employee.is_active
              const isUpdating = updatingStatusId === employee.employeeId

              return (
                <Tr key={employee.employeeId}>
                  <Td>
                    <AvatarCell>
                      <Avatar>
                        {employee.profileImage ? (
                          <img
                            src={`${GlobalBaseUrl}serve_file/${employee.profileImage}/`}
                            alt={employee.employeeName}
                            onError={(e) => {
                              e.target.style.display = "none"
                            }}
                          />
                        ) : (
                          <User size={20} />
                        )}
                      </Avatar>
                      <div>
                        <NameText>{employee.employeeName}</NameText>
                        <IdText>ID: {employee.employeeId}</IdText>
                      </div>
                    </AvatarCell>
                  </Td>
                  <Td>
                    <div style={{ fontWeight: theme.typography.fontWeight.medium }}>{employee.designation_name || "N/A"}</div>
                    <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary }}>
                      {employee.department_name || "N/A"}
                    </div>
                  </Td>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Mail size={12} color={theme.colors.text.tertiary} />
                      <span>{employee.email || "N/A"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Phone size={12} color={theme.colors.text.tertiary} />
                      <span>{employee.mobileNumber || "N/A"}</span>
                    </div>
                  </Td>
                  <Td>
                    <StatusBadge status={employee.employmentStatus}>
                      {employee.employmentStatus || "N/A"}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm }}>
                      <SwitchLabel>
                        <HiddenCheckbox
                          type="checkbox"
                          checked={isActive}
                          disabled={isUpdating}
                          onChange={(e) => handleStatusUpdate(employee.employeeId, e.target.checked)}
                        />
                        <Slider disabled={isUpdating} />
                      </SwitchLabel>
                      <StatusText active={isActive} style={{ fontSize: "11px", minWidth: "50px" }}>
                        {isUpdating ? "..." : isActive ? "Active" : "Inactive"}
                      </StatusText>
                    </div>
                  </Td>
                  <Td style={{ textAlign: "right" }}>
                    <ActionButtons style={{ justifyContent: "flex-end" }}>
                      <IconButton variant="view" onClick={() => handleViewDetails(employee)} title="View Details">
                        <Eye size={14} />
                      </IconButton>
                      <IconButton
                        variant="edit"
                        onClick={() => handleEdit(employee)}
                        disabled={fetchingEmployee}
                        title="Edit Employee"
                      >
                        <Edit size={14} />
                      </IconButton>
                    </ActionButtons>
                  </Td>
                </Tr>
              )
            })}
          </tbody>
        </Table>
      </TableContainer>

      {filteredEmployees.length === 0 && <ErrorMessage>No employees found matching your search criteria.</ErrorMessage>}

      {/* Enhanced Modal for viewing employee details */}
      {isModalOpen && selectedEmployee && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Employee Profile</ModalTitle>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>

            <ModalBody>
              {/* Profile Section */}
              <ProfileSection>
                {selectedEmployee.profileImage ? (
                  <ProfileImage
                    src={`${GlobalBaseUrl}serve_file/${selectedEmployee.profileImage}/`}
                    alt={`${selectedEmployee.employeeName} Profile`}
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.nextSibling.style.display = "flex"
                    }}
                  />
                ) : (
                  <ProfileImagePlaceholder>
                    <User size={48} />
                  </ProfileImagePlaceholder>
                )}
                <ProfileName>{selectedEmployee.employeeName}</ProfileName>
                <ProfileRole>{selectedEmployee.designation_name || "N/A"}</ProfileRole>
                <ProfileId>Employee ID: {selectedEmployee.employeeId}</ProfileId>
                {selectedEmployee.profileImage && (
                  <div style={{ marginTop: theme.spacing.sm }}>
                    <FileLinkComponent
                      fileId={selectedEmployee.profileImage}
                      fileName="Download Profile Image"
                      label="Profile Image"
                    />
                  </div>
                )}
              </ProfileSection>

              {/* Tab Navigation */}
              <DetailTabs>
                <TabButton active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
                  <User size={16} />
                  Personal
                </TabButton>
                <TabButton active={activeTab === "professional"} onClick={() => setActiveTab("professional")}>
                  <Building size={16} />
                  Professional
                </TabButton>
                <TabButton active={activeTab === "documents"} onClick={() => setActiveTab("documents")}>
                  <FileText size={16} />
                  Documents
                </TabButton>
                <TabButton active={activeTab === "experience"} onClick={() => setActiveTab("experience")}>
                  <Briefcase size={16} />
                  Experience
                </TabButton>
                <TabButton active={activeTab === "education"} onClick={() => setActiveTab("education")}>
                  <GraduationCap size={16} />
                  Education
                </TabButton>
              </DetailTabs>

              {/* Personal Information Tab */}
              <TabContent active={activeTab === "personal"}>
                <DetailGrid>
                  <DetailSection>
                    <SectionTitle>
                      <User size={18} />
                      Personal Information
                    </SectionTitle>
                    <InfoItem>
                      <InfoLabel>Full Name</InfoLabel>
                      <InfoValue>{selectedEmployee.employeeName}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Father's Name</InfoLabel>
                      <InfoValue>{selectedEmployee.fatherName || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Mother's Name</InfoLabel>
                      <InfoValue>{selectedEmployee.motherName || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Gender</InfoLabel>
                      <InfoValue>{selectedEmployee.gender || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Date of Birth</InfoLabel>
                      <InfoValue>{formatDate(selectedEmployee.dateOfBirth)}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Blood Group</InfoLabel>
                      <InfoValue>{selectedEmployee.bloodGroup || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Marital Status</InfoLabel>
                      <InfoValue>{selectedEmployee.maritalStatus || "N/A"}</InfoValue>
                    </InfoItem>
                  </DetailSection>

                  <DetailSection>
                    <SectionTitle>
                      <Phone size={18} />
                      Contact Information
                    </SectionTitle>
                    <InfoItem>
                      <InfoLabel>Email</InfoLabel>
                      <InfoValue>{selectedEmployee.email || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Mobile Number</InfoLabel>
                      <InfoValue>{selectedEmployee.mobileNumber || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Guardian Number</InfoLabel>
                      <InfoValue>{selectedEmployee.guardianNumber || "N/A"}</InfoValue>
                    </InfoItem>
                  </DetailSection>

                  <DetailSection>
                    <SectionTitle>
                      <User size={18} />
                      Family Details
                    </SectionTitle>
                    <InfoItem>
                      <InfoLabel>Father's Aadhaar</InfoLabel>
                      <InfoValue>{selectedEmployee.familyDetails?.fatherAadhaar || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Father's DOB</InfoLabel>
                      <InfoValue>{formatDate(selectedEmployee.familyDetails?.fatherDob)}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Mother's Aadhaar</InfoLabel>
                      <InfoValue>{selectedEmployee.familyDetails?.motherAadhaar || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Mother's DOB</InfoLabel>
                      <InfoValue>{formatDate(selectedEmployee.familyDetails?.motherDob)}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Family Documents</InfoLabel>
                      <FileGrid>
                        <FileLinkComponent
                          fileId={selectedEmployee.familyDetails?.fatherAadhaarFileId}
                          fileName="Father's Aadhaar"
                          label="Father's Aadhaar Document"
                        />
                        <FileLinkComponent
                          fileId={selectedEmployee.familyDetails?.motherAadhaarFileId}
                          fileName="Mother's Aadhaar"
                          label="Mother's Aadhaar Document"
                        />
                      </FileGrid>
                    </InfoItem>

                    <SectionTitle>
                      <FileText size={18} />
                      Signature
                    </SectionTitle>

                    <InfoItem>
                      <InfoLabel>Signature</InfoLabel>
                      {selectedEmployee.signatureFileId ? (
                        <FileLinkComponent
                          fileId={selectedEmployee.signatureFileId}
                          fileName="Signature"
                          label="Signature"
                        />
                      ) : (
                        <NoFileText>No signature uploaded</NoFileText>
                      )}
                    </InfoItem>


                  </DetailSection>
                </DetailGrid>
              </TabContent>

              {/* Professional Information Tab */}
              <TabContent active={activeTab === "professional"}>
                <DetailGrid>
                  <DetailSection>
                    <SectionTitle>
                      <Building size={18} />
                      Professional Information
                    </SectionTitle>
                    <InfoItem>
                      <InfoLabel>Department</InfoLabel>
                      <InfoValue>{selectedEmployee.department_name || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Designation</InfoLabel>
                      <InfoValue>{selectedEmployee.designation_name || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Primary Role</InfoLabel>
                      <InfoValue>{selectedEmployee.primary_role_name || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Additional Roles</InfoLabel>
                      <InfoValue>{selectedEmployee.additional_role_names?.join(", ") || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Employment Status</InfoLabel>
                      <StatusBadge status={selectedEmployee.employmentStatus}>
                        {selectedEmployee.employmentStatus || "N/A"}
                      </StatusBadge>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Registration Number</InfoLabel>
                      <InfoValue>{selectedEmployee.registrationNumber || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Validity Date</InfoLabel>
                      <InfoValue>{formatDate(selectedEmployee.validityDate)}</InfoValue>
                    </InfoItem>
                  </DetailSection>

                  <DetailSection>
                    <SectionTitle>
                      <Award size={18} />
                      Salary Details
                    </SectionTitle>
                    <InfoItem>
                      <InfoLabel>Net Salary</InfoLabel>
                      <InfoValue>₹{selectedEmployee.salaryDetails?.netSalary || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Gross Salary</InfoLabel>
                      <InfoValue>₹{selectedEmployee.salaryDetails?.grossSalary || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>CTC</InfoLabel>
                      <InfoValue>₹{selectedEmployee.salaryDetails?.ctc || "N/A"}</InfoValue>
                    </InfoItem>
                  </DetailSection>

                  <DetailSection>
                    <SectionTitle>
                      <Building size={18} />
                      Bank Details
                    </SectionTitle>
                    <InfoItem>
                      <InfoLabel>Bank Name</InfoLabel>
                      <InfoValue>{selectedEmployee.bankDetails?.bankName || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Account Number</InfoLabel>
                      <InfoValue>{selectedEmployee.bankDetails?.accountNumber || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>IFSC Code</InfoLabel>
                      <InfoValue>{selectedEmployee.bankDetails?.ifscCode || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Branch</InfoLabel>
                      <InfoValue>{selectedEmployee.bankDetails?.branch || "N/A"}</InfoValue>
                    </InfoItem>
                  </DetailSection>

                  <DetailSection>
                    <SectionTitle>
                      <Award size={18} />
                      Data Entitlements
                    </SectionTitle>
                    <InfoItem>
                      <InfoLabel>Entitlements</InfoLabel>
                      <InfoValue>{selectedEmployee.data_entitlement_names?.join(", ") || "N/A"}</InfoValue>
                    </InfoItem>
                  </DetailSection>
                </DetailGrid>
              </TabContent>

              {/* Documents Tab */}
              <TabContent active={activeTab === "documents"}>
                <DetailGrid>
                  <DetailSection>
                    <SectionTitle>
                      <FileText size={18} />
                      KYC Documents
                    </SectionTitle>
                    <InfoItem>
                      <InfoLabel>Aadhaar Number</InfoLabel>
                      <InfoValue>{selectedEmployee.kycDetails?.aadhaarNumber || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>PAN Number</InfoLabel>
                      <InfoValue>{selectedEmployee.kycDetails?.panNumber || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>PAN Type</InfoLabel>
                      <InfoValue>{selectedEmployee.kycDetails?.panType || "N/A"}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>KYC Documents</InfoLabel>
                      <FileGrid>
                        <FileLinkComponent
                          fileId={selectedEmployee.kycDetails?.aadhaarFileId}
                          fileName="Aadhaar Card"
                          label="Aadhaar Document"
                        />
                        <FileLinkComponent
                          fileId={selectedEmployee.kycDetails?.panFileId}
                          fileName="PAN Card"
                          label="PAN Document"
                        />
                      </FileGrid>
                    </InfoItem>
                  </DetailSection>
                </DetailGrid>
              </TabContent>

              {/* Experience Tab */}
              <TabContent active={activeTab === "experience"}>
                {selectedEmployee.experiences && selectedEmployee.experiences.length > 0 ? (
                  <DetailGrid>
                    {selectedEmployee.experiences.map((experience, index) => (
                      <ExperienceItem key={index} experience={experience} index={index} />
                    ))}
                  </DetailGrid>
                ) : (
                  <ErrorMessage>No work experience records found.</ErrorMessage>
                )}
              </TabContent>

              {/* Education Tab */}
              <TabContent active={activeTab === "education"}>
                {selectedEmployee.qualifications && selectedEmployee.qualifications.length > 0 ? (
                  <DetailGrid>
                    {selectedEmployee.qualifications.map((qualification, index) => (
                      <QualificationItem key={index} qualification={qualification} index={index} />
                    ))}
                  </DetailGrid>
                ) : (
                  <ErrorMessage>No educational qualification records found.</ErrorMessage>
                )}
              </TabContent>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}

export default EmployeeManagement
