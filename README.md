# next-auth-prisma-blog

### The Stack:

- Next JS
- TypeScript
- Prisma
- Postgres
- Next Auth
- React Query
- React Toastify

Add react-query:
npm i react-query

Add react-loader-spinner:
npm i react-loader-spinner

# next-auth-passwordless

## Notes from creating this repository

**Started from the next-auth-passwordless repository**

**Start dev:**

```
npm run dev
```

**Add dev dependencies:**

```
npm i -D ts-node
```

**:**

```

```

**Prisma migrate**

Warning: if existing migrations are deleted and migration is run (as if setting this up fo the first time), if there is a database named "next_auth_prisma_blog", it will be deleted.

```
npx prisma migrate dev --name initial
```

**Format schema.prisma**

```
npx prisma format
```

## Seed database

**Add blog data file:**

```
data/articles.ts
```

**Add seed file:**

```
prisma/seed.ts
```

**Added to the rules object to the .eslintrc.js file:**

```js
  extends: [
    ...
    'plugin:import/typescript',
  ],
```

**Add to the rules object to the .eslintrc.js file:**

```js
  rules: {
    ...
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': 'off',
  }
```

**Add to the package.json object:**

```json
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
```

**Evoke Prisma seed:**

```
npx prisma db seed
```
