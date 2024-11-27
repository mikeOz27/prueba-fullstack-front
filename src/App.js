import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'; // Solo el CSS necesario
import Sede from './components/Sede';
import Login from './components/Login';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); // Se obtiene el token del localStorage
  const [userAuth, setUser] = useState(JSON.parse(localStorage.getItem('userAuth'))); // Se obtiene el usuario autenticado del localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userAuth');
    setToken(null);
    setUser(null);
  };

  return (
    <>
		<Router>
			<Routes>
				<Route path="/login" element={token ? <Navigate to="/" /> : <Login setToken={setToken} setUser={setUser} />} />
					<Route path="/"
						element={
							token ? (
								<>
									{/* se pasa el token, userAuth, onLogout */}
									<Sede
										token={token}
										userAuth={userAuth}
										onLogout={handleLogout}
									/>
								</>
							) : (
								<Navigate to="/login" />
							)
						}
					/>
			</Routes>
    	</Router>
    </>

  );
}

export default App;
