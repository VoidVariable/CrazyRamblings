
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
export default fetchingData;
