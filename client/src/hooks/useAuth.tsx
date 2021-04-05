import {useState, useCallback} from "react";


const storageName: string = "userData";

const useAuth = () => {
    const [Token, setToken] = useState(JSON.parse(localStorage.getItem(storageName)!));
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) =>
    {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, []);


    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(storageName);
    }, []);

    return {Token, userId, login, logout};
};

export default useAuth;