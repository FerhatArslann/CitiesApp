// CitiesStore.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from './Slices/CitiesSlice';
import { persistReducer, persistStore } from "redux-persist";
import { useDispatch, useSelector } from 'react-redux';

// Määritellään konfiguraatio Redux-persistiä varten
const persistConfig = {
    key: 'root', // Juuriavain, jonka alle kaikki data tallennetaan
    storage: AsyncStorage, // Määritetään käytettävä tallennusjärjestelmä, tässä tapauksessa AsyncStorage
};

// Luodaan persistoitu reduceri käyttäen yllä määriteltyä konfiguraatiota ja citiesReduceriä
const persistedReducer = persistReducer(persistConfig, citiesReducer);

// Konfiguroidaan Redux store, joka sisältää persistoidun reducerin
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

// Määritellään tyypit tilan ja dispatch-funktion palautusarvoille
export type RootState = ReturnType<typeof store.getState>;
export type CitiesDispatch = typeof store.dispatch;

// Exportataan koukut, joilla päästään käsiksi dispatch-funktioon ja tilaan
export const useCitiesDispatch = () => useDispatch<CitiesDispatch>();
export const useCitiesSelector = (selector: (state: RootState) => any) => useSelector(selector);

// Exportataan konfiguroitu store
export default store;

// Luodaan ja exportataan persistor, joka mahdollistaa sovelluksen tilan pysyvän tallennuksen
export const persistor = persistStore(store);
