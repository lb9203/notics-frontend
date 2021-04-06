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
                </Switch>
            </div>
        </Router>
    );
};


export default App;
