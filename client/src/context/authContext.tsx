import {createContext} from "react";

function noop (token: any, id: any) {};
function noop1 () {};

const authContext = createContext({
    userId: null,
    login: noop,
    logout: noop1,
    isAuthenticated: false
});

export default authContext;
