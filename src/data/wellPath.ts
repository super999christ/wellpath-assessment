export let dummyWellPad: [number, number, number] = [0, 0, 0]; // (x,y,z)
export let dummyWellProfile: [number, number, number, number][] = [
  [0, 0, 0, 1],
  [0, 20, 100, 3],
  [0, 25, 200, 5],
  [0, 20, 300, 2],
]; /// (x,y,z, density)

/**
 * load the datas from csv file and store it to dummyWellProfile
 * @param file : path of the source file(*.csv)
 */
