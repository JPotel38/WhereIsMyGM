import React from 'react';

async function fetchRegions() {
    const response = await fetch('/geolocalisation/regions');
    return response.json();
}

export async function fetchDepartements() {
    const response = await fetch('/geolocalisation/departements');
    const bodyDepartements = await response.json();
    const regionArray = await fetchRegions();
    const mergedRegionsAndDepartements = bodyDepartements.reduce((accumulator, departement) => {
        const {codeRegion} = departement;
        accumulator[codeRegion] = accumulator[codeRegion] || {codeRegion, departements: []};
        accumulator[codeRegion].departements.push({nom: departement.nom});
        return accumulator;
    }, {});
    return Object.entries(mergedRegionsAndDepartements).map(([codeRegion, {departements}]) => {
        const regionsCodeAsName = regionArray.find(region => region.code === codeRegion)?.nom || '';
        return [regionsCodeAsName, departements]
    }).flat(2)
}
