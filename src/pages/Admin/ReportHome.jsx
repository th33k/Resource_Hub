import ReportHomeCard from "../../components/Reports/ReportHomeCard"
import "../css/Reporthome.css"
function ReportHome() {
  return (
    <div className="outerreport">
      <div className="Report">
        <ReportHomeCard 
          name="Meals" 
          image="/Maintenance/11.png" 
          route={"../Admin-ReportMeals"} 
        />
       
        <ReportHomeCard 
          name="Assets" 
          image="/Maintenance/12.png" 
          route={"../Admin-ReportAssets"} 
        />

        <ReportHomeCard
          name="Maintenance"
          image="/Maintenance/11.png"
          route={"../Admin-ReportMaintenance"}
        />
      </div>
    </div>
  );
}
export default ReportHome;
