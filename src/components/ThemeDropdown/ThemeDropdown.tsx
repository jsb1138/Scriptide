import Select from "react-select";
import monacoThemes from "../../lib/themes/themelist.json";
import { useEffect } from "react";
import { defineTheme } from "../../lib/defineTheme.js";
import { useScriptideContext } from "../../contexts/ScriptideProvider";

export function ThemeDropdown() {
  const { theme, setTheme } = useScriptideContext();

  function handleThemeChange(th: any) {
    const theme = th;

    if (["light", "vs-dark"].includes(theme)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_: any) => setTheme({
        value: theme.value,
        label: theme.label
      }));
    }
  }

  return (
    <Select
      placeholder={theme?.value || `Select Theme`}
      // options={languageOptions}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme?.value}
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
          // neutral20: "green", //box border color
          // neutral30: "pink",
          // neutral40: "purple",
          // neutral50: "grey",
          // neutral60: "blanchedalmond",
          // neutral70: "red",
          // neutral80: "orange",
          // neutral90: "cyan",
        },
      })}
      onChange={handleThemeChange}
    />
  );
}
