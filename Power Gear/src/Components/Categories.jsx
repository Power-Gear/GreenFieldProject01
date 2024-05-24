import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import Navbar from './Navbarr';
import FitnessEquipment from './FitnessEquipment';
import SportsWear from './SportsWear';
import Nutrition from './Nutrition';

function Categories() {
  const maxInitialProducts = 6; // Maximum number of products to display initially
  const [showAllFitness, setShowAllFitness] = useState(false);
  const [showAllSports, setShowAllSports] = useState(false);
  const [showAllNutrition, setShowAllNutrition] = useState(false);

  const handleSeeMoreFitness = () => setShowAllFitness(true);
  const handleSeeMoreSports = () => setShowAllSports(true);
  const handleSeeMoreNutrition = () => setShowAllNutrition(true);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FitnessEquipment maxProducts={maxInitialProducts} showAll={showAllFitness} />
            
          </Grid>
          <Grid item xs={12}>
            <SportsWear maxProducts={maxInitialProducts} showAll={showAllSports} />
            
          </Grid>
          <Grid item xs={12}>
            <Nutrition maxProducts={maxInitialProducts} showAll={showAllNutrition} />
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Categories;
