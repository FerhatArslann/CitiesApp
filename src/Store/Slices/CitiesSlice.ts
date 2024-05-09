/// CitiesSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCity, iLocation } from "../../../App";

// Määritellään tilan tyyppi
interface CitiesStateType {
  allCities: iCity[];
}

// Määritellään alkutila
const initialState: CitiesStateType = {
  allCities: [] // Alkutilassa kaupunkilista on tyhjä
};

// Luo Redux slice kaupunkien hallintaan
const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  // Reducerit, jotka määrittelevät toiminnot tilan muokkaamiseksi
  reducers: {
    // Lisää uuden kaupungin
    addCity: (state, action: PayloadAction<iCity>) => {
      state.allCities.push(action.payload);
    },
    // Poistaa kaupungin
    deleteCity: (state, action: PayloadAction<string>) => {
      state.allCities = state.allCities.filter(city => city.id !== action.payload);
    },
    // Lisää uuden sijainnin määritellylle kaupungille
    addLocation: (state, action: PayloadAction<{ cityId: string; location: iLocation }>) => {
      const city = state.allCities.find(c => c.id === action.payload.cityId);
      if (city) {
        if (!city.locations) {
          city.locations = []; // Alustetaan sijaintilista, jos sitä ei vielä ole
        }
        city.locations.push(action.payload.location);
      }
    },
    // Poistaa sijainnin määritellyltä kaupungilta
    deleteLocation: (state, action: PayloadAction<{ cityId: string; locationId: string }>) => {
      const cityIndex = state.allCities.findIndex(city => city.id === action.payload.cityId);
      if (cityIndex !== -1) {
        state.allCities[cityIndex].locations = state.allCities[cityIndex].locations?.filter(location => location.id !== action.payload.locationId);
      }
    }
  }
});

export const { addCity, deleteCity, addLocation, deleteLocation } = citiesSlice.actions;
export default citiesSlice.reducer;
