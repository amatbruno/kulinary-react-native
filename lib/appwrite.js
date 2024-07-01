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
        console.log(error);
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

//LIKE RECIPE BY USER
export const getLikedRecipes = async (userId) => {
    try {
        //Get recipes collection
        const recipeResponse = await databases.listDocuments(
            databaseId,
            recipeCollectionId
        );
        const recipes = recipeResponse.documents;

        //Filter recipes where user likes it
        const likedRecipes = recipes.filter(recipe => recipe.liked && recipe.liked.includes(userId));

        return likedRecipes;
    } catch (error) {
        console.error('Error fetching liked recipes:', error.message);
        throw new Error(error.message);
    }
};

//GET ALL SAVED RECIPES BY USER
export const userLikedRecipes = async (params) => {
    //Get params from function
    const { recipeId, userId } = params;

    try {
        //Access specific recipe from params
        const recipe = await databases.getDocument(
            databaseId,
            recipeCollectionId,
            recipeId
        );

        if (!recipe) throw new Error("Recipe not found");

        //Check if userId is inside liked array
        const isAlreadyLiked = recipe.liked && recipe.liked.includes(userId);

        //Filter existing array is it's liked, or add it and to another new if not
        const newLiked = isAlreadyLiked ?
            recipe.liked.filter(id => id !== userId) : [...(recipe.liked || []), userId];

        //Update the document with the userId liked
        const updatedRecipe = await databases.updateDocument(
            databaseId,
            recipeCollectionId,
            recipeId,
            { liked: newLiked }
        );

        return updatedRecipe;
    } catch (error) {
        console.error('Error saving recipe:', error.message);
        throw new Error(error.message);
    }
}

//UPDATE USER EMAIL
export const updateUserEmail = async (userId, newEmail) => {
    try {
        //Access active user account
        const getUser = await databases.getDocument(
            databaseId,
            userCollectionId,
            userId
        );

        if (!getUser) throw new Error("User not found");

        const updateEmail = await databases.updateDocument(
            databaseId,
            userCollectionId,
            userId,
            { email: newEmail }
        )

        return updateEmail;

    } catch (error) {
        console.error('Error updating user email:', error.message);
        throw new Error(error.message);
    }
};

//UPDATE USER BIOGRAPHY
export const updateUserBio = async (userId, newBio) => {
    try {
        //Access active user account
        const getUser = await databases.getDocument(
            databaseId,
            userCollectionId,
            userId
        );

        if (!getUser) throw new Error("User not found");

        const updateBio = await databases.updateDocument(
            databaseId,
            userCollectionId,
            userId,
            { biography: newBio }
        )

        return updateBio;

    } catch (error) {
        console.error('Error updating user biography:', error.message);
        throw new Error(error.message);
    }
};
