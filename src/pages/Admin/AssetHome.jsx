import AssetHomeCard from "../../components/Asset/AssetHomePage/AssetHomeCard";
import "../css/AssetHome.css";

function AssetHome() {
  const categories = [
    {
      name: "Electronics & IT",
      label: "Electronic And IT",
      image: "./Asset/Electronic And IT.png",
    },
    {
      name: "Stationary",
      label: "Stationary Items",
      image: "./Asset/Stationary Items.png",
    },
    {
      name: "Furniture",
      label: "Furniture",
      image: "./Asset/Furniture.png",
    },
    {
      name: "Maintenance Tools",
      label: "Maintenance Tools",
      image: "./Asset/Maintenance Tools.png",
    },
    {
      name: "Machines",
      label: "Mechanics",
      image: "./Asset/Mechanices.png",
    },
    {
      name: "Extra Items",
      label: "Extra Items",
      image: "./Asset/Extra Items.png",
    },
  ];

  return (
    <div className="asset-home">
      {categories.map((category, index) => (
        <AssetHomeCard
          key={index}
          name={category.label}
          image={category.image}
          route={`/admin-AssetMonitoring/${encodeURIComponent(category.name)}`}
        />
      ))}
    </div>
  );
}

export default AssetHome;
