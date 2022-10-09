# YaleNav

> YaleNav is the mobile app helping students explore and navigate campus seamlessly.

**Team**: Kyle, Vincent, Graham, Jonathan, Petru, Ali.

## Stack

- MongoDB (NoSQL Database)
- Express (Backend Framework)
- React Native (Frontend Framework)
- Node.js (Backend Runtime)

This application is a MERN x RN -stack application written in TypeScript.

## Prerequisites

To run this app locally:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node v16.14](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

To run it on iOS:

- [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

## Directions

Once you have the above installed, follow these directions.

### Installation

Run `yarn install:all`. This will install all of the necessary npm packages.

### Backend

Open a terminal window and run `yarn dev:env`. This will run a MongoDB container on your local machine. Keep this terminal open.

Open another terminal window and run `yarn dev:server`. This will run the REST API on port `4000`.

### Frontend (W.I.P.)

Open another terminal window. Run _one_ of the following commands.

Run `yarn dev:client`. This will serve the client on port `3000` using Expo Go. From there you'll get to choose whether you'd like to run it on web, ios, or android. After completing the steps above, you should be able to go to `http://localhost:3000` on your browser and see the app. Unfortunately, Expo Go won't render Mapbox Maps without a developmenet build, so you won't see much right now.

Run `yarn dev:ios`. This should build a native ios version of the app using Expo and serve the client on the Xcode iOS simulator.
