import React from 'react';

async function fetchRegions() {
    const response = await fetch('/geolocalisation/regions');
    return response.json();
}

async function fetchDepartements() {
    const response = await fetch('/geolocalisation/departements');
    return await response.json();
}

export async function getDeptAndRegions() {
    const regions = await fetchRegions();
    const departements = await fetchDepartements();

    const mergedRegionsAndDepartements = departements.reduce((accumulator, departement) => {
        const {codeRegion} = departement;
        accumulator[codeRegion] = accumulator[codeRegion] || {codeRegion, departements: []};
        accumulator[codeRegion].departements.push({nom: departement.nom});
        return accumulator;
    }, {});
    return Object.entries(mergedRegionsAndDepartements).map(([codeRegion, {departements}]) => {
        const regionsCodeAsName = regions.find(region => region.code === codeRegion)?.nom || '';
        return [regionsCodeAsName, departements]
    }).flat(2);
}
