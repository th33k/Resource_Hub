
import MaintenenHomeCard from "../../../components/Maintenance/MaintenanceHomeCard";
import '../../css/MaintenanceHome.css';


function Maintenen(){

  
    return (
      <div>
        <div className="maintenen">
          <MaintenenHomeCard 
          name="Tech  Support" 
          image="/Maintenance/TechSupport.png" 
          route={"../admin-maintenanceDetails"} />
       
          <MaintenenHomeCard 
          name="General Maintenance" 
          image="/Maintenance/genaralmaintanance.png" 
          route={"../admin-maintenanceDetails"} />

          <MaintenenHomeCard
            name="Cleaning and Hygiene"
            image="/Maintenance/hand.png"
            route={"../admin-maintenanceDetails"}
          />
          <MaintenenHomeCard
            name="Furniture and Fixtures"
            image="/Maintenance/FeernituresAndPictures.png"
            route={"../admin-maintenanceDetails"}
          />
          <MaintenenHomeCard
            name="Safety and Security"
            image="/Maintenance/officer.png"
            route={"../admin-maintenanceDetails"}
          />
          <MaintenenHomeCard
            name="Lighting and Power"
            image="/Maintenance/bulb.png"
            route={"../admin-maintenanceDetails"}
          />
        </div>
      </div>
    );
}
export default Maintenen;
