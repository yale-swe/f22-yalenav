# YaleNav Server

![Digital Ocean](https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

☁️ Our server is currently deployed on [DigitalOcean](https://www.digitalocean.com/products/app-platform).

To run a local instance of the server, make sure to follow the instructions in our main [README](https://github.com/yale-swe/f22-yalenav#readme).

---

## Directory Docs

### 🌱 Root-level

```
.
├── package.json
├── tsconfig.json
├── tsconfig.prod.json
└── yarn.lock
```

It's key we keep track of what packages, dependencies, and typescript compiler options we opt for to make the developer experience (a little more) seamless. These files store of the metadata that governs how are typescript code gets compiled and linted (see `tscongfig.*`) and on which scripts and dependencies our backend relies (`package.json` in particular.)

For package management, we use `yarn`.

### 📦 Source code (`src`)

```
├── src
│ ├── app.ts
│ ├── auth.ts
│ ├── index.ts
│ ├── models
| └── passport.ts
```

These help get our application up and running. It's worth noting that – aside from `passport`, the code that enables the app to integrate with [CAS](https://github.com/yale-swe/passport-cas) – the large majority of these files were provided by [MERN Example App](https://github.com/yale-swe/mern-example-app). For a closer look, we encourage you to check their walkthrough.

### 🤲 Auxiliary & data (`utils`, `data`)

```
│ └── utils
│ │ ├── campusBuildings.ts
│ │ ├── coursetableCourses.ts
│ │ ├── environment.ts
│ │ ├── general.ts
│ │ ├── polygon.ts
│ │ ├── shuttleStops.ts
│ │ └── yaliesUser.ts
│ ├── data
│ │ ├── courses.json
│ │ └── polygonCoords.json
```

Often, functionality / data gets reused across the stack. From API-response parsing to building-footprint calculations, these files house some the complexities that (1) warrant implementation on the server-side, and (2) are intuitively abstracted from our routing handlers.

### 🌐 Routes (`routes`)

```
│ ├── routes
│ │ ├── buildings.ts
│ │ ├── courses.ts
│ │ ├── index.ts
│ │ ├── shuttle.ts
│ │ └── user.ts
```

Simple: each file in the `routes` module corresponds to the call a user makes as they play around with our app. Here, the [Express](https://expressjs.com/) does a lot of the heavy-lifting.

Given that some of the routes ultimately rely on third-party APIs, our system caches the data in our DB. You'll notice that for some of the routes (e.g. `buildings`), we add a check before the route walks over to our DB. This ensures that the API's data has already been fetched and stored – especially helpful during development (e.g. when making changes to our schema), or running the app locally.

### 🤖 Schema (`models`)

```
│ ├── models
│ │ ├── Building.ts
│ │ ├── Course.ts
│ │ ├── index.ts
│ │ ├── ShuttleStop.ts
│ │ └── User.ts
```

While we might've opted to forgo using certain schemas in favour of the APIs' response right off the bat (e.g. just use Buildings V2 response in the client), we want to model each object with clarity and consistency. Our schema makes sure that (1) each model _only_ stores information critical to the app's functionality, and (2) caching data would be easy.

We use [mongoose](https://mongoosejs.com/docs/) to connect to our DB (modelled on [Mongo](https://www.mongodb.com/home)).

### 📝 Testing (`tests`, `testUtils`)

```
│ ├── tests
│ │ ├── buildings.test.ts
│ │ ├── courses.test.ts
│ │ └── user.test.ts
│ ├── testUtils
│ │ ├── jest.config.js
│ │ ├── mongoose.ts
└─└─└── setup.ts
```

Everyone's favorite! We use [jest](https://jestjs.io/) to test the APIs, the functionality of our routes, and our schema. To dive deeper into how our server is being tested, we suggest you check the files out for yourselves.
