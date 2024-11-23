import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const TransportersContext = createContext();

export const useTransporters = () => useContext(TransportersContext);

export const TransportersProvider = ({ children }) => {
  const [transporters, setTransporters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/api/admin/get-transporters')
      .then((response) => {
        setTransporters(response.data.transporters);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch transporters');
        setLoading(false);
      });
  }, []);

  return (
    <TransportersContext.Provider value={{ transporters, loading, error }}>
      {children}
    </TransportersContext.Provider>
  );
};
