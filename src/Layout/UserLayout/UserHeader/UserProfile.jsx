import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import './UserHeader.css';

const settings = [
  { name: 'Profile', icon: <PersonIcon /> },
  { name: 'Settings', icon: <SettingsIcon /> },
  { name: 'Logout', icon: <LogoutIcon /> }
];

function UserProfile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();  

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/login');  
    handleCloseMenu();  
  };

  return (
    <Box className="profileBox">
      <Tooltip title="Open settings">
        <IconButton className="profileButton">
          <Avatar className="profileAvatar" alt="User Avatar" src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=612x612&w=0&k=20&c=kPvoBm6qCYzQXMAn9JUtqLREXe9-PlZyMl9i-ibaVuY=" />
          <Box className="profileText">
            <Typography className="profileName" sx={{fontSize:"16px"}}>John Doe</Typography>
            <Typography className="profileEmail" sx={{fontSize:"12px"}}>jhondoe@gmail.com</Typography>
          </Box>
          <ArrowDropDownIcon className="profileArrow" onClick={handleOpenMenu} sx={{fontSize:"35px"}} />
        </IconButton>
      </Tooltip>

      <Menu
        className="profileMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        disableScrollLock={true} 
      >
        {settings.map((setting) => (
          <MenuItem 
            key={setting.name} 
            onClick={setting.name === 'Logout' ? handleLogout : handleCloseMenu} 
            className="profileMenuItem"
          >
            {setting.icon}
            <Typography className="profileMenuText">
              {setting.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserProfile;