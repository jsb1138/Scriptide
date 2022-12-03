import { SetStateAction } from "react";
import Select from "react-select";
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
        colors: {
          ...theme.colors,
          primary25: "green",
          neutral0: "black",
        },
      })}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
}
