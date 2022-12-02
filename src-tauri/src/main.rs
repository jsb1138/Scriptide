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

// window event attempts for page refresh on keybind
// use ::tao::event::WindowEvent;
use tauri::{Manager, /*WebviewAttributes, window::PlatformWebview, WindowEvent */};

mod tao;
mod menu;
mod commands;
// use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};

// API call function to be invoked from app.tsx
// #[tauri::command]
// fn compile()

fn main() {

  #[allow(clippy::single_match)]
  #[cfg(target_os = "macos")]

  // fix_path_env::fix();
  // tauri::Builder::default()
  //   // .invoke_handler(tauri::generate_handler![greet])
  //   .setup(tao::init)
  //   .menu(menu::menu())
  //   // .menu(menu)
  //   // .on_menu_event(|event| {
  //   //   match event.menu_item_id() {
  //   //     "quit" => {
  //   //       let app = event.window().app_handle();
  //   //       app.exit(0);
  //   //     }
  //   //     "close" => {
  //   //       let window = event.window();
  //   //       window.close().unwrap();
  //   //     }
  //   //     _ => {}
  //   //   }
  //   // })
  //   .run(tauri::generate_context!())
  //   .expect("error while running tauri application");

  let builder = tauri::Builder::default().setup(tao::init);
  #[cfg(target_os = "macos")]
  let builder = builder.menu(menu::menu());
  #[cfg(target_os = "macos")]
  builder
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
        // can't find reload functionality from tauri window events
        // "reload" => {
        //   event.window().reload();
        // }
        _ => {}
      }
    })
    .invoke_handler(tauri::generate_handler![commands::close_splash])
    .run(tauri::generate_context!())
    .expect("Error while running application");

  #[cfg(target_os = "linux")]
  let builder = tauri::Builder::default();

  builder.invoke_handler(tauri::generate_handler![commands::close_splash])
  .run(tauri::generate_context!())
  .expect("Error while running application")
}

