# next-auth-prisma-blog

A blog site with authentication

**Run local dev environment:**

```
npm run dev
```

### Github Actions:

start runner on server:

```
~/actions-runner/run.sh
```

## User Story

- User can login using GitHub or Google OAuth or passwordless login
- User can retrieve blogs:
  - Display all blogs
  - Display only user's blogs
  - Display only user's likes
  - Display single blog detail with like functionality
- User can create a blog
- Use can only create blog with a unique title
- User can only edit and delete only their own blog
- User can like and unlike a blog but cannot like their own
- Liking a blog will have preemptive UI display

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

**Install libraries:**

```
npm i
```

### Set up database

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

## Build Database

If anybody running into this issue, just run
`npx prisma generate`
This will re-establish the link between schema.prisma and .env file.

### Migrate Prisma

Warning: if existing migrations are deleted and migration is run (as if setting this up fo the first time), if there is a database named "next_auth_prisma_blog", it will be deleted.

```
npx prisma migrate dev --name my-named-migration
```

### Seed database

```
npx prisma db seed
```

You should be good to go...

## Nginx Server Blocks:

### Initial block:

```ini
server {
  listen 80;
  listen [::]:80;

  server_name next-auth-prisma-blog.westland.net;
  root /srv/www/next-auth-prisma-blog.westland.net;
  index index.html;

  access_log  /var/log/nginx/next-auth-prisma-blog.westland.net_access.log;
  error_log  /var/log/nginx/next-auth-prisma-blog.westland.net_error.log;

  location / {
    try_files $uri $uri/ =404;
  }
}
```

### Certbot block:

```ini
# Redirect from http to https
server {
  listen 80;
  listen [::]:80;
  access_log off;
  error_log off;
  server_name next-auth-prisma-blog.westland.net;
  return 301 https://$host$request_uri;
  root /srv/www/next-auth-prisma-blog.westland.net;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;

  server_name next-auth-prisma-blog.westland.net;
  root /srv/www/next-auth-prisma-blog.westland.net;
  index index.html;

  ssl_certificate /etc/letsencrypt/live/next-auth-prisma-blog.westland.net/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/next-auth-prisma-blog.westland.net/privkey.pem;

  access_log  /var/log/nginx/next-auth-prisma-blog.westland.net_access.log;
  error_log  /var/log/nginx/next-auth-prisma-blog.westland.net_error.log;
}
```

## stg.mybeachcams.com Server Blocks

### Initial block:

```ini
server {
  listen 80;
  listen [::]:80;

  server_name stg.mybeachcams.com;
  root /srv/www/stg.mybeachcams.com;
  index index.html;

  access_log  /var/log/nginx/stg.mybeachcams.com_access.log;
  error_log  /var/log/nginx/stg.mybeachcams.com_error.log;

  location / {
    try_files $uri $uri/ =404;
  }
}
```

### Certbot block:

```ini
# Redirect from http to https
server {
  listen 80;
  listen [::]:80;
  access_log off;
  error_log off;
  server_name stg.mybeachcams.com;
  return 301 https://$host$request_uri;
  root /srv/www/stg.mybeachcams.com;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;

  server_name stg.mybeachcams.com;
  root /srv/www/stg.mybeachcams.com;
  index index.html;

  ssl_certificate /etc/letsencrypt/live/stg.mybeachcams.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/stg.mybeachcams.com/privkey.pem;

  access_log  /var/log/nginx/stg.mybeachcams.com_access.log;
  error_log  /var/log/nginx/stg.mybeachcams.com_error.log;
}
```
