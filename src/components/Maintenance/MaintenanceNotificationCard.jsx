import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Chip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

// Priority level configurations (1-5 scale)
const getPriorityConfig = (level) => {
  const configs = {
    "5": { color: "#D32F2F", label: "Critical" },
    "4": { color: "#F57C00", label: "High" },
    "3": { color: "#FFC107", label: "Medium" },
    "2": { color: "#2196F3", label: "Low" },
    "1": { color: "#4CAF50", label: "Info" }
  };
  
  return {
    ...configs[level] || configs["1"],
    icon: ErrorIcon // Using same icon for all levels
  };
};

export const MaintenanceNotificationCard = ({ notification }) => {
  // Get priority level (1-5) from notification, default to 5 if not provided
  const priorityLevel = notification.priorityLevel || "5";
  
  // Get configuration based on priority level
  const config = getPriorityConfig(priorityLevel);
  
  // Icon component based on priority
  const IconComponent = config.icon;

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        display: "flex",
        width: "100%",
        minHeight: "80px",
        my: 1,
        borderLeft: `4px solid ${config.color}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
        }
      }}
    >
      {/* Icon Section */}
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          p: 1.5,
          width: "60px"
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: `${config.color}10`, 
            color: config.color,
            width: 40,
            height: 40
          }}
        >
          <IconComponent fontSize="small" />
        </Avatar>
      </Box>
      
      {/* Content Section */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          p: 1.5,
          flexGrow: 1
        }}
      >
        <Box display="flex" alignItems="center" mb={0.5}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {notification.name}
          </Typography>
          <Chip 
            label={`P${priorityLevel}: ${config.label}`}
            size="small"
            sx={{ 
              ml: 1.5,
              bgcolor: `${config.color}10`, 
              color: config.color,
              border: `1px solid ${config.color}30`
            }} 
          />
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {notification.description}
        </Typography>
      </Box>
      
      {/* Date & Actions Section */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          p: 1.5,
          width: "160px"
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {notification.date}
        </Typography>
        
        {notification.actions && (
          <Box display="flex" gap={0.5} mt={1}>
            {notification.actions.slice(0, 2).map((action, index) => (
              <Chip 
                key={index}
                label={action}
                clickable
                size="small"
                sx={{ 
                  bgcolor: index === 0 ? `${config.color}10` : 'white',
                  color: index === 0 ? config.color : 'text.secondary',
                  border: index === 0 ? `1px solid ${config.color}30` : '1px solid #e0e0e0'
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Card>
  );
};