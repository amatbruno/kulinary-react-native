import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useAppwrite = (f) => { //Pass by props the function needed in appwrite.js
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await f();
            setData(response);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { //Call method and fetch data
        fetchData();
    }, []);

    const reFetch = () => fetchData();

    return { data, isLoading, reFetch }; //Return object
}

export default useAppwrite;