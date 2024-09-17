This web application is designed for searching movies, using NextJS with typescript.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run Build Project

You can execute this command for run build project:

```bash
npm run build
```

After building finish, you can run this:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the web.

## Run Test

To run the test, execute command below:

```bash
npm run test
```

If you want to run with coverage, run this command:

```bash
npm run test:coverage
```

## Using Web Feature

1. There is search feature in this web, first open the home page at [http://localhost:3000](http://localhost:3000) and you will see page that show search input and empty data.
2. Type something keyword in search field and that will be automatically finding movie what you type in search field, just waiting loading for while and after loading list of movie will be appear in that page.
3. If you want to show more page you can scroll to lowermost and you will see page button that if you click next button or another page it will lead you to destination page.
4. There is several conditional in this feature, if what you type in search field can't found the page will be show no data found, and if something wrong happen with server it will show error with error message from server.
