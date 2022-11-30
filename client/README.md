# YaleNav Client

![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

📱 Our app's client runs on Expo.

To run a local instance of the server, make sure to follow the instructions in our main [README](https://github.com/yale-swe/f22-yalenav#readme).

You should be able to run this app on iOS, Android, or a simulator.

---

## Directory Docs

### 🌱 Root-level

```
├── app.json
├── App.tsx
├── babel.config.js
├── index.js
├── jest.config.js
├── jest-setup.js
├── package.json
├── tsconfig.json
├── types.ts
└── yarn.lock
```

At the this level, we store a number of files to keep the packages and dependencies that back our app in order.
Notably, we declare all object models (see `types.ts`) that our client will be using from our server, so that our system can interface with it seamlessly (recall that TypeScript is a strongly-typed programming language). We also add some of the testing set up files, and config files to ensure the app compiles correctly. Importantly, the top-level declaration of the React Native app is found in `App.tsx`, which in turn calls the lower-level layers of the app.

It's worth noting that most of the other files are auto-generated (e.g., `app.json`, `tsconfig.json`, etc.), so aren't insightful with regards to the frontend's core functionality.

As is the case with the server code, for package management, we use `yarn`.

### 🎨 Assets

```
├── assets
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   ├── splash.png
│   └── yalenav.png

```

We organize any raster files into the assets directory. This way we don't clog up the source code.

### 📦 Source code (`src`)

```
├── src
│   ├── constants.ts
│   ├── css
│   │   ├── mapStyle.json
│   │   └── styles.tsx

```

The heart of our application. Any code held in `constants.ts` refers to global variables that we use across the application. Any code held in `css` relates to our map and components' styling.

### 🧭 Navigation

```
│   ├── navigation
│   │ ├── AuthStack.tsx
│   │ ├── Navigation.tsx
│   │ └── UnauthStack.tsx
```

This portion of source code governs how our app licenses authenticated and unauthenticated users to navigate across the application, with either unlimited or limited access. This is also the first layer called by the top-level `App.tsx` above.

### 📺 Contexts & Screens

```
│   ├── contexts
│   │   └── Auth.tsx
│   ├── screens
│   │ ├── EditSchedule.tsx
│   │ ├── HomeScreen.tsx
│   │ ├── SignInScreen.tsx
│   │ └── UserProfile.tsx
```

While navigation helps limit views between unauthenticated and authenticated access to the app, it's both `contexts` and `screens` that determines _how_ they get authenticated, and _what_ they see when they do.
In particular, the app is split up into four screens: one that allows them to sign in (`SignInScreen.tsx`), one that renders the map (`HomeScreen.tsx`), one that surfaces their profile (`UserProfile.tsx`), and one that enables the user to manage their schedule (`EditSchedule.tsx`).

### 🧱 Components

```

│   ├──  components
│   │ ├── index.ts
│   │ ├── map
│   │ │ ├── MapBanner.tsx
│   │ │ ├── Map.tsx
│   │ │ └── ReactNativeMap.tsx
│   │ ├── navigation-bar
│   │ │ └── NavigationBar.tsx
│   │ ├── routing
│   │ │ └── RoutingView.tsx
│   │ ├── schedule
│   │ │ ├── CourseListing.tsx
│   │ │ └── ScheduleForm.tsx
│   │ ├── search
│   │ │ ├── CampusSpots.tsx
│   │ │ ├── SearchResult.tsx
│   │ │ ├── Search.tsx
│   │ │ └── SpotButton.tsx
│   │ └── shortcut
│   │ └── NextClass.tsx

```

All the building blocks of YaleNav. There's a lot to go through so we'll spare giving you a rundown of each and every one. To understand how they work, we recommend you see the code for yourself – we hope you'll find our comments useful.

### 🤲 Auxiliary (`utils`)

```
│ └── utils
│   ├── campusSpots.ts
│   ├── courseHandlers.ts
│   ├── general.ts
│   ├── index.ts
│   ├── nextClass.ts
│   └── userHandlers.ts

```

As in our server, these files house some the complexities that are abstracted away from the components. For instance, `nextClass` calculates the next class on the user's schedule. Since there's a lot of logic that underlies that, we wrote it outside of the NextClass component.

### 📝 Testing (`tests`, `testUtils`)

```

├── test
│   ├──  base.test.tsx
│   ├──  editSchedule.test.tsx
│   ├──  mapBanner.test.tsx
│   ├──  map.test.tsx
│   ├──  mockData
│   │ ├── buildingMock.ts
│   │ ├── collegesMock.ts
│   │ ├── courseMock.tsx
│   │ ├── diningHallMock.ts
│   │ ├── librariesMock.ts
│   │ ├── resultsMockData.ts
│   │ └── usersMock.ts
│   ├──  nextClass.test.tsx
│   └── searchBar.test.tsx

```

As is the case with the backend, we use [jest](https://jestjs.io/) to test our frontend in order to make sure that each component in React Native is rendered correctly.
