import Storehouses from "./components/Storehouses/Storehouses";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes//lara-dark-amber/theme.css";
import "primeicons/primeicons.css";
import classes from "./classes.module.css";
import StorehouseItems from "./components/StorehouseItems/StorehouseItems";
import { Panel } from "primereact/panel";
import CarModels from "./components/CarModels/CarModels";
import { ScrollPanel } from "primereact/scrollpanel";

const App = () => {
  return (
    <PrimeReactProvider>
      <div className={classes.root}>
        <div className={classes.left}>
          <CarModels />
          <div className={classes.storehouses}>
            <Storehouses />
          </div>
          <StorehouseItems />
        </div>
        <div className={classes.right}>
          <Panel header="Settings">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam id nam animi mollitia odio? A nesciunt, doloremque blanditiis sequi aspernatur maiores minima unde numquam iusto, harum ex laboriosam optio amet.</Panel>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default App;
