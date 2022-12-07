import { SetStateAction } from "react";
import Select from "react-select";
import { languageOptions } from "../../constants/languageOptions";
import { useScriptideContext } from "../../contexts/ScriptideProvider";

export function LanguageDropdown() {
  const { setLanguage } = useScriptideContext();

  function onSelectChange(select: SetStateAction<any>) {
    setLanguage(select);
  }

  return (
    <Select
      // placeholder={}
      options={languageOptions}
      theme={(theme) => ({
        ...theme,
        borderRadius: 10,
        colors: {
          ...theme.colors,
          primary: "#5433FF", // box border color
          // primary75: "#5433FF",
          primary50: "#20BDFF",// select highlight color
          primary25: "#5433FF", // highlight color
          // danger: "pink",
          // dangerLight: "purple",
          neutral0: "#0B0024", // background color
          // neutral5: "#5433FF",
          // neutral10: "red",
          neutral20: "#5433FF", // box divider color
          neutral30: "#20BDFF", // box border hover color
          neutral40: "purple", // down arrow hover color
          // neutral50: "grey",
          neutral60: "#20BDFF", // menu selected down arrow color
          // neutral70: "red",
          neutral80: "#20BDFF", // font color
          // neutral90: "cyan",
        },
      })}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
}
