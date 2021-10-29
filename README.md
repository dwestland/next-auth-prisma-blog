# next-auth-prisma-blog

## User story

- User can login using GitHub and Google OAuth and passwordless login
- Retrieve blogs
- Display only user's blogs
- Display only user's likes
- Display single blog detail with like functionality
- User can create a blog
- User can edit and delete their own blog
- Can only create blog with unique title
- User can favorite and unfavorite a blog but not their own
- Liking a blog will have preemptive display

Requires SendGrid?

## The Stack:

- Next 11
- TypeScript
- Prisma 3
- Postgres
- Next Auth 3 (current version is 4)
  - Google OAuth
  - GitHub OAuth
  - Passwordless
- React Query 3
- React Hot Toast

Add react-query:
npm i react-query

Add react-loader-spinner:
npm i react-loader-spinner

## Set up local dev environment

**Run local dev environment:**

```
npm run dev
```

### Set up database

**Install libraries:**

```
npm i
```

**Add secrets:**

Create .env in root using .env.example as a guide:

```ini
# Prisma
DATABASE_URL=postgresql://don@localhost:5432/next_auth_prisma_blog?schema=public

# Next Auth
SECRET= # random string

# NEXTAUTH_URL= # Canonical URL when your deploy to production

# Next Auth GitHub provider
GITHUB_ID=
GITHUB_SECRET=

See https://github.com/dwestland/next-auth-github for instructions on ???

# Next Auth SendGrid passwordless provider
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=admin@westland.net

See https://github.com/dwestland/next-auth-passwordless for instructions on ???

# Google Next Auth Provider
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

See https://github.com/dwestland/next-auth-github for instructions on ???

# Next API
NEXT_PUBLIC_API=http://localhost:3000/api
```

See See https://github.com/dwestland/next-auth-github for instructions on ??? for instructions on ???

**Migrate Prisma**

Warning: if existing migrations are deleted and migration is run (as if setting this up fo the first time), if there is a database named "next_auth_prisma_blog", it will be deleted.

```
npx prisma migrate dev --name my-name
```

### Seed database

**Setup user accounts**

In order for the seed to work, must create at least 3 user accounts using Github, Google or Passwordless login. There must be users with IDs 1, 2, and 3.

**Evoke Prisma seed:**

```
npx prisma db seed
```

You should be good to go...
