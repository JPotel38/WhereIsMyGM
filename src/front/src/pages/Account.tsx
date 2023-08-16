import React, {useContext, useEffect, useState} from 'react';
import '../App.scss';
import Title from "antd/es/typography/Title";
import {Content} from "antd/es/layout/layout";
import {authContext} from "../AuthContext";
import {IUser} from "../interfaces/UserInterface";

function Account() {
    const {auth, setAuthData} = useContext(authContext);
    const [userData, setUserData] = useState<IUser>({
        email: "",
        userPseudo: "",
        firstName: "",
        lastName: "",
        password: "",
        profilePicture: "",
        address: {
            city: "",
            departement: "",
            postalCode: "",
            region: "",
            country: ""
        },
    });

    useEffect(() => {
        if (auth.data) {
            setUserData(auth.data.user)
        }
    }, []);

    return (
            <Content>
                <Title>User Account</Title>
            <ul>
                <li>Pseudonyme : {userData.userPseudo}</li>
                <li>Prénom : {userData.firstName}</li>
                <li>Nom de famille : {userData.lastName}</li>
                <li>Email : {userData.email}</li>
            </ul>
            </Content>
    )
}

export default Account
