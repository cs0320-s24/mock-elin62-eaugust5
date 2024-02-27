import { Dispatch, SetStateAction, useState } from "react";

interface MockCSVProps {
  mockedJson: Map<string, string[][]>;
  setMockedJson: Dispatch<SetStateAction<Map<string, string[][]>>>;
}

export function REPLInput(props: MockCSVProps) {
  const exampleCSV1 = [
    // [1, 2, 3, 4, 5],
    ["The", "song", "remains", "the", "same."],
    ["This", "is", "a", "test", "file."],
  ];
  const [mockedJson, setMockedJson] = useState(new Map());
  props.setMockedJson((map) => new Map(map.set("exampleCSV1", exampleCSV1)));

  mockedJson.set("exampleCSV1", exampleCSV1);
}
