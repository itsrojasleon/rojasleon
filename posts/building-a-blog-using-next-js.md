---
title: 'Learn how to create a blog using next js'
description: 'Create a blog using next js, typescript and tailwindcss'
date: '27-06-2020'
---

# Building a blog using Next js, typescript and tailwindcss

Before starting you must know what Next, Typescript and Tailwindcss are.

- [Next js](https://nextjs.org/) is a react framework used to build many kinds of apps.

- [Typescript](https://www.typescriptlang.org/) is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.

- [Tailwindcss](https://tailwindcss.com/) is a utility-first CSS framework for
  rapidly building custom designs.

## 1. Getting started

### Create the Next app

```shell
npx create-next-app my-amazing-blog
```

This will create a simple next app with the required libraries already installed. Then, we can install the dependencies to work with tailwindcss

```shell
npm i tailwindcss autoprefixer postcss-import --save
```

To add typescript support we need to install the following dependencies

```shell
npm i @types/node @types/react typescript --save-dev
```

and create a `tsconfig.json` file

```shell
touch tsconfig.json
```

Rename your `.js` files to `.tsx or .ts`

### Run the project

Run `npm run dev` and open `http://locahost:3000` in your browser.

## 2. Adding some style

We need to configure tailwindcss, to do that, let's create a `postcss.config.js` file in the root project

```javascript
// postcss.config.js
module.exports = {
  plugins: ['postcss-import', 'tailwindcss', 'autoprefixer']
};
```

Create `css` folder in root, inside of that folder create a `tailwind.css` file

```css
/* css/tailwind.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

Then create a `_app.tsx` file in the pages folder with the following code.

Next.js uses the App component to initialize pages. With (`_app.tsx`) you can override it and control the page initialization, for example add global CSS.

```typescript
// pages/_app.tsx
import '../css/tailwind.css';

const AppComponent = ({ Component, pageProps }) => <Component {...pageProps} />;

export default AppComponent;
```

And now you're ready to test tailwindcss integration... You can add a className property to any element inside your app. For example let's choose the `pages/index.tsx` file.

```typescript
// pages/index.tsx
export default function Home() {
  return <h1 className="text-4xl">Home Page</h1>;
}
```

Allright, now we are ready to start with the blog.

## 3. Create a layout (control and style purposes)

Create a `components` directory in root, inside that folder create a `layout.tsx` file. This is perfect to put components that we need to show in all of our pages. You can create your custom components and add them. I'll create a `Header` component.

```typescript
// components/layout.tsx
import Header from './header';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <div className="m-16">{children}</div>
  </>
);

export default Layout;
```

Wrap your `AppComponent` with this component, something like this

```typescript
// pages/_app.tsx
import Layout from '../components/layout';
import '../css/tailwind.css';

const AppComponent = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default AppComponent;
```

## 4. Fetching and rendering posts

Create your `.md` files which there are the posts, let's add them inside `posts` folder (yes, create that folder in root) with the following content

```markdown
<!-- posts/hello.md -->

---

title: 'Learn how to create a blog using next js'
description: 'Create a blog using next js, typescript and tailwindcss'

---

# Hello there
```

Inside `pages` create a new folder called `blog`, then two files inside it...

- index.tsx
- [slug].tsx

Before that, let's install two simple dependencies to work with markdown files

```shell
npm i gray-matter marked --save
```

```typescript
// pages/blog/index.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

interface Blog {
  title: string;
  description: string;
  route: string;
}

interface Props {
  posts: Blog[];
}

const Blog = ({ posts }: Props) => (
  <>
    <h1 className="text-4xl">Blog</h1>
    <ul>
      {posts.map((info) => (
        <li key={info.title}>
          <Link href="/blog/[slug]" as={`/blog/${info.route}`}>
            <a>{info.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const file = fs.readFileSync(path.join('posts', filename)).toString();
    const parsedMarkdown = matter(file);

    return { ...parsedMarkdown.data, route: filename.replace('.md', '') };
  });

  return {
    props: {
      posts
    }
  };
};

export default Blog;
```

Files can be read directly from the filesystem in `getStaticProps`.

In order to do so you have to get the full path to a file.

Since Next.js compiles your code into a separate directory you can't use `__dirname` as the path it will return will be different from the pages directory.

Instead you can use `process.cwd()` which gives you the directory where Next.js is being executed.

If you open your browser at `http://localhost:3000/blog` you will see the name of each markdown file

```typescript
// pages/blog/[slug].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';

const Post = ({ htmlString, data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta title="description" content={data.description} />
      </Head>
      <div className="markdown">
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('posts');
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join('posts', slug + '.md'))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);
  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data
    }
  };
};

export default Post;
```

If a page has dynamic routes [documentation](https://nextjs.org/docs/routing/dynamic-routes) and uses `getStaticProps` it needs to define a list of paths that have to be rendered to HTML at build time.

If you export an async function called getStaticPaths from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.

Right now if you click any link in `http://localhost:3000/blog` you will be redirected to `http://localhost:3000/blog/[markdown-file]` and you should be able to see the content.

**Where are the markdown styles?**

## 5. Adding last styles

To see appear the markdown styles let's create a `markdown.css` file inside the `css` folder. Please go to this link and copy all of the styles, the file it's quite large and it's going to take some space in the screen to see it.

[css file](https://here)

Then add the styles in `pages/_app.tsx` to make it global

```typescript
// pages/_app.tsx
import '../css/tailwind.css';
import '../css/markdown.css';

const AppComponent...

```

## Thanks for reading

You can find the github repo [rojasleon](https://github.com/rojasleon/next-typescript-simple-blog) and the deployment [next-typescript-simple-blog](https://next-typescript-simple-blog.rojasleon.vercel.app/)
