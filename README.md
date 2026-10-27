# Text Generator Web App Template

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Config App

Create a file named `.env.local` in the current directory and copy the contents from `.env.example`. Setting the following content:

```
# APP ID
NEXT_PUBLIC_APP_ID=
# APP API key
NEXT_PUBLIC_APP_KEY=
# APP API URL
NEXT_PUBLIC_API_URL=
# APP type
# true for workflow apps
NEXT_PUBLIC_APP_TYPE_WORKFLOW=
```

Config more in `config/index.ts` file:

```js
export const APP_INFO: AppInfo = {
  title: 'Chat APP',
  description: '',
  copyright: '',
  privacy_policy: '',
  default_language: 'zh-Hans'
}

export const isShowPrompt = true
export const promptTemplate = ''
```

## Authentication

The webapp is protected by a lightweight session-based login. Passwords are never stored in the repository: only scrypt hashes and a session signing secret are read from the environment.

Add these variables to `.env.local` or to your hosting provider's environment settings:

```bash
AUTH_USER_AFUJII_HASH=
AUTH_USER_BCHENQUE_HASH=
AUTH_SESSION_SECRET=
```

Generate a password hash with:

```bash
npm run auth:hash
```

The command prints a strong random password and the corresponding hash. Copy the hash to the matching `AUTH_USER_<NAME>_HASH` variable and keep the password in a password manager. To use your own password instead, pass it as an argument: `npm run auth:hash -- 'your-password'`.

Generate the session secret with:

```bash
openssl rand -hex 48
```

Sessions are stored in an HttpOnly, SameSite=Lax cookie valid for seven days. Use the account menu at the bottom-left of the app to sign out. Rotating `AUTH_SESSION_SECRET` invalidates all active sessions.

For container deployments, pass the `AUTH_*` variables at runtime instead of baking them into the image. `.env.local` and the local credentials file are excluded through `.dockerignore`.

For the complete architecture, login/session flow, operations, deployment notes, and troubleshooting, see [docs/authentication.md](docs/authentication.md) (in Portuguese).

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on EdgeOne Pages

[![Use EdgeOne Pages to deploy](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https://github.com/langgenius/webapp-text-generator)

Deploy your Next.js application to Tencent EdgeOne Pages with just one click and go live in minutes.

After clicking, simply log in to the EdgeOne Pages console, configure your build command, select an acceleration region, and set your environment variables as described in the Config App section above. 

For a detailed walkthrough, see the Importing a Git Repository [guide](https://pages.edgeone.ai/document/importing-a-git-repository).

## Deploy on Vercel

> ⚠️ If you are using [Vercel Hobby](https://vercel.com/pricing), your message will be trucated due to the limitation of vercel.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
