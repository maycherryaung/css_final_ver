import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material'; // Importing Material UI components

const FilterButton = ({ onFilterChange }) => {
  const [filter, setFilter] = useState("totalCases"); // Default filter
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu positioning

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu when button is clicked
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu when an option is clicked
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    onFilterChange(newFilter); // Pass selected filter to parent (Heatmap)
    handleClose(); // Close the dropdown after selecting the filter
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="primary"
      >
        Select Filter
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleFilterChange("totalCases")}>Total Cases</MenuItem>
        <MenuItem onClick={() => handleFilterChange("activeCases")}>Active Cases</MenuItem>
        <MenuItem onClick={() => handleFilterChange("deaths")}>Deaths</MenuItem>
      </Menu>
    </div>
  );
};

export default FilterButton;
