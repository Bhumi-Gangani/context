import React, { createContext, useState } from 'react';
import axios from 'axios';

const BASE_URL = "http://127.0.0.1:3500/users"

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [item, setItem] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const fetchData = async () => {
        try {
            let { data } = await axios.get(`${BASE_URL}`)
            setIsEdit(false)
            setData(data)
        } catch (error) {
            alert('Error while fetching data... ');
        }
    };

    const readItem = async (itemId) => {
        try {
            let { data } = await axios.get(`${BASE_URL}/${itemId}`)
            setIsEdit(true)
            setItem(data)
        } catch (error) {
            alert('Error while reading item... ');
        }
    };


    const createItem = async (item) => {
        try {
            await axios.post(`${BASE_URL}`, item)
        } catch (error) {
            alert('Error while adding...');
        }
    };

    const updateItem = async (itemId, updatedItem) => {
        try {
            await axios.put(`${BASE_URL}/${itemId}`, updatedItem)
            setIsEdit(false)
        } catch (error) {
            alert('Error while deleting data... ');
        }
    };

    const deleteItem = async (itemId) => {
        try {
            await axios.delete(`${BASE_URL}/${itemId}`)
        } catch (error) {
            alert('Error while deleting data... ');
        }
    };

    return (
        <UserContext.Provider
            value={{ data, item, isEdit, fetchData, createItem, readItem, updateItem, deleteItem }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
