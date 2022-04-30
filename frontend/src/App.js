import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminPage from './components/AdminPage';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import React from 'react';
import UserTable from './components/UserTable';
import EditUser from './components/EditUser';
import UserPage from './components/UserPage';
import RecipesPage from './components/RecipesPage';
import AddRecipes from './components/AddRecipes';
import AddFood from './components/AddFood';
import Basket from './components/Basket';
import History from './components/HistoryPage'
import IngredientsPage from './components/IngredientsPage';
import AdminRecipes from './components/AdminRecipes';

const AdminPath = '/admin';

function App() {
  return (
    <Router>
      <div className='App'>
        {window.location.pathname.toLowerCase().startsWith(AdminPath) ? (
          <AdminViews />
        ) : (
          <UserViews />
        )}
      </div>
    </Router>
  );
}

// Contains all the User routes
const UserViews = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Route exact path='/' component={LandingPage} />
      <Route path='/login' component={LogIn} />
      <Route path='/register' component={Register} />
      <Route path='/profile' component={Profile} />
      <Route path='/user' component={UserPage} />
      <Route exact path='/recipes/make' component={AddRecipes} />
      <Route exact path='/recipes' component={RecipesPage} />
      <Route path='/food' component={AddFood} />
      <Route path='/basket' component={Basket} />
      <Route path='/history' component={History} />
      <Route path='/user' component={LandingPage} />
      <Footer />
    </React.Fragment> 
  );
};

//Contains all the Admin routes
const AdminViews = () => {
  return (
    <React.Fragment>
      <Route path={AdminPath} component={AdminPage} />
      <Route path='/admin/usertable' component={UserTable} />
      <Route path='/admin/edit/:id' component={EditUser} />
      <Route path='/admin/ingredientstable' component={IngredientsPage} />
      <Route path='/admin/recipestable' component={AdminRecipes} />


    </React.Fragment>
  );
};
export default App;
