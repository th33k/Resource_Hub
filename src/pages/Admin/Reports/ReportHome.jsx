import ReportHomeCard from "../../../components/Report/ReportHomeCard"
import "../../css/ReportHome.css"
function ReportHome() {
  return (
    <div className="outerreport">
      <div className="Report">
        <ReportHomeCard 
          name="Meals" 
          image="/Report/meal.png" 
          route={"../Admin-MealReport"} 
        />
       
        <ReportHomeCard 
          name="Assets" 
          image="/Report/asset.png" 
          route={"../Admin-AssetReport"} 
        />

        <ReportHomeCard
          name="Maintenance"
          image="/Report/maintenance.png"
          route={"../Admin-MaintenanceReport"}
        />
      </div>
    </div>
  );
}
export default ReportHome;
