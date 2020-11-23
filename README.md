# Pomelo Nodejs Challenge app

This is an application for Pomelo Nodejs code challenge

## Installation

Use the npm package manager for [node](https://nodejs.org/en/) to install this app.

```bash
npm install
```

## Running this app

``` bash
npm run dev # running this app in development mode (auto compilation on file changes).
npm run build # build this application to plain JS file.
npm run start # start the server.
npm run test # test this application.
```

## Project strcture

The project structure is described in the code section below.

``` bash
.
├── dist            # Transpiled code path, ready to run 
├── docs            # API document path
│   ├── postman
│   └── swagger
├── src
│   ├── assets
│   ├── client      # front-end
│   │   └── components
│   ├── models      # models for input validation
│   ├── server      # server-side
│   │   ├── routes
│   │   └── __tests__
│   └── services    # back-end logic
│       └── __tests__
└── types
```

## API documentation

please see: https://app.swaggerhub.com/apis-docs/k1123/pomelo-challenge/1.0.0

## Technology used

- TypeScript
- Hapi
- Vuejs
- jest

## License
[MIT](https://choosealicense.com/licenses/mit/)