// CitiesStore.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from './Slices/CitiesSlice';
import { persistReducer, persistStore } from "redux-persist";
import { useDispatch, useSelector } from 'react-redux';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Käytä AsyncStorageä tallennustilana
};

const persistedReducer = persistReducer(persistConfig, citiesReducer);

const store = configureStore({
    reducer: {
        cities: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Ohita tiettyjen toimintojen serialisointitarkistukset
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type CitiesDispatch = typeof store.dispatch;

export const useCitiesDispatch = () => useDispatch<CitiesDispatch>();
export const useCitiesSelector = (selector: (state: RootState) => any) => useSelector(selector);

export default store;

export const persistor = persistStore(store);
