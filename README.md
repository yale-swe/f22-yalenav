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

## Recommendations

- [Expo Go](https://expo.dev/client)

## Directions

Once you have the above installed, follow these steps.

Run `yarn install:all`. This will install all of the necessary npm packages.

Open a terminal window and run `yarn dev:env`. This will run a MongoDB container on your local machine and the REST API on port `4000`. Keep this terminal open.

Open another terminal window. Run `yarn dev:client`. This will serve the client on port `3000` using Expo Go. From there you'll get to choose whether you'd like to run it on web, ios, or android. After completing the steps above, you should be able to go to `http://localhost:3000` on your browser and see the app.
