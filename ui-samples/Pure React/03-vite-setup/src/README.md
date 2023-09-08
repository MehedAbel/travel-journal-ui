# Setting Up Vite with React

We will go step-by-step on how to configure our project with Vite as a build tool.

## Initialize the project

We need to create a `package.json` file in our project by running the command:

```bash
npm init -y
```
This file holds various metadata relevant to the project by adding `-y` it will skip a series of questions such as name, version, description, keywords, author, license and so on.

## Create a .gitignore file

This file will tell Git which files and directories to ignore when commiting the changes

```bash
touch .gitignore
```
In a typical project, we need to intentioanlly untrack files that Git should ignore

It will include:

```txt
node_modules/
```

## Install Vite and React Plugin

**Vite:** Is a build tool that aims to provide a faster and leaner development experience for modern web projects. Previous React used webpack most of the time but now the transition is to Vite.

**Vite React Plugin:** Is a plugin that adds React support to Vite. It provides the JSX support which we will talk about it later.

```bash
npm i vite vitejs/plugin-react
```

## Create a React File

Let's delete the `scripts` inside our html file where we get the react. Then create a new file `App.jsx` where you will write your React Code. Don't forget to change the name in the script as well and add the `type="module`, it is required for Vite.

**App.jsx**: Remember that this file is your main React Component, it will hold the root of your application.

## Install React and ReactDOM

```bash
npm i react react-dom
```


## Create the src directory

Move all your files into a new directory named `src`. This will be the main directory for source files.

Is a dedicated directory which makes it easier to separate the source code from configuration files.

## Create and Configure Vite

Create a new file `vite.config.js` in your project root. This file will be used to configure Vite.


Add the following into `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    root: "src"
})
```

The plugins property is to tell Vite that we're using react.
The root contains `src` because we have the `index.html` inside that folder. If it's outside the `src` directory, it can be ignored.
## Import React and ReactDOM in App.jsx

Now we don't need to use the scripts as before, so we can import React and ReactDOM directly in our files.

```js
import React from "react";
import ReactDOM from "react-dom";
```

## Update Scripts in package.json

Include the following scripts:

```json
"scripts": {
    "start": "vite dev",
    "build": "vite build"
}
```

Scripts defined in `package.json` are used in our case to start the local development server, while the "build" script is used to create a production-ready build.