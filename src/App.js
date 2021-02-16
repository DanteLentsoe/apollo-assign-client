import "../src/index.css";
import Home from "../src/pages/Home";
import Error from "../src/pages/404";
import {Route, Switch} from "react-router-dom";


function App() {

  
  return (
    <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={Error} />
            </Switch>
    </>
  );
}

export default App;
