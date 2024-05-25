import React, { useState } from 'react';
import { Grid, Button, MenuItem, FormControl, Select } from '@mui/material';
import Navbar from './Navbarr';
import FitnessEquipment from './FitnessEquipment';
import SportsWear from './SportsWear';
import Nutrition from './Nutrition';

function Categories() {
  const maxInitialProducts = 6; 
  const [selectedCategory, setSelectedCategory] = useState('Fitness'); 

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                displayEmpty
                inputProps={{ 'aria-label': 'category' }}
              >
                <MenuItem value="Fitness">Fitness Equipment</MenuItem>
                <MenuItem value="Sports">Sports Wear</MenuItem>
                <MenuItem value="Nutrition">Nutrition</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {selectedCategory === 'Fitness' && <FitnessEquipment maxProducts={maxInitialProducts} />}
            {selectedCategory === 'Sports' && <SportsWear maxProducts={maxInitialProducts} />}
            {selectedCategory === 'Nutrition' && <Nutrition maxProducts={maxInitialProducts} />}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Categories;
