import {IUser} from "../interfaces/UserInterface";

async function useListUsersByGameHook(gameId: string) {
    if (gameId) {
        const response = await fetch('/users/listusersbygame/' + gameId);
        const bodyUsers = await response.json();
        return bodyUsers.filter((user: IUser) => user.isGameMaster);
    }
}

export default useListUsersByGameHook
