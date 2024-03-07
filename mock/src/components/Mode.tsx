import { Dispatch, SetStateAction } from "react";

interface modeProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

export function Mode(props: modeProps) {
  const authenticate = () => {
    const newValue = props.mode;
    props.setMode(newValue);
    return newValue;
  };

  if (props.mode === "brief") {
    props.setMode("verbose");
  } else {
    props.setMode("brief");
  }
  return props.mode;
}
