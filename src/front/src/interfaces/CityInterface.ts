export interface ICity {
    "nom": string;
    "code": string;
    "_score": number;
    "departement": {
        "code": string;
        "nom": string;
    },
    "region": {
        "code": string;
        "nom": string;
    }
}
