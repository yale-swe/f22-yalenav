![header](.github/imgs/header.png)

# YaleNav

The mobile app helping **yale** students explore and **navigate** campus seamlessly.

It is the only vertically-integrated navigation system that offers three features most critical to student life:

1. **A-to-B routing** with Yale-specific transport integration – you’ll finally know whether or not to wait for the shuttle
2. **Dynamic visualization of campus spots** – you’ll know which butteries are near you and which dining halls are available
3. Personalized tooling to help you **navigate your class schedule** faster than ever before.

The following repository was written as part of Yale's Software Engineering class, and contains the most updated code on which the application relies.

Code authors:

- Kyle Zawadski
- Vincent Schaffer
- Graham Hardcastle
- Jonathan Yu
- Petru Neagu
- Ali Hafez

# Development

## Stack

<img height="20" alt="React Native" src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
<img height="20" alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img height="20" alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
<img height="20" alt="NodeJS" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
<img height="20" alt="MongoDB" src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">
<img height="20" alt="Expo" src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37">

YaleNav's software architecture is a variation of [MERN](https://www.mongodb.com/mern-stack).

- [TypeScript](https://www.typescriptlang.org/) (Programming Language)
- [React Native](https://reactnative.dev/) (Client-side Framework)
- [Node.js](https://nodejs.org/en/) (Server-side Runtime)
- [Express](https://expressjs.com/) (Server-side Framework)
- [MongoDB](https://www.mongodb.com/home) (NoSQL Database)
- [Expo](https://expo.dev/) (Mobile App Platform)

## Quick start

Running this app locally requires the following technologies:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node v16.14](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- [Expo Go](https://expo.dev/client)

## Directions

> **Note**: The following won't work without first installing the above!

Run `yarn install:all`. This will install all of the necessary npm packages.

Open a terminal window and run `yarn dev:env`. This will run a MongoDB container on your local machine. Keep this terminal open.

Open another terminal window and run `yarn dev:server`. This will run the REST API on port `4000`.

Open another terminal window. Run `yarn dev:client`. This will serve the client on port `3000` using Expo Go. From there you'll get to choose whether you'd like to run it on web, ios, or android. After completing the steps above, you should be able to go to `http://localhost:3000` on your browser and see the app.

# Acknowledgements

YaleNav makes use of the following third-paty tools / APIs:

- [Passport CAS](https://github.com/yale-swe/passport-cas) –– for authentication and Yale student log in.
- [Yalies.io](https://yalies.io/apidocs?) –– for developer-friendly interfaces when handling user information.
- [DoubleMap](https://yaleshuttle.doublemap.com/map/) –– for shuttle routing, as presented in DoubleMap.
- [Coursetable](https://www.coursetable.com/api) –– for student courses, as well corresponding course location codes.
- [Yale Buildings (Buildings V2)](https://developers.yale.edu/buildingsv2) –– for location code translations, descriptions, and addresses.
- [Yale Maps](https://map.yale.edu/?id=1910) –– for information on locations of printers, dining halls, butteries, etc. and their operating status (Open / Closed).
- [React Native Maps](https://github.com/react-native-maps/react-native-maps) –– for general routing from your location, as well as responsive and dynamic map rendering.

# Disclaimer

It's a work in progress!
