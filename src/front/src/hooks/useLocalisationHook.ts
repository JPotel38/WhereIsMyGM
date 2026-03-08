import React, {useEffect, useState} from 'react';

export default function useLocalisationHook() {
    const [regions, setRegions] = useState(null);
    const [departments, setdepartments] = useState(null);
    const [RegionsAndDepartments, setRegionsAndDepartments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const responseRegions = await fetch('/geolocalisation/regions');
            const regionsData = await responseRegions.json();
            setRegions(regionsData);
            const responseDepartments = await fetch('/geolocalisation/departments');
            const departmentsData = await responseDepartments.json();
            setdepartments(departmentsData);
        }
        fetchData();
    }, []);

    // Crée un objet associant les régions à leurs départements respectifs avec reduce().
    // Cet objet est ensuite stocké dans le state updatedRegionsAndDepartments.

    useEffect(() => {
        if (departments && regions) {
            const updatedRegionsAndDepartments = departments.reduce((accumulator, department) => {
                const { codeRegion } = department;
                accumulator[codeRegion] = accumulator[codeRegion] || { codeRegion, departments: [] };
                accumulator[codeRegion].departments.push({ nom: department.nom });
                return accumulator;
            }, {});
            setRegionsAndDepartments(updatedRegionsAndDepartments);
        }
    }, [departments, regions]);

    //     Le hook retourne un tableau contenant les noms des régions et les listes de départements associés avec Object.entries() pour itérer sur les paires clé-valeur de l'objet RegionsAndDepartments.
    //     Pour chaque région, le code recherche le nom correspondant dans le tableau des régions (état regions) en utilisant la méthode find(). Si le nom est trouvé, il est utilisé, sinon, une chaîne vide est utilisée.
    //     Le hook retourne finalement un tableau de paires [nom de la région, liste des départements] à l'aide de map() et flat(2) pour "aplanir" la liste des départements.

    return Object.entries(RegionsAndDepartments).map(([codeRegion, {departments}]) => {
        const regionsCodeAsName = regions.find(region => region.code === codeRegion)?.nom || '';
        return [regionsCodeAsName, departments]
    }).flat(2);
}
