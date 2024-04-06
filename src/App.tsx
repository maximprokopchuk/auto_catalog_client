import Storehouses from "./components/Storehouses/Storehouses";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes//lara-dark-amber/theme.css";
import "primeicons/primeicons.css";
import classes from "./classes.module.css";
import StorehouseItems from "./components/StorehouseItems/StorehouseItems";
import CarModels from "./components/CarModels/CarModels";
import Settings from "./components/Settings/Settings";

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
          <Settings />
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default App;
