import {useEffect, useState} from 'react';

function useGamesList(url) {
    const [listGames, setListGames] = useState([]);
    useEffect(() => {
        const fetchGameList = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data)
                setListGames(data.sort((a, b) => {
                    const x = a.title.toLowerCase();
                    const y = b.title.toLowerCase();
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                }));
            } catch (error) {
                console.error('Error fetching games list:', error);
            }
        };

        fetchGameList();
    }, [url]);
    return listGames;
}

export default useGamesList;
