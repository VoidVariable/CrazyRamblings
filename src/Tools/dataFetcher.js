
// dataFetcher.js
import axios from 'axios';

//I probably shouldnt be storing data in a file 
//But screw the rules
export var selectedRep = ' ';
export var selectedVault = 'Obsidian';
var temp = "/Vaults/"

export function setRep(link, repName){
  selectedRep = link;
  setVault(repName);
}

export function setVault(vaultName){
  selectedVault = vaultName;
}

const fetchingData = async (responseType, path, useExtra = false) => {
  try 
  {
    var thisTemp = '';
    if(useExtra)
       thisTemp = temp + selectedVault;

    const response = await axios.get(
      selectedRep + thisTemp + path,
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


export const checkFetchability = async () => {
  try {
    const response = await axios.head(selectedRep + temp + selectedVault + "/Home.md");
    return response.status === 200 || response.data === true; // Returns true if the status is 200 OK and the fetched value is true
  } catch (error) {
    // Handle the error if needed
    
    return false; // Return false in case of error
  }
};

export default fetchingData;
