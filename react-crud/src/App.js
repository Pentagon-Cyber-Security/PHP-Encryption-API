import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import './App.css';
import './navbar.css';
import ListUser from './components/ListUser';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <nav>
          <ul>
            <li>
            <Link to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                List Users
              </Link>
            </li>
            <li>
            <Link to="user/create" className={({ isActive }) => (isActive ? 'active' : '')}>
                Create Users
              </Link>
            </li>
            {/* <li>
              <Link to="user//edit">Edit Users</Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListUser />}/>
          <Route path="user/create" element={<CreateUser />}/>
          <Route path="user/:id/edit" element={<EditUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
