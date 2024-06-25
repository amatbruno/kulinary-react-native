import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { userLikedRecipes } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Saved = () => {
    const { user } = useGlobalContext();
    const [likedRecipes, setLikedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const finalRecipes = likedRecipes.map(recipe => (
        recipe.name
    ));

    useEffect(() => {
        const loadLikedRecipes = async () => {
            try {
                const recipes = await userLikedRecipes(user.$id)
                setLikedRecipes(recipes);
            } catch (error) {
                console.error('Error loading liked recipes:', error.message);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            loadLikedRecipes();
        }
    }, [user]);

    if (loading) {
        return <Text>Loading...</Text>
    }

    return (
        <SafeAreaView className="bg-background h-full w-full">
            <Text>Saved recipes</Text>
            <FlatList
                data={finalRecipes}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <Text className="text-white">{item.name}</Text>
                )}
            />
        </SafeAreaView>
    )
}

export default Saved