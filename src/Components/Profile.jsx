"use client"

import { useState, useRef, useEffect } from "react"
import styled, { createGlobalStyle } from "styled-components"
import axios from "axios"
import moment from "moment"
import { theme } from "./colors"

const GlobalBaseUrl = import.meta.env.VITE_BACKEND_GLOBAL_BASE_URL

import {
  Save,
  User,
  Phone,
  Heart,
  Users,
  Building,
  Briefcase,
  CreditCard,
  Mail,
  Calendar,
  Camera,
  Plus,
  Trash2,
  Upload,
  Building2,
  ChevronDown,
  X,
  FileText,
  DollarSign,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

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
  
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker__input-container {
    width: 100%;
  }
`

// Enhanced Container for 4-row layout
const Container = styled.div`
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`

const ContentWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`

const Card = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
  border: 1px solid ${theme.colors.secondary.main};
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
`

const CardHeader = styled.div`
  background: ${theme.colors.primary.gradient};
  padding: 1.5rem 2rem;
  flex-shrink: 0;
  
  @media (max-width: 640px) {
    padding: 1rem 1.5rem;
  }
`

const CardTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.025em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 640px) {
    font-size: 1.75rem;
  }
`

const CardSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0.5rem 0 0;
  font-weight: 400;
`

const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  border-bottom: 2px solid ${theme.colors.secondary.main};
  background-color: ${theme.colors.secondary.light};
  scrollbar-width: thin;
  flex-shrink: 0;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.secondary.light};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.light};
    border-radius: 2px;
  }
`

const TabButton = styled.button`
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  display: flex;
  align-items: center;
  color: ${(props) => (props.active ? theme.colors.primary.dark : theme.colors.neutral[600])};
  border-bottom: ${(props) => (props.active ? `3px solid ${theme.colors.primary.main}` : "3px solid transparent")};
  background: ${(props) => (props.active ? "white" : "transparent")};
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${(props) => (props.active ? theme.colors.primary.dark : theme.colors.primary.main)};
    background-color: ${(props) => (props.active ? "white" : theme.colors.secondary.main)};
  }
`

const TabIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  color: ${theme.colors.primary.main};
`

const FormContainer = styled.form`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background: linear-gradient(to bottom, white, ${theme.colors.secondary.light});
  
  @media (max-width: 640px) {
    padding: 1rem;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.colors.primary.dark};
  display: flex;
  align-items: center;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.025em;
`

const SectionIcon = styled.span`
  margin-right: 0.75rem;
  color: ${theme.colors.primary.main};
  display: flex;
  align-items: center;
  background: ${theme.colors.secondary.light};
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: ${theme.shadows.sm};
`

// Optimized 4-column grid for better space utilization
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.75rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2rem;
  }
`

const FormGroup = styled.div`
  margin-bottom: 0;
  position: relative;
`

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.primary.dark};
  margin-bottom: 0.5rem;
  letter-spacing: 0.025em;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${theme.colors.primary.light};
  }
  
  &.error {
    border-color: ${theme.colors.error.main};
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.5rem;
  outline: none;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${theme.colors.primary.light};
  }
`

// Normal styled select dropdown
const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23F3875A' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25em 1.25em;
  cursor: pointer;
  
  &:focus {
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${theme.colors.primary.light};
  }
  
  option {
    padding: 0.5rem;
    background-color: white;
    color: ${theme.colors.neutral[800]};
  }
`

// Multi-select dropdown container
const MultiSelectContainer = styled.div`
  position: relative;
`

const MultiSelectDropdown = styled.div`
  position: relative;
  width: 100%;
`

const MultiSelectButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  background-color: white;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:focus {
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${theme.colors.primary.light};
  }
`

const MultiSelectOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.5rem;
  margin-top: 0.25rem;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: ${theme.shadows.lg};
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.secondary.light};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.light};
    border-radius: 2px;
  }
`

const MultiSelectOption = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background-color: ${theme.colors.secondary.light};
  }
  
  &.selected {
    background-color: ${theme.colors.primary.light};
    color: white;
  }
`

const InputGroup = styled.div`
  display: flex;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid ${theme.colors.secondary.main};
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${theme.colors.primary.light};
  }
`

const InputAddon = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 1rem;
  background: linear-gradient(135deg, ${theme.colors.secondary.light}, ${theme.colors.secondary.main});
  color: ${theme.colors.primary.dark};
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
`

const InputWithAddon = styled(Input)`
  border: none;
  border-radius: 0;
  
  &:focus {
    box-shadow: none;
    transform: none;
  }
`

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: ${theme.colors.primary.light};
  }
`

const DatePickerWithAddon = styled(StyledDatePicker)`
  border: none;
  border-radius: 0;
  
  &:focus {
    box-shadow: none;
    transform: none;
  }
`

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &:hover {
    background-color: ${theme.colors.secondary.light};
    border-color: ${theme.colors.secondary.main};
  }
`

const RadioInput = styled.input`
  height: 1.25rem;
  width: 1.25rem;
  accent-color: ${theme.colors.primary.main};
  cursor: pointer;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.2);
  }
`

const RadioText = styled.span`
  margin-left: 0.5rem;
  color: ${theme.colors.neutral[800]};
  font-size: 0.875rem;
  font-weight: 500;
`

// Compact qualification cards for better space usage
const QualificationCard = styled.div`
  padding: 1.5rem;
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 0.75rem;
  background: linear-gradient(135deg, white, ${theme.colors.secondary.light});
  margin-bottom: 1.5rem;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary.light};
  }
  
  @media (max-width: 640px) {
    padding: 1rem;
  }
`

const QualificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${theme.colors.secondary.main};
`

const QualificationTitle = styled.h3`
  font-weight: 700;
  color: ${theme.colors.primary.dark};
  margin: 0;
  font-size: 1.125rem;
`

const RemoveButton = styled.button`
  color: ${theme.colors.error.main};
  background: ${theme.colors.error.light};
  border: 2px solid ${theme.colors.error.main};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    background-color: ${theme.colors.error.main};
    transform: scale(1.05);
  }
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: ${theme.colors.primary.gradient};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.875rem;
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

const AddButtonIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, white, ${theme.colors.secondary.light});
  border: 2px dashed ${theme.colors.secondary.main};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
  
  &:hover {
    background: linear-gradient(135deg, ${theme.colors.secondary.light}, ${theme.colors.secondary.main});
    border-color: ${theme.colors.primary.light};
    transform: translateY(-1px);
  }
`

const UploadIcon = styled.span`
  margin-right: 0.5rem;
  color: ${theme.colors.primary.main};
  display: flex;
  align-items: center;
`

const UploadText = styled.span`
  color: ${theme.colors.neutral[700]};
`

const FileName = styled.span`
  margin-left: 0.75rem;
  font-size: 0.75rem;
  color: ${theme.colors.success.dark};
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  background-color: ${theme.colors.success.light};
  border-radius: 0.375rem;
  border: 1px solid ${theme.colors.success.main};
`

const SubmitButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (min-width: 640px) {
    justify-content: flex-end;
  }
`

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: ${theme.colors.primary.gradient};
  color: white;
  font-weight: 700;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: ${theme.shadows.md};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(243, 135, 90, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const SubmitButtonIcon = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
`

const SelectedItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, ${theme.colors.secondary.light}, ${theme.colors.secondary.main});
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: ${theme.colors.primary.dark};
  font-weight: 600;
  border: 1px solid ${theme.colors.secondary.main};
  box-shadow: ${theme.shadows.sm};
`

const RemoveItemButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  color: ${theme.colors.neutral[600]};
  background: none;
  border: none;
  padding: 0.125rem;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.colors.error.main};
    background-color: rgba(239, 68, 68, 0.1);
  }
`

// Error and Success message components
const MessageContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  max-width: 400px;
`

const Message = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  box-shadow: ${theme.shadows.lg};
  animation: slideIn 0.3s ease-out;
  
  &.success {
    background-color: ${theme.colors.success.light};
    border: 1px solid ${theme.colors.success.main};
    color: ${theme.colors.success.dark};
  }
  
  &.error {
    background-color: ${theme.colors.error.light};
    border: 1px solid ${theme.colors.error.main};
    color: ${theme.colors.error.dark};
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

const MessageIcon = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
`

const MessageText = styled.span`
  flex: 1;
  font-weight: 500;
`

const CloseButton = styled.button`
  margin-left: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

// Loading spinner
const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

// Enhanced API wrapper with GridFS support and caching
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
      validateStatus: () => true,
    }

    if (data && (method === "POST" || method === "PUT")) {
      config.data = data
    }

    const response = await axios(config)

    if (response.status === 200 || response.status === 201) {
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

// GridFS file upload function
const uploadToGridFS = async (file, fileType = "document") => {
  try {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("fileType", fileType)

    const result = await apiRequest(`${GlobalBaseUrl}upload-gridfs/`, "POST", formData, {
      "Content-Type": "multipart/form-data",
    })

    if (result.success) {
      return { success: true, fileId: result.data.fileId, filename: result.data.filename }
    } else {
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error("GridFS upload error:", error)
    return { success: false, error: "Failed to upload file" }
  }
}

// Cache management
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const getCachedData = (key) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  cache.delete(key)
  return null
}

const setCachedData = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() })
}

function Profile({ employeeData, isEditing = false, onSaveSuccess, onCancel, updateEmployee, saving }) {
  const fileInputRef = useRef(null)
  const [profileImage, setProfileImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [hasChanges, setHasChanges] = useState(false)

  // Enhanced file ID storage - this is the key fix
  const [uploadedFileIds, setUploadedFileIds] = useState({
    profileImage: null,
    aadhaar: null,
    pan: null,
    fatherAadhaar: null,
    motherAadhaar: null,
    spouseAadhaar: null,
    qualifications: {},
    experiences: {},
    kidsAadhaar: {},
  })

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    fatherName: "",
    motherName: "",
    gender: "",
    mobileNumber: "",
    bloodGroup: "",
    maritalStatus: "",
    guardianNumber: "",
    dateOfBirth: null,
    email: "",
    department: "",
    designation: "",
    primaryRole: "",
    additionalRoles: [],
    additionalRoleNames: [],
    dataEntitlements: [],
    dataEntitlementNames: [],
    employmentStatus: "",
    registrationNumber: "",
    validityDate: null,
  })

  // KYC Details with GridFS file IDs
  const [kycDetails, setKycDetails] = useState({
    aadhaarNumber: "",
    panNumber: "",
    panType: "",
  })

  // Enhanced family details with GridFS file IDs
  const [familyDetails, setFamilyDetails] = useState({
    fatherAadhaar: "",
    fatherDob: null,
    motherAadhaar: "",
    motherDob: null,
    spouseName: "",
    spouseAadhaar: "",
    spouseDob: null,
    kidsDetails: [
      {
        name: "",
        aadhaar: "",
        dob: null,
      },
    ],
  })

  const [salaryDetails, setSalaryDetails] = useState({
    netSalary: "",
    grossSalary: "",
    ctc: "",
  })

  const [fnfStatus, setFnfStatus] = useState({
    remarks: "",
  })

  // State for roles with caching
  const [primaryRoleOptions, setPrimaryRoleOptions] = useState([])
  const [additionalRoleOptions, setAdditionalRoleOptions] = useState([])
  const [showAdditionalRoles, setShowAdditionalRoles] = useState(false)
  const [showDataEntitlements, setShowDataEntitlements] = useState(false)

  // Updated qualifications with GridFS file IDs
  const [qualifications, setQualifications] = useState([
    {
      id: 1,
      degree: "",
      institution: "",
      passedOut: "",
      percentage: "",
      fromDate: null,
      toDate: null,
    },
  ])

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: "",
      position: "",
      yearsOfExperience: "",
      fromDate: null,
      toDate: null,
    },
  ])

  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    ifscCode: "",
    accountNumber: "",
    branch: "",
  })

  const [activeTab, setActiveTab] = useState("personal")

  // NEW: Pre-populate form data when editing
  useEffect(() => {
    if (isEditing && employeeData) {
      try {
        console.log("Pre-populating form with employee data:", employeeData)

        // Set basic form data
        setFormData({
          employeeId: employeeData.employeeId || "",
          employeeName: employeeData.employeeName || "",
          fatherName: employeeData.fatherName || "",
          motherName: employeeData.motherName || "",
          gender: employeeData.gender || "",
          mobileNumber: employeeData.mobileNumber || "",
          bloodGroup: employeeData.bloodGroup || "",
          maritalStatus: employeeData.maritalStatus || "",
          guardianNumber: employeeData.guardianNumber || "",
          dateOfBirth: employeeData.dateOfBirth ? moment(employeeData.dateOfBirth).format("YYYY-MM-DD") : null,
          email: employeeData.email || "",
          department: employeeData.department || "",
          designation: employeeData.designation || "",
          primaryRole: employeeData.primaryRole || "",
          additionalRoles: employeeData.additionalRoles || [],
          additionalRoleNames: employeeData.additionalRoleNames || [],
          dataEntitlements: employeeData.dataEntitlements || [],
          dataEntitlementNames: employeeData.dataEntitlementNames || [],
          employmentStatus: employeeData.employmentStatus || "",
          registrationNumber: employeeData.registrationNumber || "",
          validityDate: employeeData.validityDate ? moment(employeeData.validityDate).format("YYYY-MM-DD") : null,
        })

        // Set KYC details
        if (employeeData.kycDetails) {
          setKycDetails({
            aadhaarNumber: employeeData.kycDetails.aadhaarNumber || "",
            panNumber: employeeData.kycDetails.panNumber || "",
            panType: employeeData.kycDetails.panType || "",
          })
        }

        // Set family details
        if (employeeData.familyDetails) {
          setFamilyDetails({
            fatherAadhaar: employeeData.familyDetails.fatherAadhaar || "",
            fatherDob: employeeData.familyDetails.fatherDob
              ? moment(employeeData.familyDetails.fatherDob).isValid()
                ? moment(employeeData.familyDetails.fatherDob).toDate()
                : null
              : null,
            motherAadhaar: employeeData.familyDetails.motherAadhaar || "",
            motherDob: employeeData.familyDetails.motherDob
              ? moment(employeeData.familyDetails.motherDob).isValid()
                ? moment(employeeData.familyDetails.motherDob).toDate()
                : null
              : null,
            spouseName: employeeData.familyDetails.spouseName || "",
            spouseAadhaar: employeeData.familyDetails.spouseAadhaar || "",
            spouseDob: employeeData.familyDetails.spouseDob
              ? moment(employeeData.familyDetails.spouseDob).isValid()
                ? moment(employeeData.familyDetails.spouseDob).toDate()
                : null
              : null,
            kidsDetails: employeeData.familyDetails.kidsDetails
              ? employeeData.familyDetails.kidsDetails.map((kid) => ({
                  ...kid,
                  dob: kid.dob ? (moment(kid.dob).isValid() ? moment(kid.dob).toDate() : null) : null,
                }))
              : [{ name: "", aadhaar: "", dob: null }],
          })
        }

        // Set bank details
        if (employeeData.bankDetails) {
          setBankDetails({
            bankName: employeeData.bankDetails.bankName || "",
            ifscCode: employeeData.bankDetails.ifscCode || "",
            accountNumber: employeeData.bankDetails.accountNumber || "",
            branch: employeeData.bankDetails.branch || "",
          })
        }

        // Set salary details
        if (employeeData.salaryDetails) {
          setSalaryDetails({
            netSalary: employeeData.salaryDetails.netSalary || "",
            grossSalary: employeeData.salaryDetails.grossSalary || "",
            ctc: employeeData.salaryDetails.ctc || "",
          })
        }

        // Set FNF status
        if (employeeData.fnfStatus) {
          setFnfStatus({
            remarks: employeeData.fnfStatus.remarks || "",
          })
        }

        // Set qualifications
        if (employeeData.qualifications && employeeData.qualifications.length > 0) {
          const formattedQualifications = employeeData.qualifications.map((qual, index) => ({
            id: index + 1,
            degree: qual.degree || "",
            institution: qual.institution || "",
            passedOut: qual.passedOut || "",
            percentage: qual.percentage || "",
            fromDate: qual.fromDate ? (moment(qual.fromDate).isValid() ? moment(qual.fromDate).toDate() : null) : null,
            toDate: qual.toDate ? (moment(qual.toDate).isValid() ? moment(qual.toDate).toDate() : null) : null,
          }))
          setQualifications(formattedQualifications)
        }

        // Set experiences
        if (employeeData.experiences && employeeData.experiences.length > 0) {
          const formattedExperiences = employeeData.experiences.map((exp, index) => ({
            id: index + 1,
            company: exp.company || "",
            position: exp.position || "",
            yearsOfExperience: exp.yearsOfExperience || "",
            fromDate: exp.fromDate ? (moment(exp.fromDate).isValid() ? moment(exp.fromDate).toDate() : null) : null,
            toDate: exp.toDate ? (moment(exp.toDate).isValid() ? moment(exp.toDate).toDate() : null) : null,
          }))
          setExperiences(formattedExperiences)
        }

        // Set profile image if available
        if (employeeData.profileImage) {
          setProfileImage(employeeData.profileImage)
        }

        // Reset changes flag
        setHasChanges(false)
      } catch (error) {
        console.error("Error pre-populating form data:", error)
        showMessage("Error loading employee data. Some fields may not display correctly.", "error")
      }
    }
  }, [isEditing, employeeData])

  // Track changes in form data
  const trackChanges = () => {
    if (isEditing) {
      setHasChanges(true)
    }
  }

  // Fetch roles with caching
  useEffect(() => {
    const fetchRoles = async () => {
      const cacheKey = "roles_data"
      const cachedRoles = getCachedData(cacheKey)

      if (cachedRoles) {
        setPrimaryRoleOptions(cachedRoles)
        setAdditionalRoleOptions(cachedRoles)
        return
      }

      const result = await apiRequest(GlobalBaseUrl + "getprimaryandadditionalrole/")

      if (result.success) {
        const roles = result.data.designations || []
        const activeRoles = roles.filter((role) => role.is_active === true)
        setPrimaryRoleOptions(activeRoles)
        setAdditionalRoleOptions(activeRoles)
        setCachedData(cacheKey, activeRoles)
      } else {
        showMessage("Error fetching roles: " + result.error, "error")
        if (result.status === 401) {
          showMessage("Your session has expired. Please log in again.", "error")
        }
      }
    }

    fetchRoles()
  }, [])

  // Message management
  const showMessage = (text, type = "success") => {
    const id = Date.now()
    const newMessage = { id, text, type }
    setMessages((prev) => [...prev, newMessage])

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
    }, 5000)
  }

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }

  // Handle primary role change
  const handlePrimaryRoleChange = (e) => {
    const selectedRoleCode = e.target.value
    const roleObj = primaryRoleOptions.find((role) => role.role_code === selectedRoleCode)
    if (roleObj) {
      setFormData((prev) => ({
        ...prev,
        primaryRole: roleObj.role_code,
        primaryRoleName: roleObj.role_name,
      }))
      trackChanges()
    }
  }

  // Handle additional role selection
  const handleAdditionalRoleToggle = (roleCode, roleName) => {
    setFormData((prev) => {
      const isSelected = prev.additionalRoles.includes(roleCode)
      if (isSelected) {
        return {
          ...prev,
          additionalRoles: prev.additionalRoles.filter((code) => code !== roleCode),
          additionalRoleNames: prev.additionalRoleNames.filter((name) => name !== roleName),
        }
      } else {
        return {
          ...prev,
          additionalRoles: [...prev.additionalRoles, roleCode],
          additionalRoleNames: [...prev.additionalRoleNames, roleName],
        }
      }
    })
    trackChanges()
  }

  // Remove additional role
  const handleRemoveAdditionalRole = (roleName) => {
    const roleObj = additionalRoleOptions.find((role) => role.role_name === roleName)
    if (roleObj) {
      setFormData((prev) => ({
        ...prev,
        additionalRoles: prev.additionalRoles.filter((code) => code !== roleObj.role_code),
        additionalRoleNames: prev.additionalRoleNames.filter((name) => name !== roleName),
      }))
      trackChanges()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    trackChanges()
  }

  const handleDateChange = (date, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: date ? moment(date).format("YYYY-MM-DD") : null,
    }))
    trackChanges()
  }

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target
    setBankDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    trackChanges()
  }

  // Enhanced KYC Details handlers with GridFS
  const handleKycChange = (e) => {
    const { name, value } = e.target
    setKycDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
    trackChanges()
  }

  // Fixed KYC file upload with proper file ID caching
  const handleKycFileUpload = async (e, fileType) => {
    const file = e.target.files?.[0]
    if (file) {
      setLoading(true)
      const uploadResult = await uploadToGridFS(file, `kyc_${fileType}`)

      if (uploadResult.success) {
        // Store file ID in the uploadedFileIds state
        setUploadedFileIds((prev) => ({
          ...prev,
          [fileType]: uploadResult.fileId,
        }))
        showMessage(`${fileType.toUpperCase()} uploaded successfully`, "success")
        trackChanges()
      } else {
        showMessage(`Failed to upload ${fileType}: ${uploadResult.error}`, "error")
      }
      setLoading(false)
    }
  }

  // Enhanced Family Details handlers with GridFS
  const handleFamilyChange = (e) => {
    const { name, value } = e.target
    setFamilyDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
    trackChanges()
  }

  const handleFamilyDateChange = (date, field) => {
    setFamilyDetails((prev) => ({
      ...prev,
      [field]: date,
    }))
    trackChanges()
  }

  // Fixed family member Aadhaar uploads with proper file ID caching
  const handleFamilyAadhaarUpload = async (e, memberType) => {
    const file = e.target.files?.[0]
    if (file) {
      setLoading(true)
      const uploadResult = await uploadToGridFS(file, `family_${memberType}_aadhaar`)

      if (uploadResult.success) {
        // Store file ID in the uploadedFileIds state
        setUploadedFileIds((prev) => ({
          ...prev,
          [`${memberType}Aadhaar`]: uploadResult.fileId,
        }))
        showMessage(`${memberType}'s Aadhaar uploaded successfully`, "success")
        trackChanges()
      } else {
        showMessage(`Failed to upload ${memberType}'s Aadhaar: ${uploadResult.error}`, "error")
      }
      setLoading(false)
    }
  }

  const handleKidsChange = (index, field, value) => {
    setFamilyDetails((prev) => ({
      ...prev,
      kidsDetails: prev.kidsDetails.map((kid, i) => (i === index ? { ...kid, [field]: value } : kid)),
    }))
    trackChanges()
  }

  // Fixed kids Aadhaar uploads with proper file ID caching
  const handleKidsAadhaarUpload = async (e, index) => {
    const file = e.target.files?.[0]
    if (file) {
      setLoading(true)
      const uploadResult = await uploadToGridFS(file, `family_kid_${index}_aadhaar`)

      if (uploadResult.success) {
        // Store file ID in the uploadedFileIds state
        setUploadedFileIds((prev) => ({
          ...prev,
          kidsAadhaar: {
            ...prev.kidsAadhaar,
            [index]: uploadResult.fileId,
          },
        }))
        showMessage(`Child's Aadhaar uploaded successfully`, "success")
        trackChanges()
      } else {
        showMessage(`Failed to upload child's Aadhaar: ${uploadResult.error}`, "error")
      }
      setLoading(false)
    }
  }

  const addKid = () => {
    setFamilyDetails((prev) => ({
      ...prev,
      kidsDetails: [
        ...prev.kidsDetails,
        {
          name: "",
          aadhaar: "",
          dob: null,
        },
      ],
    }))
    trackChanges()
  }

  const removeKid = (index) => {
    if (familyDetails.kidsDetails.length > 1) {
      setFamilyDetails((prev) => ({
        ...prev,
        kidsDetails: prev.kidsDetails.filter((_, i) => i !== index),
      }))

      // Remove the file ID from cache as well
      setUploadedFileIds((prev) => {
        const newKidsAadhaar = { ...prev.kidsAadhaar }
        delete newKidsAadhaar[index]
        return {
          ...prev,
          kidsAadhaar: newKidsAadhaar,
        }
      })
      trackChanges()
    }
  }

  // Salary Details handlers
  const handleSalaryChange = (e) => {
    const { name, value } = e.target
    setSalaryDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
    trackChanges()
  }

  // FNF Status handlers
  const handleFnfChange = (e) => {
    const { name, value } = e.target
    setFnfStatus((prev) => ({
      ...prev,
      [name]: value,
    }))
    trackChanges()
  }

  const handleQualificationChange = (id, field, value) => {
    setQualifications((prevQualifications) =>
      prevQualifications.map((qual) => (qual.id === id ? { ...qual, [field]: value } : qual)),
    )
    trackChanges()
  }

  const handleQualificationDateChange = (date, id, field) => {
    setQualifications((prevQualifications) =>
      prevQualifications.map((qual) => (qual.id === id ? { ...qual, [field]: date } : qual)),
    )
    trackChanges()
  }

  // Fixed qualification file upload with proper file ID caching
  const handleQualificationFileUpload = async (e, id) => {
    const file = e.target.files?.[0]
    if (file) {
      setLoading(true)
      const uploadResult = await uploadToGridFS(file, `qualification_certificate`)

      if (uploadResult.success) {
        // Store file ID in the uploadedFileIds state
        setUploadedFileIds((prev) => ({
          ...prev,
          qualifications: {
            ...prev.qualifications,
            [id]: uploadResult.fileId,
          },
        }))
        showMessage("Qualification certificate uploaded successfully", "success")
        trackChanges()
      } else {
        showMessage(`Failed to upload certificate: ${uploadResult.error}`, "error")
      }
      setLoading(false)
    }
  }

  const addQualification = () => {
    const newId = qualifications.length > 0 ? Math.max(...qualifications.map((q) => q.id)) + 1 : 1

    setQualifications([
      ...qualifications,
      {
        id: newId,
        degree: "",
        institution: "",
        passedOut: "",
        percentage: "",
        fromDate: null,
        toDate: null,
      },
    ])
    trackChanges()
  }

  const removeQualification = (id) => {
    if (qualifications.length > 1) {
      setQualifications(qualifications.filter((qual) => qual.id !== id))

      // Remove the file ID from cache as well
      setUploadedFileIds((prev) => {
        const newQualifications = { ...prev.qualifications }
        delete newQualifications[id]
        return {
          ...prev,
          qualifications: newQualifications,
        }
      })
      trackChanges()
    }
  }

  const handleExperienceChange = (id, field, value) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    )
    trackChanges()
  }

  const handleExperienceDateChange = (date, id, field) => {
    setExperiences((prevExperiences) => prevExperiences.map((exp) => (exp.id === id ? { ...exp, [field]: date } : exp)))
    trackChanges()
  }

  const addExperience = () => {
    const newId = experiences.length > 0 ? Math.max(...experiences.map((e) => e.id)) + 1 : 1

    setExperiences([
      ...experiences,
      {
        id: newId,
        company: "",
        position: "",
        yearsOfExperience: "",
        fromDate: null,
        toDate: null,
      },
    ])
    trackChanges()
  }

  const removeExperience = (id) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((exp) => exp.id !== id))

      // Remove the file ID from cache as well
      setUploadedFileIds((prev) => {
        const newExperiences = { ...prev.experiences }
        delete newExperiences[id]
        return {
          ...prev,
          experiences: newExperiences,
        }
      })
      trackChanges()
    }
  }

  // Fixed experience certificate upload with proper file ID caching
  const handleCertificateUpload = async (e, id) => {
    const file = e.target.files?.[0]
    if (file) {
      setLoading(true)
      const uploadResult = await uploadToGridFS(file, `experience_certificate`)

      if (uploadResult.success) {
        // Store file ID in the uploadedFileIds state
        setUploadedFileIds((prev) => ({
          ...prev,
          experiences: {
            ...prev.experiences,
            [id]: uploadResult.fileId,
          },
        }))
        showMessage("Experience certificate uploaded successfully", "success")
        trackChanges()
      } else {
        showMessage(`Failed to upload certificate: ${uploadResult.error}`, "error")
      }
      setLoading(false)
    }
  }

  // Fixed profile image upload with proper file ID caching
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setLoading(true)
      const uploadResult = await uploadToGridFS(file, "profile_image")

      if (uploadResult.success) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setProfileImage(reader.result)
        }
        reader.readAsDataURL(file)

        // Store file ID in the uploadedFileIds state
        setUploadedFileIds((prev) => ({
          ...prev,
          profileImage: uploadResult.fileId,
        }))
        showMessage("Profile image uploaded successfully", "success")
        trackChanges()
      } else {
        showMessage(`Failed to upload profile image: ${uploadResult.error}`, "error")
      }
      setLoading(false)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const [dataEntitlementOptions, setDataEntitlementOptions] = useState([])

  useEffect(() => {
    const fetchDataEntitlements = async () => {
      const cacheKey = "data_entitlements"
      const cachedEntitlements = getCachedData(cacheKey)

      if (cachedEntitlements) {
        setDataEntitlementOptions(cachedEntitlements)
        return
      }

      const result = await apiRequest(`${GlobalBaseUrl}data-entitlements/`)

      if (result.success) {
        setDataEntitlementOptions(result.data.dataEntitlements)
        setCachedData(cacheKey, result.data.dataEntitlements)
      } else {
        showMessage("Error fetching data entitlements: " + result.error, "error")
        if (result.status === 401) {
          showMessage("Your session has expired. Please log in again.", "error")
        }
      }
    }

    fetchDataEntitlements()
  }, [])

  // Handle data entitlement selection
  const handleDataEntitlementToggle = (entitlementCode, entitlementName) => {
    setFormData((prev) => {
      const isSelected = prev.dataEntitlements.includes(entitlementCode)
      if (isSelected) {
        return {
          ...prev,
          dataEntitlements: prev.dataEntitlements.filter((code) => code !== entitlementCode),
          dataEntitlementNames: prev.dataEntitlementNames.filter((name) => name !== entitlementName),
        }
      } else {
        return {
          ...prev,
          dataEntitlements: [...prev.dataEntitlements, entitlementCode],
          dataEntitlementNames: [...prev.dataEntitlementNames, entitlementName],
        }
      }
    })
    trackChanges()
  }

  // Remove data entitlement
  const handleRemoveDataEntitlement = (entitlementName) => {
    const entitlementObj = dataEntitlementOptions.find((ent) => ent.DataEntitlements === entitlementName)
    if (entitlementObj) {
      setFormData((prev) => ({
        ...prev,
        dataEntitlements: prev.dataEntitlements.filter((code) => code !== entitlementObj.DataEntitlementsCode),
        dataEntitlementNames: prev.dataEntitlementNames.filter((name) => name !== entitlementName),
      }))
      trackChanges()
    }
  }

  const [departmentsData, setDepartmentsData] = useState([])

  // Update the department handling with caching
  useEffect(() => {
    const fetchDepartments = async () => {
      const cacheKey = "departments_data"
      const cachedDepartments = getCachedData(cacheKey)

      if (cachedDepartments) {
        setDepartmentsData(cachedDepartments)
        return
      }

      const result = await apiRequest(GlobalBaseUrl + "get_data_departments/")

      if (result.success) {
        const allDepartments = result.data.departments
        const activeDepartments = allDepartments.filter((item) => item.is_active)
        setDepartmentsData(activeDepartments)
        setCachedData(cacheKey, activeDepartments)
      } else {
        showMessage("Error fetching departments: " + result.error, "error")
        if (result.status === 401) {
          showMessage("Your session has expired. Please log in again.", "error")
        }
      }
    }

    fetchDepartments()
  }, [])

  // Update department change handler
  const handleDepartmentChange = (e) => {
    const selectedDept = departmentsData.find((dept) => dept.department_code === e.target.value)
    setFormData((prev) => ({
      ...prev,
      department: selectedDept.department_code,
      departmentName: selectedDept.department_name,
    }))
    trackChanges()
  }

  const [designationsData, setDesignationsData] = useState([])

  // Update designation handling with caching
  useEffect(() => {
    const fetchDesignations = async () => {
      const cacheKey = "designations_data"
      const cachedDesignations = getCachedData(cacheKey)

      if (cachedDesignations) {
        setDesignationsData(cachedDesignations)
        return
      }

      const result = await apiRequest(GlobalBaseUrl + "get_data_designation/")

      if (result.success) {
        const data = result.data.designations
        const activeDesignations = data.filter((item) => item.is_active)
        setDesignationsData(activeDesignations)
        setCachedData(cacheKey, activeDesignations)
      } else {
        showMessage("Error fetching designations: " + result.error, "error")
        if (result.status === 401) {
          showMessage("Your session has expired. Please log in again.", "error")
        }
      }
    }

    fetchDesignations()
  }, [])

  // Update designation change handler
  const handleDesignationChange = (e) => {
    const selectedDesig = designationsData.find((desig) => desig.Designation_code === e.target.value)
    setFormData((prev) => ({
      ...prev,
      designation: selectedDesig.Designation_code,
      designationName: selectedDesig.designation,
    }))
    trackChanges()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Prevent default form submission - only save on button click
  }

  // ENHANCED: Submit profile with proper edit/create handling
  const submitProfile = async () => {
    if (loading || saving) return

    setLoading(true)

    try {
      // Validate required fields
      const requiredFields = [
        "employeeId",
        "employeeName",
        "email",
        "dateOfBirth",
        "gender",
        "mobileNumber",
        "department",
        "designation",
      ]
      const missingFields = requiredFields.filter((field) => !formData[field])

      if (missingFields.length > 0) {
        showMessage(`Please fill in required fields: ${missingFields.join(", ")}`, "error")
        setLoading(false)
        return
      }

      // Prepare qualifications with file IDs
      const qualificationsWithFileIds = qualifications.map((q) => ({
        ...q,
        fromDate: q.fromDate ? moment(q.fromDate).format("YYYY-MM-DD") : null,
        toDate: q.toDate ? moment(q.toDate).format("YYYY-MM-DD") : null,
        certificateFileId: uploadedFileIds.qualifications[q.id] || null,
      }))

      // Prepare experiences with file IDs
      const experiencesWithFileIds = experiences.map((e) => ({
        ...e,
        fromDate: e.fromDate ? moment(e.fromDate).format("YYYY-MM-DD") : null,
        toDate: e.toDate ? moment(e.toDate).format("YYYY-MM-DD") : null,
        certificateFileId: uploadedFileIds.experiences[e.id] || null,
      }))

      // Prepare kids details with file IDs
      const kidsWithFileIds = familyDetails.kidsDetails.map((kid, index) => ({
        ...kid,
        dob: kid.dob ? moment(kid.dob).format("YYYY-MM-DD") : null,
        aadhaarFileId: uploadedFileIds.kidsAadhaar[index] || null,
      }))

      // Prepare the payload with proper field names matching backend expectations
      const profileData = {
        // Basic employee info
        employeeId: formData.employeeId,
        employeeName: formData.employeeName,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        gender: formData.gender,
        mobileNumber: formData.mobileNumber,
        bloodGroup: formData.bloodGroup,
        maritalStatus: formData.maritalStatus,
        guardianNumber: formData.guardianNumber,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        department: formData.department,
        designation: formData.designation,
        primaryRole: formData.primaryRole,
        additionalRoles: formData.additionalRoles,
        dataEntitlements: formData.dataEntitlements,
        employmentStatus: formData.employmentStatus,
        registrationNumber: formData.registrationNumber,
        validityDate: formData.validityDate,

        // Profile image file ID
        profileImage: uploadedFileIds.profileImage,

        // KYC details with proper field names
        kyc_aadhaarNumber: kycDetails.aadhaarNumber,
        kyc_panNumber: kycDetails.panNumber,
        kyc_panType: kycDetails.panType,

        // Family details with proper field names
        family_fatherAadhaar: familyDetails.fatherAadhaar,
        family_fatherDob: familyDetails.fatherDob ? moment(familyDetails.fatherDob).format("YYYY-MM-DD") : null,
        family_motherAadhaar: familyDetails.motherAadhaar,
        family_motherDob: familyDetails.motherDob ? moment(familyDetails.motherDob).format("YYYY-MM-DD") : null,
        family_spouseName: familyDetails.spouseName,
        family_spouseAadhaar: familyDetails.spouseAadhaar,
        family_spouseDob: familyDetails.spouseDob ? moment(familyDetails.spouseDob).format("YYYY-MM-DD") : null,

        // Bank details with proper field names
        bank_bankName: bankDetails.bankName,
        bank_ifscCode: bankDetails.ifscCode,
        bank_accountNumber: bankDetails.accountNumber,
        bank_branch: bankDetails.branch,

        // Salary details with proper field names
        salary_netSalary: salaryDetails.netSalary,
        salary_grossSalary: salaryDetails.grossSalary,
        salary_ctc: salaryDetails.ctc,

        // FNF status with proper field names
        fnf_remarks: fnfStatus.remarks,

        // JSON fields as strings (backend will parse them)
        qualifications: JSON.stringify(qualificationsWithFileIds),
        experiences: JSON.stringify(experiencesWithFileIds),
        kidsDetails: JSON.stringify(kidsWithFileIds),
      }

      console.log("Submitting profile data:", profileData)
      console.log("Uploaded file IDs:", uploadedFileIds)

      let result
      if (isEditing) {
        // Update existing employee
        const formDataForUpdate = new FormData()
        Object.keys(profileData).forEach((key) => {
          if (profileData[key] !== null && profileData[key] !== undefined) {
            formDataForUpdate.append(key, profileData[key])
          }
        })

        result = await updateEmployee(formData.employeeId, formDataForUpdate)
      } else {
        // Create new employee
        result = await apiRequest(GlobalBaseUrl + "create_employee/", "POST", profileData)
      }

      if (result.success || (result.data && result.data.success)) {
        const successMessage = isEditing ? "Profile updated successfully!" : "Profile created successfully!"
        showMessage(successMessage, "success")

        // Reset changes flag
        setHasChanges(false)

        // Clear file IDs after successful submission
        setUploadedFileIds({
          profileImage: null,
          aadhaar: null,
          pan: null,
          fatherAadhaar: null,
          motherAadhaar: null,
          spouseAadhaar: null,
          qualifications: {},
          experiences: {},
          kidsAadhaar: {},
        })

        // Call success callback
        if (onSaveSuccess) {
          onSaveSuccess(result.data?.employee || result.data)
        }
      } else {
        if (result.status === 400) {
          showMessage("Invalid profile data. Please check your inputs and try again.", "error")
          console.error("Validation errors:", result.data)
        } else if (result.status === 401) {
          showMessage("Your session has expired. Please log in again.", "error")
        } else {
          showMessage(`Error ${isEditing ? "updating" : "creating"} profile: ${result.error}`, "error")
        }
      }
    } catch (error) {
      console.error("Submit error:", error)
      showMessage("An unexpected error occurred. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <ContentWrapper>
          <Card>
            {/* Header */}
            <CardHeader>
              <CardTitle>
                {isEditing ? `Edit Employee Profile - ${formData.employeeName}` : "Create Employee Profile"}
              </CardTitle>
              <CardSubtitle>
                {isEditing ? "Update employee information" : "Complete your comprehensive profile information"}
              </CardSubtitle>
            </CardHeader>

            {/* Tabs */}
            <TabsContainer>
              <TabButton active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
                <TabIcon>
                  <User size={16} />
                </TabIcon>
                Personal
              </TabButton>
              <TabButton active={activeTab === "qualification"} onClick={() => setActiveTab("qualification")}>
                <TabIcon>
                  <Building size={16} />
                </TabIcon>
                Qualification
              </TabButton>
              <TabButton active={activeTab === "experience"} onClick={() => setActiveTab("experience")}>
                <TabIcon>
                  <Briefcase size={16} />
                </TabIcon>
                Experience
              </TabButton>
              <TabButton active={activeTab === "kyc"} onClick={() => setActiveTab("kyc")}>
                <TabIcon>
                  <Shield size={16} />
                </TabIcon>
                KYC Details
              </TabButton>
              <TabButton active={activeTab === "family"} onClick={() => setActiveTab("family")}>
                <TabIcon>
                  <Users size={16} />
                </TabIcon>
                Family
              </TabButton>
              <TabButton active={activeTab === "salary"} onClick={() => setActiveTab("salary")}>
                <TabIcon>
                  <DollarSign size={16} />
                </TabIcon>
                Salary
              </TabButton>
              <TabButton active={activeTab === "bank"} onClick={() => setActiveTab("bank")}>
                <TabIcon>
                  <CreditCard size={16} />
                </TabIcon>
                Bank Details
              </TabButton>
              <TabButton active={activeTab === "fnf"} onClick={() => setActiveTab("fnf")}>
                <TabIcon>
                  <FileText size={16} />
                </TabIcon>
                FNF Status
              </TabButton>
            </TabsContainer>

            {/* Form */}
            <FormContainer onSubmit={handleSubmit}>
              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <>
                  <SectionTitle>
                    <SectionIcon>
                      <User size={20} />
                    </SectionIcon>
                    Personal Information
                  </SectionTitle>
                    <FormGroup style={{ gridColumn: "1 / -1", textAlign: "center", marginTop: "2rem" }}>
                      <Label>Profile Image</Label>
                      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                        <div style={{ position: "relative" }}>
                          <div
                            onClick={triggerFileInput}
                            style={{
                              width: "120px",
                              height: "120px",
                              borderRadius: "50%",
                              background: theme.colors.primary.gradient,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              border: "4px solid white",
                              boxShadow: theme.shadows.lg,
                              cursor: "pointer",
                              transition: "transform 0.3s ease",
                            }}
                            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                          >
                            {profileImage ? (
                              <img
                                src={profileImage || "/placeholder.svg"}
                                alt="Profile"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            ) : (
                              <Camera size={32} color="white" />
                            )}
                          </div>
                          <div
                            onClick={triggerFileInput}
                            style={{
                              position: "absolute",
                              bottom: "8px",
                              right: "8px",
                              background: theme.colors.primary.gradient,
                              borderRadius: "50%",
                              padding: "8px",
                              cursor: "pointer",
                              boxShadow: theme.shadows.md,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "3px solid white",
                            }}
                          >
                            <Camera size={14} color="white" />
                          </div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleProfileImageUpload}
                          />
                        </div>
                      </div>
                    </FormGroup>
                  <FormGrid>
                    <FormGroup>
                      <Label htmlFor="employeeId">Employee ID*</Label>
                      <Input
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        placeholder="Enter employee ID"
                        disabled={isEditing} // Disable editing employee ID
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="employeeName">Employee Name*</Label>
                      <Input
                        type="text"
                        id="employeeName"
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleChange}
                        required
                        placeholder="Enter full name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="email">Email ID*</Label>
                      <InputGroup>
                        <InputAddon>
                          <Mail size={16} />
                        </InputAddon>
                        <InputWithAddon
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter email address"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="dateOfBirth">Date of Birth*</Label>
                      <InputGroup>
                        <InputAddon>
                          <Calendar size={16} />
                        </InputAddon>
                        <DatePickerWithAddon
                          selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                          onChange={(date) => handleDateChange(date, "dateOfBirth")}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select date of birth"
                          showYearDropdown
                          dropdownMode="select"
                          required
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="fatherName">Father's Name*</Label>
                      <Input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                        placeholder="Enter father's name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="motherName">Mother's Name*</Label>
                      <Input
                        type="text"
                        id="motherName"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        required
                        placeholder="Enter mother's name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Gender*</Label>
                      <RadioGroup>
                        <RadioLabel>
                          <RadioInput
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                          />
                          <RadioText>Male</RadioText>
                        </RadioLabel>
                        <RadioLabel>
                          <RadioInput
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                          />
                          <RadioText>Female</RadioText>
                        </RadioLabel>
                        <RadioLabel>
                          <RadioInput
                            type="radio"
                            name="gender"
                            value="other"
                            checked={formData.gender === "other"}
                            onChange={handleChange}
                          />
                          <RadioText>Other</RadioText>
                        </RadioLabel>
                      </RadioGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="mobileNumber">Mobile Number*</Label>
                      <InputGroup>
                        <InputAddon>
                          <Phone size={16} />
                        </InputAddon>
                        <InputWithAddon
                          type="tel"
                          id="mobileNumber"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          required
                          placeholder="Enter mobile number"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="department">Department*</Label>
                      <InputGroup>
                        <InputAddon>
                          <Building2 size={16} />
                        </InputAddon>
                        <Select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleDepartmentChange}
                          required
                          style={{ border: "none", borderRadius: 0 }}
                        >
                          <option value="">Select department</option>
                          {departmentsData.slice(0, 60).map((dept) => (
                            <option key={dept.department_code} value={dept.department_code}>
                              {dept.department_name}
                            </option>
                          ))}
                        </Select>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="designation">Designation*</Label>
                      <InputGroup>
                        <InputAddon>
                          <Briefcase size={16} />
                        </InputAddon>
                        <Select
                          id="designation"
                          name="designation"
                          value={formData.designation}
                          onChange={handleDesignationChange}
                          required
                          style={{ border: "none", borderRadius: 0 }}
                        >
                          <option value="">Select designation</option>
                          {designationsData.slice(0, 100).map((desig) => (
                            <option key={desig.Designation_code} value={desig.Designation_code}>
                              {desig.designation}
                            </option>
                          ))}
                        </Select>
                      </InputGroup>
                    </FormGroup>

                    {/* Primary Role Normal Select */}
                    <FormGroup>
                      <Label htmlFor="primaryRole">Primary Role*</Label>
                      <InputGroup>
                        <InputAddon>
                          <User size={16} />
                        </InputAddon>
                        <Select
                          id="primaryRole"
                          name="primaryRole"
                          value={formData.primaryRole}
                          onChange={handlePrimaryRoleChange}
                          required
                          style={{ border: "none", borderRadius: 0 }}
                        >
                          <option value="">Select primary role</option>
                          {primaryRoleOptions.slice(0, 100).map((role) => (
                            <option key={role.role_code} value={role.role_code}>
                              {role.role_name}
                            </option>
                          ))}
                        </Select>
                      </InputGroup>
                    </FormGroup>

                    {/* Additional Roles Multi-select */}
                    <FormGroup>
                      <Label htmlFor="additionalRoles">Additional Roles</Label>
                      <MultiSelectContainer>
                        <MultiSelectDropdown>
                          <MultiSelectButton type="button" onClick={() => setShowAdditionalRoles(!showAdditionalRoles)}>
                            <span>
                              {formData.additionalRoleNames.length > 0
                                ? `${formData.additionalRoleNames.length} roles selected`
                                : "Select additional roles"}
                            </span>
                            <ChevronDown size={16} />
                          </MultiSelectButton>
                          {showAdditionalRoles && (
                            <MultiSelectOptions>
                              {additionalRoleOptions.slice(0, 100).map((role) => (
                                <MultiSelectOption
                                  key={role.role_code}
                                  className={formData.additionalRoles.includes(role.role_code) ? "selected" : ""}
                                  onClick={() => handleAdditionalRoleToggle(role.role_code, role.role_name)}
                                >
                                  {role.role_name}
                                  {formData.additionalRoles.includes(role.role_code) && "✓"}
                                </MultiSelectOption>
                              ))}
                            </MultiSelectOptions>
                          )}
                        </MultiSelectDropdown>
                      </MultiSelectContainer>

                      {formData.additionalRoleNames.length > 0 && (
                        <SelectedItemsContainer>
                          {formData.additionalRoleNames.map((role) => (
                            <SelectedItem key={role}>
                              {role}
                              <RemoveItemButton onClick={() => handleRemoveAdditionalRole(role)}>
                                <X size={14} />
                              </RemoveItemButton>
                            </SelectedItem>
                          ))}
                        </SelectedItemsContainer>
                      )}
                    </FormGroup>

                    {/* Data Entitlements Multi-select */}
                    <FormGroup>
                      <Label htmlFor="dataEntitlements">Business Unit</Label>
                      <MultiSelectContainer>
                        <MultiSelectDropdown>
                          <MultiSelectButton
                            type="button"
                            onClick={() => setShowDataEntitlements(!showDataEntitlements)}
                          >
                            <span>
                              {formData.dataEntitlementNames.length > 0
                                ? `${formData.dataEntitlementNames.length} entitlements selected`
                                : "Select data entitlements"}
                            </span>
                            <ChevronDown size={16} />
                          </MultiSelectButton>
                          {showDataEntitlements && (
                            <MultiSelectOptions>
                              {dataEntitlementOptions.slice(0, 100).map((entitlement) => (
                                <MultiSelectOption
                                  key={entitlement.DataEntitlementsCode}
                                  className={
                                    formData.dataEntitlements.includes(entitlement.DataEntitlementsCode)
                                      ? "selected"
                                      : ""
                                  }
                                  onClick={() =>
                                    handleDataEntitlementToggle(
                                      entitlement.DataEntitlementsCode,
                                      entitlement.DataEntitlements,
                                    )
                                  }
                                >
                                  {entitlement.DataEntitlements}
                                  {formData.dataEntitlements.includes(entitlement.DataEntitlementsCode) && "✓"}
                                </MultiSelectOption>
                              ))}
                            </MultiSelectOptions>
                          )}
                        </MultiSelectDropdown>
                      </MultiSelectContainer>

                      {formData.dataEntitlementNames.length > 0 && (
                        <SelectedItemsContainer>
                          {formData.dataEntitlementNames.map((entitlement) => (
                            <SelectedItem key={entitlement}>
                              {entitlement}
                              <RemoveItemButton onClick={() => handleRemoveDataEntitlement(entitlement)}>
                                <X size={14} />
                              </RemoveItemButton>
                            </SelectedItem>
                          ))}
                        </SelectedItemsContainer>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="employmentStatus">Employment Status*</Label>
                      <Select
                        id="employmentStatus"
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select employment status</option>
                        <option value="part-time">Part Time</option>
                        <option value="full-time">Full Time</option>
                        <option value="on-call">On-call/Visiting</option>
                        <option value="temporary">Temporary</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="registrationNumber">Registration Number</Label>
                      <Input
                        type="text"
                        id="registrationNumber"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        placeholder="Enter registration number"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="validityDate">RNM Validity Date</Label>
                      <StyledDatePicker
                        selected={formData.validityDate ? new Date(formData.validityDate) : null}
                        onChange={(date) => handleDateChange(date, "validityDate")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select validity date"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <InputGroup>
                        <InputAddon>
                          <Heart size={16} />
                        </InputAddon>
                        <Select
                          id="bloodGroup"
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleChange}
                          style={{ border: "none", borderRadius: 0 }}
                        >
                          <option value="">Select blood group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </Select>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="maritalStatus">Marital Status</Label>
                      <Select
                        id="maritalStatus"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                      >
                        <option value="">Select marital status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="guardianNumber">Guardian Number/Emergency Number</Label>
                      <InputGroup>
                        <InputAddon>
                          <Users size={16} />
                        </InputAddon>
                        <InputWithAddon
                          type="tel"
                          id="guardianNumber"
                          name="guardianNumber"
                          value={formData.guardianNumber}
                          onChange={handleChange}
                          placeholder="Enter guardian number"
                        />
                      </InputGroup>
                    </FormGroup>

                    {/* Profile Image Upload - moved to end for better layout */}

                  </FormGrid>
                </>
              )}

              {/* Qualification Tab */}
              {activeTab === "qualification" && (
                <>
                  <SectionTitle>
                    <SectionIcon>
                      <Building size={20} />
                    </SectionIcon>
                    Qualification Details
                  </SectionTitle>

                  {qualifications.map((qualification, index) => (
                    <QualificationCard key={qualification.id}>
                      <QualificationHeader>
                        <QualificationTitle>Qualification #{index + 1}</QualificationTitle>
                        {qualifications.length > 1 && (
                          <RemoveButton type="button" onClick={() => removeQualification(qualification.id)}>
                            <Trash2 size={16} />
                          </RemoveButton>
                        )}
                      </QualificationHeader>

                      <FormGrid>
                        <FormGroup>
                          <Label>Degree/Certification*</Label>
                          <Input
                            type="text"
                            value={qualification.degree}
                            onChange={(e) => handleQualificationChange(qualification.id, "degree", e.target.value)}
                            required
                            placeholder="E.g., B.Tech, MBA, etc."
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Institution/University*</Label>
                          <Input
                            type="text"
                            value={qualification.institution}
                            onChange={(e) => handleQualificationChange(qualification.id, "institution", e.target.value)}
                            required
                            placeholder="Name of institution"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Passed Out Year*</Label>
                          <Input
                            type="text"
                            value={qualification.passedOut}
                            onChange={(e) => handleQualificationChange(qualification.id, "passedOut", e.target.value)}
                            required
                            placeholder="Year of completion"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Percentage/CGPA</Label>
                          <Input
                            type="text"
                            value={qualification.percentage}
                            onChange={(e) => handleQualificationChange(qualification.id, "percentage", e.target.value)}
                            placeholder="E.g., 85% or 8.5 CGPA"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>From Date</Label>
                          <StyledDatePicker
                            selected={qualification.fromDate}
                            onChange={(date) => handleQualificationDateChange(date, qualification.id, "fromDate")}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            placeholderText="Start date"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>To Date</Label>
                          <StyledDatePicker
                            selected={qualification.toDate}
                            onChange={(date) => handleQualificationDateChange(date, qualification.id, "toDate")}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            placeholderText="End date"
                          />
                        </FormGroup>

                        <FormGroup style={{ gridColumn: "1 / -1" }}>
                          <Label>Qualification Certificate</Label>
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <UploadButton>
                              <UploadIcon>
                                <Upload size={16} />
                              </UploadIcon>
                              <UploadText>Upload Certificate</UploadText>
                              <input
                                type="file"
                                style={{ display: "none" }}
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleQualificationFileUpload(e, qualification.id)}
                              />
                            </UploadButton>
                            {uploadedFileIds.qualifications[qualification.id] && (
                              <FileName>Certificate uploaded</FileName>
                            )}
                          </div>
                        </FormGroup>
                      </FormGrid>
                    </QualificationCard>
                  ))}

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <AddButton type="button" onClick={addQualification}>
                      <AddButtonIcon>
                        <Plus size={16} />
                      </AddButtonIcon>
                      Add Another Qualification
                    </AddButton>
                  </div>
                </>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <>
                  <SectionTitle>
                    <SectionIcon>
                      <Briefcase size={20} />
                    </SectionIcon>
                    Experience Details
                  </SectionTitle>

                  {experiences.map((experience, index) => (
                    <QualificationCard key={experience.id}>
                      <QualificationHeader>
                        <QualificationTitle>Experience #{index + 1}</QualificationTitle>
                        {experiences.length > 1 && (
                          <RemoveButton type="button" onClick={() => removeExperience(experience.id)}>
                            <Trash2 size={16} />
                          </RemoveButton>
                        )}
                      </QualificationHeader>

                      <FormGrid>
                        <FormGroup>
                          <Label>Company Name*</Label>
                          <Input
                            type="text"
                            value={experience.company}
                            onChange={(e) => handleExperienceChange(experience.id, "company", e.target.value)}
                            required
                            placeholder="Name of company"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Position*</Label>
                          <Input
                            type="text"
                            value={experience.position}
                            onChange={(e) => handleExperienceChange(experience.id, "position", e.target.value)}
                            required
                            placeholder="Your job title"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Years of Experience*</Label>
                          <Input
                            type="text"
                            value={experience.yearsOfExperience}
                            onChange={(e) => handleExperienceChange(experience.id, "yearsOfExperience", e.target.value)}
                            required
                            placeholder="E.g., 2.5 years"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>From Date*</Label>
                          <StyledDatePicker
                            selected={experience.fromDate}
                            onChange={(date) => handleExperienceDateChange(date, experience.id, "fromDate")}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            placeholderText="Start date"
                            required
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>To Date</Label>
                          <StyledDatePicker
                            selected={experience.toDate}
                            onChange={(date) => handleExperienceDateChange(date, experience.id, "toDate")}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            placeholderText="End date or present"
                          />
                        </FormGroup>

                        <FormGroup style={{ gridColumn: "1 / -1" }}>
                          <Label>Experience Certificate</Label>
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <UploadButton>
                              <UploadIcon>
                                <Upload size={16} />
                              </UploadIcon>
                              <UploadText>Upload Certificate</UploadText>
                              <input
                                type="file"
                                style={{ display: "none" }}
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleCertificateUpload(e, experience.id)}
                              />
                            </UploadButton>
                            {uploadedFileIds.experiences[experience.id] && <FileName>Certificate uploaded</FileName>}
                          </div>
                        </FormGroup>
                      </FormGrid>
                    </QualificationCard>
                  ))}

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <AddButton type="button" onClick={addExperience}>
                      <AddButtonIcon>
                        <Plus size={16} />
                      </AddButtonIcon>
                      Add Another Experience
                    </AddButton>
                  </div>
                </>
              )}

              {/* KYC Details Tab */}
              {activeTab === "kyc" && (
                <>
                  <SectionTitle>
                    <SectionIcon>
                      <Shield size={20} />
                    </SectionIcon>
                    KYC Details
                  </SectionTitle>

                  <FormGrid>
                    <FormGroup>
                      <Label htmlFor="aadhaarNumber">Aadhaar Number*</Label>
                      <Input
                        type="text"
                        id="aadhaarNumber"
                        name="aadhaarNumber"
                        value={kycDetails.aadhaarNumber}
                        onChange={handleKycChange}
                        required
                        placeholder="Enter 12-digit Aadhaar number"
                        maxLength={12}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <Input
                        type="text"
                        id="panNumber"
                        name="panNumber"
                        value={kycDetails.panNumber}
                        onChange={handleKycChange}
                        placeholder="Enter PAN number"
                        maxLength={10}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="panType">PAN Type</Label>
                      <Select id="panType" name="panType" value={kycDetails.panType} onChange={handleKycChange}>
                        <option value="">Select PAN type</option>
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                        <option value="trust">Trust</option>
                        <option value="partnership">Partnership</option>
                        <option value="huf">HUF</option>
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <Label>Aadhaar Upload*</Label>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <UploadButton>
                          <UploadIcon>
                            <Upload size={16} />
                          </UploadIcon>
                          <UploadText>Upload Aadhaar</UploadText>
                          <input
                            type="file"
                            style={{ display: "none" }}
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleKycFileUpload(e, "aadhaar")}
                          />
                        </UploadButton>
                        {uploadedFileIds.aadhaar && <FileName>Aadhaar uploaded</FileName>}
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label>PAN Upload</Label>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <UploadButton>
                          <UploadIcon>
                            <Upload size={16} />
                          </UploadIcon>
                          <UploadText>Upload PAN</UploadText>
                          <input
                            type="file"
                            style={{ display: "none" }}
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleKycFileUpload(e, "pan")}
                          />
                        </UploadButton>
                        {uploadedFileIds.pan && <FileName>PAN uploaded</FileName>}
                      </div>
                    </FormGroup>
                  </FormGrid>
                </>
              )}

              {/* Family Details Tab */}
              {activeTab === "family" && (
                <>
                  <SectionTitle>
                    <SectionIcon>
                      <Users size={20} />
                    </SectionIcon>
                    Family Details
                  </SectionTitle>

                  <FormGrid>
                    <FormGroup>
                      <Label htmlFor="fatherAadhaar">Father's Aadhaar</Label>
                      <Input
                        type="text"
                        id="fatherAadhaar"
                        name="fatherAadhaar"
                        value={familyDetails.fatherAadhaar}
                        onChange={handleFamilyChange}
                        placeholder="Enter father's Aadhaar number"
                        maxLength={12}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="fatherDob">Father's Date of Birth</Label>
                      <StyledDatePicker
                        selected={familyDetails.fatherDob}
                        onChange={(date) => handleFamilyDateChange(date, "fatherDob")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select father's DOB"
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Father's Aadhaar Upload</Label>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <UploadButton>
                          <UploadIcon>
                            <Upload size={16} />
                          </UploadIcon>
                          <UploadText>Upload Father's Aadhaar</UploadText>
                          <input
                            type="file"
                            style={{ display: "none" }}
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFamilyAadhaarUpload(e, "father")}
                          />
                        </UploadButton>
                        {uploadedFileIds.fatherAadhaar && <FileName>Father's Aadhaar uploaded</FileName>}
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="motherAadhaar">Mother's Aadhaar</Label>
                      <Input
                        type="text"
                        id="motherAadhaar"
                        name="motherAadhaar"
                        value={familyDetails.motherAadhaar}
                        onChange={handleFamilyChange}
                        placeholder="Enter mother's Aadhaar number"
                        maxLength={12}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="motherDob">Mother's Date of Birth</Label>
                      <StyledDatePicker
                        selected={familyDetails.motherDob}
                        onChange={(date) => handleFamilyDateChange(date, "motherDob")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select mother's DOB"
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Mother's Aadhaar Upload</Label>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <UploadButton>
                          <UploadIcon>
                            <Upload size={16} />
                          </UploadIcon>
                          <UploadText>Upload Mother's Aadhaar</UploadText>
                          <input
                            type="file"
                            style={{ display: "none" }}
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFamilyAadhaarUpload(e, "mother")}
                          />
                        </UploadButton>
                        {uploadedFileIds.motherAadhaar && <FileName>Mother's Aadhaar uploaded</FileName>}
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="spouseName">Spouse Name</Label>
                      <Input
                        type="text"
                        id="spouseName"
                        name="spouseName"
                        value={familyDetails.spouseName}
                        onChange={handleFamilyChange}
                        placeholder="Enter spouse name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="spouseAadhaar">Spouse Aadhaar</Label>
                      <Input
                        type="text"
                        id="spouseAadhaar"
                        name="spouseAadhaar"
                        value={familyDetails.spouseAadhaar}
                        onChange={handleFamilyChange}
                        placeholder="Enter spouse Aadhaar number"
                        maxLength={12}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="spouseDob">Spouse Date of Birth</Label>
                      <StyledDatePicker
                        selected={familyDetails.spouseDob}
                        onChange={(date) => handleFamilyDateChange(date, "spouseDob")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select spouse DOB"
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Spouse Aadhaar Upload</Label>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <UploadButton>
                          <UploadIcon>
                            <Upload size={16} />
                          </UploadIcon>
                          <UploadText>Upload Spouse Aadhaar</UploadText>
                          <input
                            type="file"
                            style={{ display: "none" }}
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFamilyAadhaarUpload(e, "spouse")}
                          />
                        </UploadButton>
                        {uploadedFileIds.spouseAadhaar && <FileName>Spouse Aadhaar uploaded</FileName>}
                      </div>
                    </FormGroup>
                  </FormGrid>

                  {/* Children Details Section */}
                  <div style={{ marginTop: "2rem" }}>
                    <h3
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "700",
                        color: theme.colors.primary.dark,
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Users size={18} style={{ marginRight: "0.5rem", color: theme.colors.primary.main }} />
                      Children Details
                    </h3>

                    {familyDetails.kidsDetails.map((kid, index) => (
                      <QualificationCard key={index}>
                        <QualificationHeader>
                          <QualificationTitle>Child #{index + 1}</QualificationTitle>
                          {familyDetails.kidsDetails.length > 1 && (
                            <RemoveButton type="button" onClick={() => removeKid(index)}>
                              <Trash2 size={16} />
                            </RemoveButton>
                          )}
                        </QualificationHeader>

                        <FormGrid>
                          <FormGroup>
                            <Label>Child Name</Label>
                            <Input
                              type="text"
                              value={kid.name}
                              onChange={(e) => handleKidsChange(index, "name", e.target.value)}
                              placeholder="Enter child name"
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Child Aadhaar</Label>
                            <Input
                              type="text"
                              value={kid.aadhaar}
                              onChange={(e) => handleKidsChange(index, "aadhaar", e.target.value)}
                              placeholder="Enter child Aadhaar number"
                              maxLength={12}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Child Date of Birth</Label>
                            <StyledDatePicker
                              selected={kid.dob}
                              onChange={(date) => handleKidsChange(index, "dob", date)}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Select child DOB"
                              showYearDropdown
                              dropdownMode="select"
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Child Aadhaar Upload</Label>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                              <UploadButton>
                                <UploadIcon>
                                  <Upload size={16} />
                                </UploadIcon>
                                <UploadText>Upload Child's Aadhaar</UploadText>
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) => handleKidsAadhaarUpload(e, index)}
                                />
                              </UploadButton>
                              {uploadedFileIds.kidsAadhaar[index] && <FileName>Child's Aadhaar uploaded</FileName>}
                            </div>
                          </FormGroup>
                        </FormGrid>
                      </QualificationCard>
                    ))}

                    <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                      <AddButton type="button" onClick={addKid}>
                        <AddButtonIcon>
                          <Plus size={16} />
                        </AddButtonIcon>
                        Add Another Child
                      </AddButton>
                    </div>
                  </div>
                </>
              )}

              {/* Salary Details Tab */}
              {activeTab === "salary" && (
                <>
                  <SectionTitle>
                    <SectionIcon>
                      <DollarSign size={20} />
                    </SectionIcon>
                    Salary Details
                  </SectionTitle>

                  <FormGrid>
                    <FormGroup>
                      <Label htmlFor="netSalary">Net Salary</Label>
                      <InputGroup>
                        <InputAddon>₹</InputAddon>
                        <InputWithAddon
                          type="text"
                          id="netSalary"
                          name="netSalary"
                          value={salaryDetails.netSalary}
                          onChange={handleSalaryChange}
                          placeholder="Enter net salary"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="grossSalary">Gross Salary</Label>
                      <InputGroup>
                        <InputAddon>₹</InputAddon>
                        <InputWithAddon
                          type="text"
                          id="grossSalary"
                          name="grossSalary"
                          value={salaryDetails.grossSalary}
                          onChange={handleSalaryChange}
                          placeholder="Enter gross salary"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="ctc">CTC (Cost to Company)</Label>
                      <InputGroup>
                        <InputAddon>₹</InputAddon>
                        <InputWithAddon
                          type="text"
                          id="ctc"
                          name="ctc"
                          value={salaryDetails.ctc}
                          onChange={handleSalaryChange}
                          placeholder="Enter CTC"
                        />
                      </InputGroup>
                    </FormGroup>
                  </FormGrid>
                </>
              )}

              {/* Bank Details Tab */}
              {activeTab === "bank" && (
                <>
                  <SectionTitle>
                    <SectionIcon>
                      <CreditCard size={20} />
                    </SectionIcon>
                    Bank Account Details
                  </SectionTitle>

                  <FormGrid>
                    <FormGroup>
                      <Label htmlFor="bankName">Bank Name*</Label>
                      <Input
                        type="text"
                        id="bankName"
                        name="bankName"
                        value={bankDetails.bankName}
                        onChange={handleBankDetailsChange}
                        required
                        placeholder="Enter bank name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="ifscCode">IFSC Code*</Label>
                      <Input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        value={bankDetails.ifscCode}
                        onChange={handleBankDetailsChange}
                        required
                        placeholder="Enter IFSC code"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="accountNumber">Account Number*</Label>
                      <Input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={bankDetails.accountNumber}
                        onChange={handleBankDetailsChange}
                        required
                        placeholder="Enter account number"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="branch">Branch Name</Label>
                      <Input
                        type="text"
                        id="branch"
                        name="branch"
                        value={bankDetails.branch}
                        onChange={handleBankDetailsChange}
                        placeholder="Enter branch name"
                      />
                    </FormGroup>
                  </FormGrid>
                </>
              )}

              {/* FNF Status Tab */}
              {activeTab === "fnf" && (
                <>
                  <SectionTitle>
                    <SectionIcon>
                      <FileText size={20} />
                    </SectionIcon>
                    Full and Final Settlement Status
                  </SectionTitle>

                  <FormGroup>
                    <Label htmlFor="remarks">Remarks</Label>
                    <Textarea
                      id="remarks"
                      name="remarks"
                      value={fnfStatus.remarks}
                      onChange={handleFnfChange}
                      placeholder="Enter any remarks or notes regarding full and final settlement"
                      rows={6}
                    />
                  </FormGroup>
                </>
              )}

              <SubmitButtonContainer>
                {/* Show save button only if there are changes or it's a new profile */}
                {(!isEditing || hasChanges) && (
                  <SubmitButton type="button" onClick={submitProfile} disabled={loading || saving}>
                    <SubmitButtonIcon>{loading || saving ? <LoadingSpinner /> : <Save size={18} />}</SubmitButtonIcon>
                    {loading || saving ? "Saving..." : isEditing ? "Update Profile" : "Save Profile"}
                  </SubmitButton>
                )}
              </SubmitButtonContainer>
            </FormContainer>
          </Card>
        </ContentWrapper>

        {/* Message Container */}
        <MessageContainer>
          {messages.map((message) => (
            <Message key={message.id} className={message.type}>
              <MessageIcon>
                {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              </MessageIcon>
              <MessageText>{message.text}</MessageText>
              <CloseButton onClick={() => removeMessage(message.id)}>
                <X size={16} />
              </CloseButton>
            </Message>
          ))}
        </MessageContainer>
      </Container>
    </>
  )
}

export default Profile
