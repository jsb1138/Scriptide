import { invoke } from '@tauri-apps/api/tauri';

const invoke = window.__TAURI_IPC__.invoke;

/** @todo: This function can load a separate window as a loader/spinner.  see: https://tauri.app/v1/guides/features/splashscreen **/
export function load () {
  document.addEventListener('DOMContentLoaded', () => {
    invoke('close_splash');
  })
}