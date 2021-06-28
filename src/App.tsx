import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";

import { Home } from "./pages/Home";
import { NewRoow } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" exact component={NewRoow}/>
          <Route path="/rooms/:id" component={Room}/>
        </Switch>
      </AuthContextProvider>      
    </BrowserRouter>
  );
}

export default App;
