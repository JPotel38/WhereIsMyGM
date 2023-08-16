import {IUser} from "../interfaces/UserInterface";

async function useGameMastersListHook(url: string) {
    const response = await fetch(url);
    const bodyUsers = await response.json();
    return bodyUsers.filter((user: IUser) => user.isGameMaster);
}

export default useGameMastersListHook
