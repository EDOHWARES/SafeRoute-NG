// // context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check for token in localStorage or cookies on initial load
//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
