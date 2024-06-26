import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext(null);

export function AuthProvider({ children }) {
	return <authContext.Provider value={{
		useAccessToken: useAccessToken(),
		useSessionToken: useSessionToken()
	}}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
}

function useAccessToken() {
	const [accessToken, setAccessToken] = useState(null);

	return [accessToken, setAccessToken];
}

function useSessionToken() {
	const [sessionToken, setSessionToken] = useState(null);

	function saveSessionToken(sessionToken) {
		setSessionToken(sessionToken);
		localStorage.setItem('noticsSessionToken', sessionToken);
	}

	function clearSessionToken() {
		setSessionToken(null);
		localStorage.removeItem('noticsSessionToken')
	}

	function loadSessionToken() {
		return localStorage.getItem('noticsSessionToken')
	}

	useEffect(() => {
		setSessionToken(loadSessionToken());
	}, []);

	return [sessionToken, saveSessionToken, clearSessionToken]
}