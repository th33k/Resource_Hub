import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MealCard from '../../../components/Meal/MealTime/MealTimeCard';
import { MealCardPopup } from '../../../components/Meal/MealTime/AddMealTimePopup';
import '../../css/AddMealTime.css';
import AdminLayout from '../../../layouts/Admin/AdminLayout';
import { BASE_URLS } from '../../../services/api/config';

function AddMealTime() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mealTimes, setMealTimes] = useState([]);
  const [error, setError] = useState(null);

  const title = 'Add New Meal Time';
  const getSubtitle = () => 'Manage meal times for the day';

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

  const handleDelete = async (mealId) => {
    try {
      const response = await fetch(`${BASE_URLS.mealtime}/details/${mealId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchMealTimes();
      } else {
        setError('Failed to delete meal time');
      }
    } catch (error) {
      setError(`Error deleting meal time: ${error.message}`);
    }
  };

  const fetchMealTimes = async () => {
    try {
      const response = await fetch(`${BASE_URLS.mealtime}/details`);
      if (!response.ok) {
        throw new Error('Failed to fetch meal times');
      }
      const data = await response.json();
      setMealTimes(data);
    } catch (error) {
      setError(`Error fetching meal times: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchMealTimes();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen space-y-6 p-6">
        <h1 className="text-2xl font-semibold">Meal times</h1>

        <Button
          variant="contained"
          className="addbtn"
          onClick={handlePopupOpen}
        >
          New Meal Time
          <span className="addicon">
            <AddIcon />
          </span>
        </Button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="mealtimes">
          {mealTimes.length > 0 ? (
            mealTimes.map((meal) => (
              <MealCard
                key={meal.mealtime_id}
                mealId={meal.mealtime_id}
                name={meal.mealtime_name}
                image={meal.mealtime_image_url || '/default-meal.png'}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No meal times available</p>
          )}
        </div>

        <MealCardPopup
          open={isPopupOpen}
          onClose={handlePopupClose}
          title={title}
          subtitle={getSubtitle()}
          onSubmit={fetchMealTimes}
        />
      </div>
    </AdminLayout>
  );
}

export default AddMealTime;
