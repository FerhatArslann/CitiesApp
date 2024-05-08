/// CitiesSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCity, iLocation } from "../../../App";

interface CitiesStateType {
  allCities: iCity[];
}

const initialState: CitiesStateType = {
  allCities: []
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<iCity>) => {
      state.allCities.push(action.payload);
    },
    deleteCity: (state, action: PayloadAction<string>) => {
      state.allCities = state.allCities.filter(city => city.id !== action.payload);
    },
    addLocation: (state, action: PayloadAction<{ cityId: string; location: iLocation }>) => {
      const city = state.allCities.find(c => c.id === action.payload.cityId);
      if (city) {
        if (!city.locations) {
          city.locations = [];
        }
        city.locations.push(action.payload.location);
      }
    },
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
