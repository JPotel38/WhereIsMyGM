const users = [
    {
        _id: "64f1a2b3c4d5e6f7a8b9u001",
        lastName: "Martin",
        firstName: "Théo",
        userPseudo: "DungeonMasterTheo",
        password: "hashed_password",
        profilePicture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Theo",
        bannerPicture: "",
        email: "theo.martin@email.com",
        emailStatus: "Valid",
        address: {
            city: "Lyon",
            department: "Rhône",
            postalCode: "69001",
            region: "Auvergne-Rhône-Alpes",
            country: "France"
        },
        isGameMaster: true,
        smallDescription: "Game Master for 10 years, I specialize in D&D 5e and Call of Cthulhu. I love creating immersive narratives and memorable characters.",
        listGames: ["64f1a2b3c4d5e6f7a8b9c001", "64f1a2b3c4d5e6f7a8b9c003"],
        dateInscription: new Date("2023-01-15"),
        dateLastCo: new Date("2024-03-01"),
        salt: "mock_salt_1"
    },
    {
        _id: "64f1a2b3c4d5e6f7a8b9u002",
        lastName: "Dubois",
        firstName: "Sophie",
        userPseudo: "ShadowrunnerSoph",
        password: "hashed_password",
        profilePicture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophie",
        bannerPicture: "",
        email: "sophie.dubois@email.com",
        emailStatus: "Valid",
        address: {
            city: "Paris",
            department: "Paris",
            postalCode: "75011",
            region: "Île-de-France",
            country: "France"
        },
        isGameMaster: true,
        smallDescription: "Passionate about cyberpunk and sci-fi universes. I run Shadowrun and Cyberpunk RED campaigns every weekend.",
        listGames: ["64f1a2b3c4d5e6f7a8b9c005", "64f1a2b3c4d5e6f7a8b9c009"],
        dateInscription: new Date("2023-03-20"),
        dateLastCo: new Date("2024-03-05"),
        salt: "mock_salt_2"
    },
    {
        _id: "64f1a2b3c4d5e6f7a8b9u003",
        lastName: "Leroy",
        firstName: "Antoine",
        userPseudo: "VampireLordAnt",
        password: "hashed_password",
        profilePicture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Antoine",
        bannerPicture: "",
        email: "antoine.leroy@email.com",
        emailStatus: "Valid",
        address: {
            city: "Bordeaux",
            department: "Gironde",
            postalCode: "33000",
            region: "Nouvelle-Aquitaine",
            country: "France"
        },
        isGameMaster: true,
        smallDescription: "Horror RPG enthusiast. I specialize in Vampire: The Masquerade and World of Darkness games, focusing on political intrigue and drama.",
        listGames: ["64f1a2b3c4d5e6f7a8b9c004", "64f1a2b3c4d5e6f7a8b9c003"],
        dateInscription: new Date("2023-06-10"),
        dateLastCo: new Date("2024-02-28"),
        salt: "mock_salt_3"
    },
    {
        _id: "64f1a2b3c4d5e6f7a8b9u004",
        lastName: "Bernard",
        firstName: "Clara",
        userPseudo: "PathfinderClara",
        password: "hashed_password",
        profilePicture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Clara",
        bannerPicture: "",
        email: "clara.bernard@email.com",
        emailStatus: "Valid",
        address: {
            city: "Toulouse",
            department: "Haute-Garonne",
            postalCode: "31000",
            region: "Occitanie",
            country: "France"
        },
        isGameMaster: false,
        smallDescription: "Avid RPG player looking for a GM for Pathfinder 2e campaigns.",
        listGames: ["64f1a2b3c4d5e6f7a8b9c002"],
        dateInscription: new Date("2023-08-05"),
        dateLastCo: new Date("2024-03-06"),
        salt: "mock_salt_4"
    }
];

module.exports = users;
