import './App.css';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from "react-router-dom";
import Login from "./components/login";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/home">
                        Home
                    </Link>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/home">
                        <h2>Home</h2>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};


export default App;
