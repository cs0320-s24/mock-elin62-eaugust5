// type ExampleCSVs = {
//   [key: string]: string[][];
// };
export const mockedJson = new Map<string, string[][]>();

const exampleCSV1 = [
  ["1", "2", "3", "4", "5"],
  ["The", "song", "remains", "the", "same."],
];

const exampleCSV2 = [
  ["Another", "example", "line"],
  ["And", "another", "line"],
];

const exampleCSV3 = [
  ["column1", "column2", "column3", "column4"],
  ["a", "b", "c", "d"],
  ["e", "f", "g", "h"],
  ["a", "b", "y", "z"],
];

mockedJson.set("exampleCSV1", exampleCSV1);
mockedJson.set("exampleCSV2", exampleCSV2);
mockedJson.set("exampleCSV3", exampleCSV3);

// export const exampleCSVs: ExampleCSVs = {
//   exampleCSV1: [
//     ["The", "song", "remains", "the", "same."],
//     ["This", "is", "a", "test", "file."],
//   ],
//   exampleCSV2: [
//     ["Another", "example", "line"],
//     ["And", "another", "line"],
//   ],
// };
