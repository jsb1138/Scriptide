import React, { SetStateAction } from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";
import { useScriptideContext } from "../contexts/ScriptideProvider";

export function LanguageDropdown() {
  const { setLanguage } = useScriptideContext();

  function onSelectChange(select: SetStateAction<any>) {
    console.log("selected: ", select);
    setLanguage(select);
  }

  return (
    <Select
      placeholder={"Filter By Category"}
      options={languageOptions}
      theme={(theme) => ({
        ...theme,
        borderRadius: 10,
        // https://react-select.com/styles#overriding-the-theme
        colors: {
          ...theme.colors,
          // primary: "black",
          // primary75: "blue",
          // primary50: "red",
          primary25: "green", // highlight color
          // danger: "pink",
          // dangerLight: "purple",
          neutral0: "black", // background color
          // neutral5: "blue",
          // neutral10: "red",
          // neutral20: "green", // box border color
          // neutral30: "pink",
          // neutral40: "purple",
          // neutral50: "grey",
          // neutral60: "blanchedalmond",
          // neutral70: "red",
          // neutral80: "orange",
          // neutral90: "cyan",
        },
      })}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
}
