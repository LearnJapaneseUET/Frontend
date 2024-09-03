import './App.css';
import Header from './components/Header'
import Lists from './page/Lists'
import Sidebar from './components/Sidebar';
import HomePage from './page/HomePage';
import Task from './components/Task';
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
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div>
            <Header />
          </div>

          <div className="flex flex-1">
            {/* Nội dung chính */}
            <div className="flex-1 mx-14">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/list/:id" element={<ListPage />} />
              </Routes>
            </div>

            {/* Sidebar bên phải */}
            <Task className="w-1/5" />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
