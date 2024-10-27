import React, { createContext, useContext, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

// Create the context
const SpinnerContext = createContext();

// Custom hook to use the Spinner context
export const useSpinner = () => useContext(SpinnerContext);

// Provider component to wrap the app
export const SpinnerProvider = ({ children }) => {
    const { Spinner, setWaiting } = LoadingSpinner();
    const [isWaiting, setIsWaiting] = useState(false); // Optional state tracking

    return (
        <SpinnerContext.Provider value={{ setWaiting, isWaiting, setIsWaiting }}>
            {children}
            <Spinner />
        </SpinnerContext.Provider>
    );
};
