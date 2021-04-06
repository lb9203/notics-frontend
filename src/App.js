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
                    <Link to="/login">
                        Login
                    </Link>
                </nav>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/">
                        <h2>Home</h2>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};


export default App;
