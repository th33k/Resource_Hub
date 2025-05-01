import { useState, useEffect, useMemo } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import { Plus, Search } from "lucide-react";
import MealTypeCard from "../../../components/Meal/MealTypeCard";
import { MealCardPopup as AddMealTypePopup } from "../../../components/Meal/AddMealTypePopup";
import EditMealTypePopup from "../../../components/Meal/EditMealTypePopup";
import DeleteMealTypePopup from "../../../components/Meal/DeleteMealTypePopup";
import AdminLayout from "../../../layouts/Admin/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MealTypes = () => {
  const [mealTypes, setMealTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState(null);

  useEffect(() => {
    fetchMealTypes();
  }, []);

  const fetchMealTypes = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/meals-939/v1.0/mealtype"
      );
      if (!response.ok) throw new Error("Failed to fetch meal types");
      const data = await response.json();
      setMealTypes(data);
    } catch (error) {
      console.error("Error fetching meal types:", error);
      toast.error("Failed to load meal types!");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMealType = async (newMealType) => {
    try {
      const response = await fetch(
        "https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/meals-939/v1.0/mealtype/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMealType),
        }
      );

      if (!response.ok) throw new Error("Failed to add meal type");
      toast.success("Meal type added successfully!");
      fetchMealTypes();
      setIsAddOpen(false);
    } catch (error) {
      console.error("Error adding meal type:", error);
      toast.error("Failed to add meal type!");
    }
  };

  const handleEditMealType = async (editedMealType) => {
    try {
      const response = await fetch(
        `https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/meals-939/v1.0/mealtype/edit/${selectedMealType.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedMealType),
        }
      );

      if (!response.ok) throw new Error("Failed to update meal type");
      toast.success("Meal type updated successfully!");
      fetchMealTypes();
      setIsEditOpen(false);
      setSelectedMealType(null);
    } catch (error) {
      console.error("Error updating meal type:", error);
      toast.error("Failed to update meal type!");
    }
  };

  const handleDeleteMealType = async () => {
    try {
      const response = await fetch(
        `https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/meals-939/v1.0/mealtype/delete/${selectedMealType.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete meal type");
      toast.success("Meal type deleted successfully!");
      fetchMealTypes();
      setIsDeleteOpen(false);
      setSelectedMealType(null);
    } catch (error) {
      console.error("Error deleting meal type:", error);
      toast.error("Failed to delete meal type!");
    }
  };

  const filteredMealTypes = useMemo(
    () =>
      mealTypes.filter((mealType) =>
        mealType.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [mealTypes, searchText]
  );

  const handleEdit = (mealType) => {
    setSelectedMealType(mealType);
    setIsEditOpen(true);
  };

  const handleDelete = (mealType) => {
    setSelectedMealType(mealType);
    setIsDeleteOpen(true);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen space-y-6 p-6">
        <h1 className="text-2xl font-semibold">Meal Types</h1>

        <div className="flex justify-between items-center">
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            className="w-64"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{ startAdornment: <Search size={20} /> }}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={20} />}
            onClick={() => setIsAddOpen(true)}
          >
            Add Meal Type
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredMealTypes.map((mealType) => (
              <MealTypeCard
                key={mealType.id}
                mealType={mealType}
                onEdit={() => handleEdit(mealType)}
                onDelete={() => handleDelete(mealType)}
              />
            ))}
          </div>
        )}

        <AddMealTypePopup
          open={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAddMealType}
        />

        {selectedMealType && (
          <>
            <EditMealTypePopup
              open={isEditOpen}
              mealType={selectedMealType}
              onClose={() => {
                setIsEditOpen(false);
                setSelectedMealType(null);
              }}
              onEdit={handleEditMealType}
            />

            <DeleteMealTypePopup
              open={isDeleteOpen}
              mealType={selectedMealType}
              onClose={() => {
                setIsDeleteOpen(false);
                setSelectedMealType(null);
              }}
              onDelete={handleDeleteMealType}
            />
          </>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AdminLayout>
  );
};

export default MealTypes;