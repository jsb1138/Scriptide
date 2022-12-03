import { loader } from '@monaco-editor/react'
import themeList from 'monaco-themes/themes/themelist.json'



export const monacoThemes = {
  active4d: "Active4D",
  "all-hallows-eve": "All Hallows Eve",
  amy: "Amy",
  "birds-of-paradise": "Birds of Paradise",
  blackboard: "Blackboard",
  "brilliance-black": "Brilliance Black",
  "brilliance-dull": "Brilliance Dull",
  "chrome-devtools": "Chrome DevTools",
  "clouds-midnight": "Clouds Midnight",
  clouds: "Clouds",
  cobalt: "Cobalt",
  dawn: "Dawn",
  dreamweaver: "Dreamweaver",
  eiffel: "Eiffel",
  "espresso-libre": "Espresso Libre",
  github: "GitHub",
  idle: "IDLE",
  katzenmilch: "Katzenmilch",
  "kuroir-theme": "Kuroir Theme",
  lazy: "LAZY",
  "magicwb--amiga-": "MagicWB (Amiga)",
  "merbivore-soft": "Merbivore Soft",
  merbivore: "Merbivore",
  "monokai-bright": "Monokai Bright",
  monokai: "Monokai",
  "night-owl": "Night Owl",
  "oceanic-next": "Oceanic Next",
  "pastels-on-dark": "Pastels on Dark",
  "slush-and-poppies": "Slush and Poppies",
  "solarized-dark": "Solarized-dark",
  "solarized-light": "Solarized-light",
  spacecadet: "SpaceCadet",
  sunburst: "Sunburst",
  "textmate--mac-classic-": "Textmate (Mac Classic)",
  "tomorrow-night-blue": "Tomorrow-Night-Blue",
  "tomorrow-night-bright": "Tomorrow-Night-Bright",
  "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
  "tomorrow-night": "Tomorrow-Night",
  tomorrow: "Tomorrow",
  twilight: "Twilight",
  "upstream-sunburst": "Upstream Sunburst",
  "vibrant-ink": "Vibrant Ink",
  "xcode-default": "Xcode_default",
  zenburnesque: "Zenburnesque",
  iplastic: "iPlastic",
  idlefingers: "idleFingers",
  krtheme: "krTheme",
  monoindustrial: "monoindustrial",
}

export async function defineTheme (theme) {
  let themeImport = await import(`./themes/${monacoThemes[theme]}.json`)//.then(module => module.default)
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      themeImport
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });

  // let themeImport = await fetch(`monaco-themes/themes/${theme}.json`)
  //   .then(data => data.json())
  //   .then(data => {
  //     monaco.editor.defineTheme(theme, data)
  //     monaco.editor.setTheme(theme)
  //   }) 

  // return themeImport


  
  // const themePath = themeList[theme];
  // /* @vite-ignore */
  // return import(/* @vite-ignore */`monaco-themes/themes/${themePath}.json`)
  // /* @vite-ignore */
  //   .then(theme => {
  //     console.log(theme, themePath)
  //     monaco.editor.defineTheme(theme, themePath);
  //     monaco.editor.setTheme(theme)
  //   })
};

