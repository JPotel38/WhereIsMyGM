import {useContext} from "react";
import {authContext} from "../AuthContext";
import {useHistory} from "react-router-dom";

function useAccess() {
    const {setAuthData} = useContext(authContext);
    const history = useHistory();

    const access = async (url: string, headers: {}, body: string) => {
        const response = await fetch(url, {
            method: `POST`,
            headers: headers,
            body: body
        });
        const res = await response.json();
        if (res.token[0]) {
            setAuthData({token: res.token[0], user: res.user});
            history.replace('/');
        }
    };
    return {access};
}

export default useAccess;
