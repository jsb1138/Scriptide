
use tauri::{ AboutMetadata, Menu, Submenu, CustomMenuItem };
use tauri::MenuItem::{ Undo, Redo, Copy, Paste, About };


pub(crate) fn menu () -> Menu {

  let quit = CustomMenuItem::new(
    "quit".to_string(), "Quit")
    .accelerator("CmdOrCtrl+q");

  let close = CustomMenuItem::new(
    "close".to_string(), "Close")
  .accelerator("CmdOrCtrl+w");

  // let app_name = String::from("Scriptide");
  // let team = vec![String::from("Brent Curriden, Joel Boychuk, Konstantin Richter, Alex Scharpf, Nicholas Larson")];

  let meta = AboutMetadata::new()
  .version(String::from("0.0.1"))
  .authors(vec![String::from("Brent Curriden, Joel Boychuk, Konstantin Richter, Alex Scharpf, Nicholas Larson")])
  .comments(String::from("Brent likes his guitar a little too much, it's kind of creepy"))
  .copyright(String::from("Scriptide Team"))
  .license(String::from("MIT"))
  .website(String::from("https://github.com/jsb1138/Scriptide"))
  .website_label(String::from("Scriptide")).into();


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
    .add_native_item(Undo)
    .add_native_item(Redo)
    .add_native_item(Copy)
    .add_native_item(Paste)
  );

  let view_sub_menu = Menu::new()
    .add_native_item(About(String::from("Scriptide"), meta));

  //build menu
  let menu = Menu::new()
  // .add_item(CustomMenuItem::new("hide", "Hide"))
  .add_submenu(file_sub_menu)
  .add_submenu(edit_sub_menu)
  .add_submenu(Submenu::new("View", view_sub_menu));

  return menu;

}




