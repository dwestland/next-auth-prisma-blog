# next-auth-prisma-blog

A blog site with authentication

**Run local dev environment:**

```
npm run dev
```

## User Story

- User can login using GitHub and Google OAuth and passwordless login
- Retrieve blogs:
  - Display all blogs
  - Display only user's blogs
  - Display only user's likes
  - Display single blog detail with like functionality
- User can create a blog
- User can edit and delete only their own blog
- Can only create blog with a unique title
- User can like and unlike a blog but cannot like their own
- Liking a blog will have preemptive UI display

Requires SendGrid?

## Stack

- Next 11 (current version is 12)
- TypeScript
- Prisma 3
- Postgres
- Next Auth 3 (beta 4 is out)
  - Google OAuth
  - GitHub OAuth
  - Passwordless
- React Query 3

Add react-query:
npm i react-query

Add react-loader-spinner:
npm i react-loader-spinner

## Set up local dev environment

### Set up database

**Install libraries:**

```
npm i
```

## Add Secrets:

Create .env in root using .env.example as a guide. Must have local Postgres available:

```ini
# Prisma
DATABASE_URL=postgresql://johndoe:mypassword@localhost:5432/next_auth_prisma_blog?schema=public

# Next Auth
SECRET=# random string

# NEXTAUTH_URL= # Canonical URL when you deploy to production
```

To setup GitHub OAuth secrets, see https://github.com/dwestland/next-auth-github for instructions on ???

```ini
# Next Auth GitHub provider
GITHUB_ID=
GITHUB_SECRET=
```

To setup passwordless login secrets, you will need a SendGrid ??? see https://github.com/dwestland/next-auth-passwordless for instructions on ???

```ini
# Next Auth SendGrid passwordless provider
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=# API key
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=yourPostmaster@name.com
```

To setup Google OAuth secrets, see https://github.com/dwestland/next-auth-github for instructions on ???

```ini
# Google Next Auth Provider
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Next API
NEXT_PUBLIC_API=http://localhost:3000/api
```

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
