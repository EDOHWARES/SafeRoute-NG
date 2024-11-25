// import React, { useContext, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';  
// import { AuthContext } from '../context/AuthContext';

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const { isAuthenticated } = useContext(AuthContext);

//     useEffect(() => {
//       // You can check the authentication state here if needed
//     }, [isAuthenticated]);

//     // If the user is not authenticated, redirect to the login page
//     if (!isAuthenticated) {
//       return <Navigate to="/auth" replace />;
//     }

//     // If authenticated, render the wrapped component
//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;
