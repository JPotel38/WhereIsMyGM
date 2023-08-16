async function useGamesDetailsHook(id: string) {
    const data = await fetch('/games/cardsgamesbyid/' + id)
    return await data.json();
}

export default useGamesDetailsHook
