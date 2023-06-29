import {useContext} from "react";
import {authContext} from "../AuthContext";

async function useGamesByUserHook(url: string) {
    const {auth} = useContext(authContext);

    if (auth.data.user) {
        const response = await fetch(url + auth.data.user._id);
        return await response.json();
    }
}

export default useGamesByUserHook
