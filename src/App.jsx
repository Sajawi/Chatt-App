import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './Pages/LogInPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import MissingPage from './Pages/MissingPage';


export default function App() {
  const [loggedIn, setLogin] = useState(false);

  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route
              path='/myProfile'
              element={
                <ProfilePage setLoginParent={setLogin} loggedIn={loggedIn} />
              }
            />
            <Route path='/' element={<LogInPage loggedIn={loggedIn} />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/*' element={<MissingPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}