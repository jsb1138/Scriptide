#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// http://localhost:5173 <-- devpath ??

// #[tauri::command]
// fn greet(name: &str) -> String {
//   format!("Hello, {}!", name)
// }


// use tauri::api::version;
use tauri::{ CustomMenuItem, Menu, MenuItem, Submenu, Manager, AboutMetadata };
use tauri::MenuItem::{ Redo /* , Undo, Copy, Paste, About */};
mod tao;
// use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};

// API call function to be invoked from app.tsx
// #[tauri::command]
// fn compile()

fn main() {
  // let butt = CustomMenuItem::new("butt".to_string(), "butt");
  //file
  let quit = CustomMenuItem::new(
    "quit".to_string(), "Quit")
    .accelerator("CmdOrCtrl+q");

  let close = CustomMenuItem::new(
    "close".to_string(), "Close")
  .accelerator("CmdOrCtrl+w");

  let app_name = String::from("Scriptide");
  let team = vec!["
    Brent Curriden,
    Joel Boychuk,
    Konstantin Richter,
    Alex Scharpf,
    Nicholas Larson
  ".to_string()];

  // let meta: AboutMetadata = AboutMetadata {
  //   version: Option<"0">,
  //   authors: team,
  //   copyright: "MIT",
  //   license: "proprietary",
  //   website: "https://github.com/jsb1138/Scriptide",
  //   website_label: "Scriptide",
  //   comments: "Brent likes his guitar a little too much, it's kind of creepy.",
  //   ..
  // };
  // AboutMetadata::authors(authors, vec!(team));
  // AboutMetadata::version(version, Into("0"));
  // AboutMetadata::website(website, Into("https://github.com/jsb1138/Scriptide"));
  // AboutMetadata::website_label(website_label, Into("Scriptide"));
  // AboutMetadata::license(license, Into("MIT"));
  // AboutMetadata::comments(comments, Into("Brent likes his guitar a little too much, it's kind of creepy"));

  // AboutMetadata {
  //   version: "0",
  //   authors: Some(team),
  //   comments: "Brent likes his guitar a little too much, it's kind of creepy",
  //   copyright: "MIT",
  //   license: "MIT",
  //   website: "https://github.com/jsb1138/Scriptide",
  //   website_label: "Scriptide",
  // };

  let meta = AboutMetadata::new()
  .version("0.0.1")
  .authors(team)
  .comments("Brent likes his guitar a little too much, it's kind of creepy".to_string())
  .copyright("Scriptide Team".to_string())
  .license("MIT".to_string())
  .website("https://github.com/jsb1138/Scriptide".to_string())
  .website_label("Scriptide".to_string());


  //edit
  // let undo = CustomMenuItem::new("undo".to_string(), "Undo");
  // let redo = CustomMenuItem::new("redo".to_string(), "Redo");
  // let copy = add_native_item(MenuItem::Copy);
  // let paste = add_native_item(MenuItem::Copy);
  
  //view
  // let fullscreen = CustomMenuItem::new("fullscreen".to_string(), "Enter Full Screen");

  //build sub menus
  let file_sub_menu = Submenu::new(
    "File",
    Menu::new()
    .add_item(quit)
    .add_item(close)
  );

  let edit_sub_menu = Submenu::new(
    "Edit",
    Menu::new()
    .add_native_item(MenuItem::Undo)
    .add_native_item(Redo)
    .add_native_item(MenuItem::Copy)
    .add_native_item(MenuItem::Paste)
  );

  let view_sub_menu = Menu::new()
    .add_native_item(MenuItem::About(app_name, meta));

  //build menu
  let menu = Menu::new()
  // .add_item(CustomMenuItem::new("hide", "Hide"))
  .add_submenu(file_sub_menu)
  .add_submenu(edit_sub_menu)
  .add_submenu(Submenu::new("View", view_sub_menu));
  
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
