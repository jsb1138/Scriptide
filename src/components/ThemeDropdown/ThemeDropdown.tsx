import Select from "react-select";
import monacoThemes from "../../lib/themes/themelist.json";
import { useEffect } from "react";
import { defineTheme } from "../../lib/defineTheme.js";
import { useScriptideContext } from "../../contexts/ScriptideProvider";

export function ThemeDropdown() {
  const { theme, setTheme } = useScriptideContext();

  function handleThemeChange(th: typeof theme) {
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
  // useEffect(() => {
  //   console.log(theme);
  //   defineTheme("oceanic-next").then((_: any) =>
  //     setTheme({ value: "oceanic-next", label: "oceanic-next" })
  //   );
  // }, []);
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
      defaultValue={'vs-dark'}
      onChange={(selectedOption) => handleThemeChange(selectedOption)}
    />
  );
}
