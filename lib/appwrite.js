import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

//APPWRITE INITIAL CONFIGURATION
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.bruno.kulinary',
    projectId: '6673fe4b00047ec05215',
    databaseId: '667400750025ffcbefe5',
    userCollectionId: '667400a7002b7fcaf31d',
    recipeCollectionId: '667400f0001730a94c7c',
    storageId: '667405bd002281409f38'
}

//DESTRUCTURING APPWRITECONFIG
const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    recipeCollectionId,
    storageId
} = appwriteConfig;

const client = new Client();
client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setPlatform(platform)
    ;

//INSTANCES
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

//CREATE NEW USER
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

//LOGIN EXISTING USERS
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

//GET ACTIVE USER
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        //Compare current user with the db
        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        //If ok return only one document for one user
        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
    }
}

//GET ALL RECIPES (HOMESCREEN)
export const getAllRecipes = async () => {
    try {
        const recipes = await databases.listDocuments(
            databaseId,
            recipeCollectionId
        )

        return recipes.documents;
    } catch (error) {
        throw new error;
    }
}