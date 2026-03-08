export interface ICity {
    "nom": string;
    "code": string;
    "_score": number;
    "department": {
        "code": string;
        "nom": string;
    },
    "region": {
        "code": string;
        "nom": string;
    }
}
