import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import './UserHeader.css';

function UserSearch() {
    return (
        <Paper component="form" className="searchBox" sx={{borderRadius:'28px'}}>
            <IconButton className="searchBox__icon" aria-label="menu">
                <ArrowForwardIcon />
            </IconButton>
            <InputBase
                className="searchBox__input"
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search' }}
            />
            <IconButton type="button" className="searchBox__icon" aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default UserSearch;