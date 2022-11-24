Fly IO  
Heroku  
AWS Chime  

Tauri  
Judge0  
Rapid API  
Monaco  

Socket IO  
WebRTC  
Agora  

Recoil  
React Router  


# set up Tauri if you want to experiment:  
> xcode-select --install <-- MacOS C and dev dependencies, probably already installed  
> curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh <-- Rust.  Run  <-- rustup update --> after Rust installation finishes to ensure you are on the latest version  
  
# Once those global dependencies are set up:  
## I highly recommend using Vite to scaffold your frontend first.  That's how I did it anyways:  
> npm create vite@latest  
  
## Once created, update the vite.config.ts file.  Just copy/paste:  
> import { defineConfig } from 'vite'  
>  
> export default defineConfig({  
>  // prevent vite from obscuring rust errors  
>  clearScreen: false,  
>  // Tauri expects a fixed port, fail if that port is not available  
>  server: {  
>    strictPort: true,  
>  },  
>  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,  
>  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`  
>  // env variables  
>  envPrefix: ['VITE_', 'TAURI_'],  
>  build: {  
>    // Tauri supports es2021  
>    target: ['es2021', 'chrome100', 'safari13'],  
>    // don't minify for debug builds  
>    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,  
>    // produce sourcemaps for debug builds  
>    sourcemap: !!process.env.TAURI_DEBUG,  
>  },  
>})  
  
## Build the Rust project:  
> npm install --save-dev @tauri-apps/cli  
  
## Update package.json:  
> add <-- "tauri": "tauri", --> to the scripts object.  
  
## Initialize Tauri:  
> npm run tauri init  
  
I'll go through and comment what I'm doing in main.rs in case anyone else wants to poke around and add things or whatever.  
  
tauri.conf.json is where all of the options live for the application window itself.  These can also be hard coded in Rust but I don't know that I want to try that yet myself, and am happy with the json file for now. If you want to change anything that lives in there, the windows array is where all the visual options live.  