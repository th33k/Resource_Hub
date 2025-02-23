
import MaintenenHomeCard from "../../components/Maintenance/MaintenanceHomeCard";
import '../css/MaintenanceHome.css';


function Maintenen(){

  
    return (
      <div>
        <div className="maintenen">
          <MaintenenHomeCard name="Tech Support" image="/Maintenance/11.png" route={"../Admin-maintenanceDetails"} />
       
          <MaintenenHomeCard name="Tech Support" image="/Maintenance/12.png" route={"../Admin-maintenanceDetails"} />

          <MaintenenHomeCard
            name="Maintenance"
            image="/Maintenance/11.png"
            route={"../Admin-maintenanceDetails"}
          />
          <MaintenenHomeCard
            name="Tech

Support"
            image="/Maintenance/11.png"
            route={"../Admin-maintenanceDetails"}
          />
          <MaintenenHomeCard
            name="Furniture &

Fixtures
"
            image="/Maintenance/11.png"
            route={"../Admin-maintenanceDetails"}
          />
          <MaintenenHomeCard
            name="Safety &

Security"
            image="/Maintenance/11.png"
            route={"../Admin-maintenanceDetails"}
          />
        </div>
      </div>
    );
}
export default Maintenen;
