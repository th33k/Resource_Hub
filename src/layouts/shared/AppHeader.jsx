import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  MoreVert as MoreIcon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";
import { useSidebar } from "../../contexts/SidebarContext";
import { useThemeContext } from "../../theme/ThemeProvider";
import { useUser } from "../../contexts/UserContext";

// Shared components
import ModeToggle from "./ModeToggle";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";

const AppHeader = ({ 
  title = "Dashboard", 
  logo = "D", 
  showCart = false, 
  cartCount = 0,
  notificationCount = 0,
  showSettings = true,
  showOrdersInProfile = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggle } = useSidebar();
  const { toggleMode } = useThemeContext();
  const { userData, isAdmin, toggleAdminMode } = useUser();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ minHeight: "64px !important" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggle}
            sx={{ mr: 2 }}
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "#fff",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                mr: 1,
                fontWeight: "bold",
              }}
            >
              {logo}
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                letterSpacing: 0.5,
                display: { xs: "none", sm: "block" },
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
          {/* Only render ModeToggle if user has Admin role */}
          {userData.role === "Admin" && (
            <ModeToggle isAdmin={isAdmin} toggleAdminMode={toggleAdminMode} />
          )}

          {!isMobile ? (
            <>
              {showCart && (
                <Tooltip title="Cart">
                  <IconButton
                    size="large"
                    color="inherit"
                    sx={{
                      bgcolor: theme.palette.background.default,
                      "&:hover": { bgcolor: theme.palette.action.hover },
                    }}
                  >
                    <Badge badgeContent={cartCount} color="error">
                      <CartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Notifications">
                <IconButton
                  size="large"
                  color="inherit"
                  sx={{
                    bgcolor: theme.palette.background.default,
                    "&:hover": { bgcolor: theme.palette.action.hover },
                  }}
                >
                  <Badge badgeContent={notificationCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {showSettings && (
                <Tooltip title="Settings">
                  <IconButton
                    size="large"
                    color="inherit"
                    sx={{
                      bgcolor: theme.palette.background.default,
                      "&:hover": { bgcolor: theme.palette.action.hover },
                    }}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
              )}

              <ThemeToggle />
            </>
          ) : (
            <IconButton
              size="large"
              color="inherit"
              onClick={handleMobileMenuOpen}
              sx={{
                bgcolor: theme.palette.background.default,
                "&:hover": { bgcolor: theme.palette.action.hover },
              }}
            >
              <MoreIcon />
            </IconButton>
          )}

          <ProfileMenu showOrdersOption={showOrdersInProfile} />
        </Box>
      </Toolbar>

      <MobileMenu 
        anchorEl={mobileMoreAnchorEl}
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        toggleMode={toggleMode}
        notificationCount={notificationCount}
        showCart={showCart}
        cartCount={cartCount}
      />
    </AppBar>
  );
};

export default AppHeader;