import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

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

const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
    ;

//INSTANCES
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

//METHOD FOR CREATE NEW USER
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
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
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

//METHOD FOR LOGIN EXISTING USERS
export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}


