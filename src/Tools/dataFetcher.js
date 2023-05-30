
// dataFetcher.js
import axios from 'axios';

//I probably shouldnt be storing data in a file 
//But screw the rules
var selectedRep = 'https://raw.githubusercontent.com/VoidVariable/CrazyRamblings/main/src/Tools/Obsidian';
export var selectedVault = 'Obsidian';

export function setRep(link){
  selectedRep = link;
}

const fetchingData = async (responseType, path) => {
  try {
    const response = await axios.get(
      selectedRep + path,
      { 
        responseType: responseType
      }
    );

    return response.data;
  } catch (error) {
    // Handle any errors that occur during the fetch.
    console.error('Error fetching Markdown data:', error);
    throw error;
  }
};
export default fetchingData;
