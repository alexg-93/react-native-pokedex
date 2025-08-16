# Pokedex App

A mobile application built with React Native and Expo, designed to explore and search for Pokémon. This app provides a user-friendly interface to browse a list of Pokémon, view their details, and filter them by type.

## Features

*   **Browse Pokémon:** View a comprehensive list of Pokémon.
*   **Search Functionality:** Easily find specific Pokémon by name.
*   **Filter by Strength:** Narrow down your search results by Pokémon strength.
*   **Detailed View:** Tap on any Pokémon to see more detailed information.

## Technologies Used

*   **React Native:** For building native mobile applications using JavaScript/TypeScript.
*   **Expo:** A framework and platform for universal React applications, enabling quick development and deployment.
*   **Redux Toolkit:** For efficient state management.
*   **TypeScript:** For type-safe JavaScript development.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed.
It's also recommended to install the Expo CLI globally:

```bash
npm install -g expo-cli
# or
yarn global add expo-cli
```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/alexg-93/react-native-pokedex.git
    cd react-native-pokedex
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the App

To run the app in development mode:

```bash
npm start
# or
yarn start
```

This will open the Expo Dev Tools in your browser. You can then:
*   Scan the QR code with the Expo Go app on your physical device (iOS or Android).
*   Run on an Android emulator.
*   Run on an iOS simulator (requires macOS and Xcode).

## Project Structure

```
.
├── app/                  # Main application screens and navigation
│   ├── _layout.tsx       # Root layout for Expo Router
│   ├── index.tsx         # Home screen (Pokémon list)
│   └── pokemon/[name].tsx # Pokémon detail screen
├── assets/               # Static assets like images
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── store/                # Redux Toolkit store setup and slices
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```