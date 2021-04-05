import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext({});

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
}

function useProvideAuth() {
    const [accessToken, setAccessToken] = useState(null);

    const login = (email, password) => {

    }
}