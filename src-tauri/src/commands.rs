use tauri::Manager;


#[tauri::command]
pub async fn close_splash(window: tauri::Window) {
  if let Some(splash) = window.get_window("splash") {
    splash.close().unwrap();
  }

  window.get_window("main").unwrap().show().unwrap();
}