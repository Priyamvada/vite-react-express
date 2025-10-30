import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import MainPage from './pages/mainPage/MainPage';
// import ProtectedRoute from './components/ProtectedRoute';
import CustomerPaymentsPage from './pages/customerPaymentsPage/CustomerPaymentsPage';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/customerPayment" element={<CustomerPaymentsPage />} />

          {/* <Route element={<ProtectedRoute />}>
            
          </Route> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App;
