import {useEffect} from 'react';

function useAddGameByIdByUser(url: string) {
    useEffect(() => {
        const addGame = async () => {
            try {
                await fetch(url, {
                    method: 'POST',
                });
            } catch (error) {
                console.error(error);
            }
        };

        addGame();
    }, [url]);
}

export default useAddGameByIdByUser;
