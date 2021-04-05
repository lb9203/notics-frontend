import React, { useState, useEffect, useContext, createContext } from "react";
import { gql, useMutation } from "@apollo/client";

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

    function setSessionToken(sessionToken){
        localStorage.setItem('noticsSessionToken', sessionToken);
    }

    function getSessionToken(){
        localStorage.getItem('noticsSessionToken')
    }

    return {
        accessToken: accessToken,
        setAccessToken: setAccessToken,
        setSessionToken: setSessionToken(),
        getSessionToken: getSessionToken()
    }
}