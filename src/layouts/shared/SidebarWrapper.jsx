import React from "react";
import {
  Box,
  Drawer,
  styled,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useSidebar } from "../../contexts/SidebarContext";

const SidebarContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.mode === 'dark' 
    ? '#1a1b25' 
    : theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

const SidebarWrapper = ({
  title,
  logo,
  children,
  footerContent
}) => {
  const theme = useTheme();
  const { isOpen, isMobile, close, sidebarWidth } = useSidebar();

  const drawerContent = (
    <SidebarContainer>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: isOpen ? "space-between" : "center",
          px: [1],
          minHeight: "64px",
        }}
      >
        {isOpen && (
          <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
            {title}
          </Typography>
        )}

        {!isOpen && !isMobile && (
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
              fontWeight: "bold",
            }}
          >
            {logo}
          </Box>
        )}

        {isMobile && (
          <IconButton onClick={close} color="inherit">
            <ChevronLeft />
          </IconButton>
        )}
      </Toolbar>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      <Box sx={{ 
        flex: 1, 
        overflowY: "auto", 
        pt: 1, 
        pb: 2,
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
        },
      }}>
        {children}
      </Box>

      {footerContent && (
        <Box sx={{ marginTop: "auto", pb: 2 }}>
          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
          {footerContent}
        </Box>
      )}
    </SidebarContainer>
  );

  return (
    <>
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: sidebarWidth,
              boxSizing: "border-box",
              borderRight: 0,
              boxShadow: theme.palette.mode === 'dark' 
                ? 'none' 
                : '0 0 10px rgba(0,0,0,0.1)',
              overflow: "hidden",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open={isOpen}
        >
          {drawerContent}
        </Drawer>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={close}
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: sidebarWidth,
              boxSizing: "border-box",
              backgroundColor: theme.palette.mode === 'dark' 
                ? '#1a1b25' 
                : theme.palette.background.paper,
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default SidebarWrapper;