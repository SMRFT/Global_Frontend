// Professional HR Management System Theme
// Professional HR Management System Theme with Updated Color Palette
export const theme = {
  colors: {
    primary: {
      light: "#B7BDD4",
      main: "#515986",
      dark: "#3A3F66",
      gradient: "linear-gradient(135deg,rgb(102, 111, 158) 50%,rgb(145, 164, 238) 0%, #3A3F66 10%)",
      gradientReverse: "linear-gradient(135deg, #3A3F66 0%, #515986 50%, #B7BDD4 100%)",
      gradientHorizontal: "linear-gradient(90deg, #B7BDD4 0%, #515986 50%, #3A3F66 100%)",
      gradientVertical: "linear-gradient(180deg, #B7BDD4 0%, #515986 50%, #3A3F66 100%)",
    },
    secondary: {
      light: "#E5E8F2",
      main: "#CDD1E0",
      dark: "#B7BDD4",
    },
    accent: {
      light: "#D1D8F2",
      main: "#7881C2",
      dark: "#515986",
      gradient: "linear-gradient(135deg, #D1D8F2 0%, #7881C2 50%, #515986 100%)",
    },
    neutral: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    success: {
      light: "#E6F4EC",
      main: "#34D399",
      dark: "#059669",
      gradient: "linear-gradient(135deg, #E6F4EC 0%, #34D399 50%, #059669 100%)",
    },
    warning: {
      light: "#FEF3C7",
      main: "#FBBF24",
      dark: "#B45309",
      gradient: "linear-gradient(135deg, #FEF3C7 0%, #FBBF24 50%, #B45309 100%)",
    },
    error: {
      light: "#FEE2E2",
      main: "#EF4444",
      dark: "#B91C1C",
      gradient: "linear-gradient(135deg, #FEE2E2 0%, #EF4444 50%, #B91C1C 100%)",
    },
    info: {
      light: "#DBEAFE",
      main: "#60A5FA",
      dark: "#1D4ED8",
      gradient: "linear-gradient(135deg, #DBEAFE 0%, #60A5FA 50%, #1D4ED8 100%)",
    },
    hr: {
      employee: "#10B981",
      manager: "#7881C2",
      admin: "#FBBF24",
      department: "#38BDF8",
      payroll: "#EC4899",
      attendance: "#84CC16",
    },
    status: {
      pending: "#FBBF24",
      approved: "#22C55E",
      rejected: "#EF4444",
      draft: "#6B7280",
      inReview: "#7881C2",
      active: "#10B981",
      inactive: "#9CA3AF",
    },
    white: "#FFFFFF",
    black: "#000000",
    
    background: {
      primary: "#FFFFFF",
      secondary: "#F4F6FA",   // New: very light blue-gray
      tertiary: "#E8EBF2",    // New: matches CDD1E0 family
      accent: "#E0E4F0",      // New: soft indigo-tinted gray
    },
    
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
      tertiary: "#9CA3AF",
      inverse: "#FFFFFF",
      accent: "#515986",
    },
    
    border: {
      light: "#F3F4F6",
      main: "#E5E7EB",
      dark: "#D1D5DB",
      accent: "#B7BDD4",
    }
  },
  
  shadows: {
    sm: "0 1px 2px 0 rgba(81, 89, 134, 0.05)",
    md: "0 4px 6px -1px rgba(81, 89, 134, 0.1), 0 2px 4px -1px rgba(81, 89, 134, 0.06)",
    lg: "0 10px 15px -3px rgba(81, 89, 134, 0.1), 0 4px 6px -2px rgba(81, 89, 134, 0.05)",
    xl: "0 20px 25px -5px rgba(81, 89, 134, 0.1), 0 10px 10px -5px rgba(81, 89, 134, 0.04)",
    glow: "0 0 20px rgba(81, 89, 134, 0.3)",
    card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    hover: "0 4px 12px 0 rgba(81, 89, 134, 0.15)",
    focus: "0 0 0 3px rgba(81, 89, 134, 0.1)",
  },
  
  breakpoints: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  
  // Spacing scale
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
  },
  
  // Border radius
  borderRadius: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    full: "9999px",
  },
  
  // Typography scale
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      mono: ["Fira Code", "Consolas", "monospace"],
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "32px",
      "4xl": "40px",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.2",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
  
  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  
  // Animation/transition values
  animation: {
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.5s",
    easing: {
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
};