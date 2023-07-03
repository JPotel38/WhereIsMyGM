export interface IUser {
    _id: string;
    lastName: string;
    firstName: string;
    userPseudo: string;
    password: string;
    profilePicture: string;
    bannerPicture: string;
    email: string;
    emailStatus: string;
    address: IAddress;
    isGameMaster: boolean;
    smallDescription?: string;
    listGames?: [{ type: string, ref: 'games' }],
    dateInscription: Date;
    dateLastCo: Date;
    salt: string;
}

export interface IAddress {
    city: string;
    departement: string;
    postalCode: string;
    region: string;
    country: string;
}
