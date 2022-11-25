#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// http://localhost:5173 <-- devpath ??

// #[tauri::command]
// fn greet(name: &str) -> String {
//   format!("Hello, {}!", name)
// }

use tauri::{ CustomMenuItem, Menu, MenuItem, Submenu, Manager };
mod tao;
// use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};

// API call function to be invoked from app.tsx
// #[tauri::command]
// fn compile()

fn main() {
  // let butt = CustomMenuItem::new("butt".to_string(), "butt");
  //file
  let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("CmdOrCtrl+q");
  let close = CustomMenuItem::new("close".to_string(), "Close");

  //edit
  let undo = CustomMenuItem::new("undo".to_string(), "Undo");
  let redo = CustomMenuItem::new("redo".to_string(), "Redo");
  // let copy = add_native_item(MenuItem::Copy);
  // let paste = add_native_item(MenuItem::Copy);
  
  //view
  let fullscreen = CustomMenuItem::new("Enter Full Screen".to_string(), "Enter Full Screen");

  //build sub menus
  let file_sub_menu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
  let edit_sub_menu = Submenu::new("Edit", Menu::new().add_item(undo).add_item(redo).add_native_item(MenuItem::Copy).add_native_item(MenuItem::Paste));
  let view_sub_menu = Submenu::new("View", Menu::new().add_item(fullscreen));

  //build menu
  let menu = Menu::new()
  // .add_item(CustomMenuItem::new("hide", "Hide"))
  .add_submenu(file_sub_menu)
  .add_submenu(edit_sub_menu)
  .add_submenu(view_sub_menu);
  
  #[allow(clippy::single_match)]

  // fix_path_env::fix();
  tauri::Builder::default()
    // .invoke_handler(tauri::generate_handler![greet])
    .setup(tao::init)
    .menu(menu)
    .on_menu_event(|event| {
      match event.menu_item_id() {
        "quit" => {
          let app = event.window().app_handle();
          app.exit(0);
        }
        "close" => {
          let window = event.window();
          window.close().unwrap();
        }
        _ => {}
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

}
