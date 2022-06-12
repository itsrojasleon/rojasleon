import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';

export enum Resources {
  Posts = 'posts',
  Projects = 'projects',
  Notes = 'notes'
}

export const getResources = (resource: string) => {
  const directory = path.join(process.cwd(), resource);
  const filenames = fs.readdirSync(directory);

  const resources = filenames.map((filename) => {
    const file = fs.readFileSync(path.join(resource, filename)).toString();
    const parsedMarkdown = matter(file);

    return {
      ...parsedMarkdown.data,
      route: filename.replace('.md', '')
    } as any;
  });

  return resources;
};

export const getResource = (resource: string, slug: string[] | string) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join(resource, slug + '.md'))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);
  const htmlString = marked(parsedMarkdown.content);

  return { htmlString, parsedMarkdown };
};

export const getPaths = (resource: string) => {
  const files = fs.readdirSync(resource);
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }));

  return paths;
};
