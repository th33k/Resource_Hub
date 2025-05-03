import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MealCard from "../../../components/Meal/MealType/MealTypeCard";
import { MealCardPopup } from '../../../components/Meal/MealType/AddMealTypePopup';
import '../../css/AddMealType.css';
import AdminLayout from "../../../layouts/Admin/AdminLayout";
import { API_ENDPOINTS } from '../../../services/api/config';

function AddMealType() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mealTypes, setMealTypes] = useState([]);
  const [error, setError] = useState(null);

  const title = "Add New Meal Type";
  const getSubtitle = () => "Manage meal types for the day";

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

  const handleDelete = async (mealId) => {
    try {
      const response = await fetch(API_ENDPOINTS.MEAL_TYPE_DELETE(mealId), {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchMealTypes();
      } else {
        setError("Failed to delete meal type");
      }
    } catch (error) {
      setError(`Error deleting meal type: ${error.message}`);
    }
  };

  const fetchMealTypes = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.MEAL_TYPE_DETAILS);
      if (!response.ok) {
        throw new Error('Failed to fetch meal types');
      }
      const data = await response.json();
      setMealTypes(data);
    } catch (error) {
      setError(`Error fetching meal types: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchMealTypes();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen space-y-6 p-6">
        <h1 className="text-2xl font-semibold">Meal types</h1>
        
        <Button
          variant="contained"
          className="addbtn"
          onClick={handlePopupOpen}
        >
          New Meal Type
          <span className="addicon"><AddIcon /></span>
        </Button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="mealtimes">
          {mealTypes.length > 0 ? (
            mealTypes.map((meal) => (
              <MealCard
                key={meal.id}
                mealId={meal.id}
                name={meal.mealName}
                image={meal.mealImageUrl || '/default-meal.png'}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No meal types available</p>
          )}
        </div>

        <MealCardPopup
          open={isPopupOpen}
          onClose={handlePopupClose}
          title={title}
          subtitle={getSubtitle()}
          onSubmit={fetchMealTypes}
        />
      </div>
    </AdminLayout>
  );
}

export default AddMealType;
