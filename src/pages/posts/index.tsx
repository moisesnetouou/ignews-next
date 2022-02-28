import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';

import {getPrismicClient} from '../../services/prismic';
import styles from './styles.module.scss';


export default function Posts(){
  return(
    <>
      <Head>
        <title>Posts |  Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>28 de fevereiro</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>Creating a Monorepo with Lerna & Yarn WorkspacesCreating a 
              Monorepo with Lerna & Yarn WorkspacesCreating a Monorepo with Lerna 
              & Yarn Workspaces</p>
          </a>

          <a href="#">
            <time>28 de fevereiro</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>Creating a Monorepo with Lerna & Yarn WorkspacesCreating a 
              Monorepo with Lerna & Yarn WorkspacesCreating a Monorepo with Lerna 
              & Yarn Workspaces</p>
          </a>

          <a href="#">
            <time>28 de fevereiro</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>Creating a Monorepo with Lerna & Yarn WorkspacesCreating a 
              Monorepo with Lerna & Yarn WorkspacesCreating a Monorepo with Lerna 
              & Yarn Workspaces</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100
  })

  console.log(JSON.stringify(response, null, 2))

  return {
    props: {
      response
    }
  }
}