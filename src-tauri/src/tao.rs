// use tauri::{ App, Manager };
// use window_vibrancy::{ self, NSVisualEffectMaterial };

#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{ App, Manager };
use window_vibrancy::{ apply_vibrancy, apply_blur, NSVisualEffectMaterial, NSVisualEffectState };

/// setup
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let win = app.get_window("main").unwrap();

    
    #[cfg(target_os = "macos")]
    apply_vibrancy(&win, NSVisualEffectMaterial::UnderWindowBackground, Some(window_vibrancy::NSVisualEffectState::Active), None)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    
    #[cfg(target_os = "windows")]
    apply_blur(&win, Some((18, 18, 18, 125)))
        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

    Ok(())
}

// .setup(|app| {
//     let window = app.get_window("main").unwrap();

//     #[cfg(target_os = "macos")]
//     apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
//       .expect("Unsupported platform, apply_vibrancy is only allowed on macOS");
    
//     #[cfg(target_os = "windows")]
//     apply_blur(&window, Some((18, 18, 18, 125)))
//       .expect("Unsupported platform, apply_blur only exists on Windows");

//     Ok(())
//   })