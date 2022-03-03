import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import {RichText} from 'prismic-dom';

import {getPrismicClient} from '../../services/prismic';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useState } from 'react';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  
}
interface PostsProps {
  posts: Post[];
  page: number ;
  total_page: number ;
}

export default function Posts({posts,  page, total_page}: PostsProps){

  return(
    <>
      <Head>
        <title>Posts |  Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
         {posts.map(post => (
           <Link href={`/posts/${post.slug}`} key={post.slug}>
            <a>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          </Link>
         ))}
        </div>

        <div className={styles.pagination}>
          <Link href={`/posts/page/${page + 1}`}>
            <a>Página {page} de {total_page}</a>
          </Link>
        </div>

        <div className={styles.pagination}>
          <Link href={`/tag/${'elixir'}`}>
            <a>Tag Elixie</a>
          </Link>
        </div>

        <div className={styles.pagination}>
          <Link href={`/tag/${'jamstack'}`}>
            <a>Tag jamstack</a>
          </Link>
        </div>

        <div className={styles.pagination}>
          <Link href={`/tag/${'programacao'}`}>
            <a>Tag programacao</a>
          </Link>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const prismic = getPrismicClient();
  console.log('TESTE DE PARAMETROS', params)

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 1,
  })


  // console.log(JSON.stringify(response, null, 2))

  console.log('pagina final', response)

  const posts  = response.results.map(post => {
    return {
      slug: post.uid,
      //@ts-ignore
      title: RichText.asText(post.data.title),
      //@ts-ignore
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  
  return {
    props: {
      posts,
      page: response.page,
      total_page: response.total_pages,
    }
  }
}