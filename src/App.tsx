import "./App.css";
import Storehouses from "./features/storehouses/Storehouses";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primeicons/primeicons.css";

const App = () => {
  return (
    <PrimeReactProvider>
      <div className="App">
        <main>
          <Storehouses />
        </main>
      </div>
    </PrimeReactProvider>
  );
};

export default App;
