import AssetHomeCard from "../../components/Asset/AssetHomePage/AssetHomeCard";
import '../css/AssetHome.css';

function AssetHome(){
    return (
      <div>
        <div className="asset-home">
          <AssetHomeCard name="Electronic And IT" image="./Asset/Electronic And IT.png" route={"../Admin-assetDetails"} />
          
          <AssetHomeCard name="Stationary Items" image="./Asset/Stationary Items.png" route={"../Admin-assetDetails"} />

          <AssetHomeCard name="Furniture" image="./Asset/Furniture.png" route={"../Admin-assetDetails"} />
          
          <AssetHomeCard name="Maintenance Tools" image="./Asset/Maintenance Tools.png" route={"../Admin-assetDetails"} />
          
          <AssetHomeCard name="Mechanices" image="./Asset/Mechanices.png" route={"../Admin-assetDetails"} />
          
          <AssetHomeCard name="Extra Items" image="./Asset/Extra Items.png" route={"../Admin-assetDetails"} />

          
        </div>
      </div>
    );
}

export default AssetHome;