import './App.css';
import Header from './components/Header'
import Lists from './page/Lists'
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ListPage from './page/ListPage';

function App() {
  return (
    <Router>
      <div className="App flex" >
        <Sidebar className="w-1/5"/>
        <div className="flex-1">
          <div className="mb-3">
            <Header/>
          </div>
          <div className="px-10">
            <Routes>
              <Route path="/" element={<Lists />} />
              <Route path="/list/:id" element={<ListPage/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
