import './App.css';
import Fib from './Fib';
import OtherPage from './OtherPage';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          I'm React Hero 1.1
          <Link to="/">Home</Link>
          <Link to="/otherPage">Other Page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib}/>
          <Route path="/otherPage" component={OtherPage}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
