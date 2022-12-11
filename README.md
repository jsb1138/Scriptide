# Scriptide

Scriptide is an all-in-one solution for video conferencing, realtime IDE collaboration, note taking and whiteboarding. Scriptide allows for teams of up to 250 users to meet, enter and run code all from the comfort of a single, platform agnostic desktop application. Designed with education in mind, Scriptide gives educators a simple to use platform to host and manage realtime lessons with students in an engaging and streamlined environment, enabling instructors to offer or revoke the ability of students to contribute in realtime to the IDE.

## Getting Started

In order to run Scriptide, users can clone this repository and then run:

### `npm i`

Which installs all of the app's dependencies.

### `npm run tauri dev`

Will run the app locally in your default browser.

### `npm run tauri build`

Builds the app for production to a local `build` folder.\
It correctly bundles the app in production mode and optimizes the build for the best performance.

## Tech Stack

Scriptide is written with the React frontend framework and Typescript and is bundled using Tauri, which relies on Rust. Tauri delivers application builds with platform native functionality for Mac OS, Windows and Linux. Scriptide employs AWS Chime and Amplify for its video conferencing capabilities. It utilizes the Monaco Editor and Judge0 for its code input and execution capabilites. The app uses Liveblocks to enable end-to-end multiplayer functionality and the app relies on AWS Lambda and DynamoDB to manage and deliver backend services for the app.

## Contributors

Alexander Scharpf
Brent Curriden
Joel Boychuk
Konstantin Richter
Nicholas Larson
