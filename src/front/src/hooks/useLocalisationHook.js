import React, {useEffect, useState} from 'react';

export default function useLocalisationHook() {
    const [regions, setRegions] = useState(null);
    const [departements, setDepartements] = useState(null);
    const [RegionsAndDepartements, setRegionsAndDepartements] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const responseRegions = await fetch('/geolocalisation/regions');
            const regionsData = await responseRegions.json();
            setRegions(regionsData);
            const responseDepartements = await fetch('/geolocalisation/departements');
            const departementsData = await responseDepartements.json();
            setDepartements(departementsData);
        }
        fetchData();
    }, []);

    // Crée un objet associant les régions à leurs départements respectifs avec reduce().
    // Cet objet est ensuite stocké dans le state RegionsAndDepartements.

    useEffect(() => {
        if (departements && regions) {
            const updatedRegionsAndDepartements = departements.reduce((accumulator, departement) => {
                const { codeRegion } = departement;
                accumulator[codeRegion] = accumulator[codeRegion] || { codeRegion, departements: [] };
                accumulator[codeRegion].departements.push({ nom: departement.nom });
                return accumulator;
            }, {});
            setRegionsAndDepartements(updatedRegionsAndDepartements);
        }
    }, [departements, regions]);

    //     Le hook retourne un tableau contenant les noms des régions et les listes de départements associés avec Object.entries() pour itérer sur les paires clé-valeur de l'objet RegionsAndDepartements.
    //     Pour chaque région, le code recherche le nom correspondant dans le tableau des régions (état regions) en utilisant la méthode find(). Si le nom est trouvé, il est utilisé, sinon, une chaîne vide est utilisée.
    //     Le hook retourne finalement un tableau de paires [nom de la région, liste des départements] à l'aide de map() et flat(2) pour "aplanir" la liste des départements.

    return Object.entries(RegionsAndDepartements).map(([codeRegion, {departements}]) => {
        const regionsCodeAsName = regions.find(region => region.code === codeRegion)?.nom || '';
        return [regionsCodeAsName, departements]
    }).flat(2);
}
