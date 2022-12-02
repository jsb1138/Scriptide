import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../constants/customStyles";
import { useEffect } from "react";
import { defineTheme } from "../lib/defineTheme.js";
import { useScriptideContext } from "../contexts/ScriptideProvider";

export function ThemeDropdown() {
  const { theme, setTheme } = useScriptideContext();

  function handleThemeChange(th: any) {
    const theme = th;
    console.log("theme: ", theme);

    if (["light", "vs-dark"].includes(theme)) {
      setTheme(theme);
      console.log("chosen theme", theme);
    } else {
      console.log("theme else: ", theme);
      defineTheme(theme).then((_: any) => setTheme(theme));
    }
  }
  useEffect(() => {
    console.log(theme);
    defineTheme("oceanic-next").then((_: any) =>
      setTheme({ value: "oceanic-next", label: "oceanic-next" })
    );
  }, []);
  return (
    <Select
      placeholder={`Select Theme`}
      // options={languageOptions}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
}
