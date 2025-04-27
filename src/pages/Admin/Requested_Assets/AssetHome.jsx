import AssetHomeCard from "../../../components/Asset/AssetMonitoring/AssetHomeCard";
import "../../css/AssetHome.css";
import { useNavigate } from "react-router-dom";

function AssetHome() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Electronics & IT",
      label: "Electronics & IT",
      image: "./Asset/Electronic And IT.png",
    },
    {
      name: "Office Supplies",
      label: "Office Supplies",
      image: "./Asset/Stationary Items.png",
    },
    {
      name: "Furniture",
      label: "Furniture",
      image: "./Asset/Furniture.png",
    },
    {
      name: "Electrical Appliances",
      label: "Electrical Appliances",
      image: "./Asset/Maintenance Tools.png",
    },
    {
      name: "Machinery & Tools",
      label: "Machinery & Tools",
      image: "./Asset/Mechanices.png",
    },
    {
      name: "Miscellaneous",
      label: "Miscellaneous",
      image: "./Asset/Extra Items.png",
    },
  ];

  const handleCardClick = (category) => {
    navigate("/Admin-AssetMonitoring", {
      state: { category: category.name },
    });
  };

  return (
    <div className="asset-home">
      {categories.map((category, index) => (
        <div key={index} onClick={() => handleCardClick(category)}>
          <AssetHomeCard name={category.label} image={category.image} />
        </div>
      ))}
    </div>
  );
}

export default AssetHome;
