# Boilerplate

Using Storyblok blok horror horror blok blok horror

## Usage

### Getting started

#### Get the code

1. Use the "Use this template" button on GitHub to create a new project
2. `git clone` the new project as your normally would
3. `cd` into the project directory

#### Install dependencies

1. Install [Yarn](https://yarnpkg.com/getting-started/install)
2. Run `yarn` in the project directory to install dependencies

#### Set up local development

Storyblok v2 requires your app is served via HTTPS. Below is a step by step guide on how you can set up an HTTPS proxy for your development server on macOS:

1. `cd` into your project directory
2. Install mkcert for creating a valid certificate and Install localhost with mkcert

```sh
brew install mkcert
mkcert -install
mkcert localhost
```

3. Install the HTTPS proxy:

```sh
npm install -g local-ssl-proxy
```

4. Run the development server and, in a separate terminal window, run the proxy:

```sh
yarn dev
# in a separate terminal window
yarn dev:https
```
