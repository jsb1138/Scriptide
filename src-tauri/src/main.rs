#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// #[tauri::command]
// fn greet(name: &str) -> String {
//   format!("Hello, {}!", name)
// }

use tauri::{ CustomMenuItem, Menu, MenuItem, Submenu };

// #[tauri::command]
// fn compile()

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let close = CustomMenuItem::new("close".to_string(), "Close");
  let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
  let menu = Menu::new()
  .add_native_item(MenuItem::Copy)
  .add_item(CustomMenuItem::new("hide", "Hide"))
  .add_submenu(submenu);
  tauri::Builder::default()
    // .invoke_handler(tauri::generate_handler![greet])
    .menu(menu)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
