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

    return Object.entries(RegionsAndDepartements).map(([codeRegion, {departements}]) => {
        const regionsCodeAsName = regions.find(region => region.code === codeRegion)?.nom || '';
        return [regionsCodeAsName, departements]
    }).flat(2);
}
