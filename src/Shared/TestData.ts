// TestData.ts

import { iCity } from "../../App";
import uuid from 'react-native-uuid';

const testLahti: iCity = {
    id: uuid.v4().toString(),
    name: 'Lahti',
    country: 'Finland',
    locations:  [
      {
        name: 'Hyppyrimäki',
        info: 'Hienot nähtävyydet tornista',
        id: uuid.v4().toString(),
      },
      {
        name: 'Jäähalli',
        info: 'Pelikaanit\ kotiareena',
        id: uuid.v4().toString(),
      }
    ]
  };
  
const testHeinola: iCity = {
    id: uuid.v4().toString(),
    name: 'Heinola',
    country: 'Finland',
    locations:  [
      {
        name: 'Silta',
        info: 'Silta mikä ylittää järven, siellä on hieno maisema.',
        id: uuid.v4().toString(),
      },
      {
        name: 'Jäähalli',
        info: 'Peliitat\ kotiareena',
        id: uuid.v4().toString(),
      }
   ]
};  
  
export const testData: iCity[] = [
    testLahti,
    testHeinola,
];
