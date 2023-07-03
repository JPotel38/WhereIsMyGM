function useDeleteGame() {
    const deleteGame = async (url: string) => {
        await fetch(url,
            {method: 'DELETE'});
    }
    return {deleteGame}
}

export default useDeleteGame;
