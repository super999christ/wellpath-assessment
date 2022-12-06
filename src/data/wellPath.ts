import Papa from 'papaparse';

export const dummyWellPad: [number, number, number] = [0, 0, 0]; // (x,y,z)
export const dummyWellProfile: [number, number, number, number][] = [
  [0, 0, 0, 1],
  [0, 20, 100, 3],
  [0, 25, 200, 5],
  [0, 20, 300, 2],
]; /// (x,y,z, density)

const clearArray = (data: Array<[number, number, number, number]>) => {
  while(data.length) {
    data.shift();
  }
}

/**
 * load the datas from csv file and store it to dummyWellProfile
 * @param file : path of the source file(*.csv)
 */
export const loadDatafromCSV = async ( file: File ) => {
  clearArray(dummyWellProfile);

  //  Load Data
  const fileReader = new FileReader();

  //  Event Listener
  fileReader.onload = async ({ target }) => {
    
    try {
      const csv = Papa.parse(String(target?.result)).data as Array<Array<any>>;
      for ( let i = 1; i < csv.length; i ++ ) {
        dummyWellProfile.push([csv[i][0], csv[i][1], csv[i][2], csv[i][3]]);
      }
    } catch (err) {
      console.log(err);
    }
  } 

  fileReader.readAsText(file);
}