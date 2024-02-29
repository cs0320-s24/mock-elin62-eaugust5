import { Dispatch, SetStateAction, useState, useEffect } from "react";

interface MockedJsonProps {
  setMockedJsonMap: Dispatch<SetStateAction<Map<string, string[][]>>>;
}

export function MockedJson(props: MockedJsonProps) {
  const exampleCSV1 = [
    // [1, 2, 3, 4, 5],
    ["The", "song", "remains", "the", "same."],
    ["This", "is", "a", "test", "file."],
  ];

  // props.setMockedJsonMap((prevMap) =>
  //   new Map(prevMap).set("exampleCSV1", exampleCSV1)
  // );

  // Update the map state and the provided function to set the map
  useEffect(() => {
    props.setMockedJsonMap((prevMap) =>
      new Map(prevMap).set("exampleCSV1", exampleCSV1)
    );
  }, []);
}
