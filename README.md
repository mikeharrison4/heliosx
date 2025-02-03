## Run the application locally

First, install the packages needed to run the application
```bash
npm install
```

Then run the development server: (**Please use Node version 18.18 or higher**)

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Run tests locally

```bash
npm run test
```

## Tech

* NextJS (App router)
* Typescript
* TailwindCSS
* Jest + RTL 

## Notes

* Chose App router over Page router, mainly for the reason that is offers a more server-centric approach with the option to opt-in to CSR when necessary
* Opted to create a single test file which tested the full functionality of the consultation page. This uses an integrated testing approach, which renders multiple components in the same test ensuring they all work together. Inspiration for this approach can be found here https://kentcdodds.com/blog/write-tests
