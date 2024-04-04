import Storehouses from "./features/storehouses/Storehouses";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes//lara-dark-amber/theme.css";
import "primeicons/primeicons.css";
import classes from "./classes.module.css"

const App = () => {
  return (
    <PrimeReactProvider>
      <div className={classes.root}>
        <div className={classes.left}>
          <div className={classes.storehouses}><Storehouses /></div>
        </div>
        <div>
          Component Settings
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default App;
