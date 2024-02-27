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

mockedJson.set("exampleCSV1", exampleCSV1);
mockedJson.set("exampleCSV2", exampleCSV2);

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
