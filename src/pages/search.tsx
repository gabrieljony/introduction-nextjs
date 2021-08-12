import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { GetServerSideProps } from "next";
import { client } from "@/lib/prismic";
import Link from "next/link";

interface SearchProps {
  searchResults: Document[];
}

export default function Search({ searchResults }: SearchProps) {
  const router = useRouter();

  const [search, setSearch] = useState('');

  function handleSearch(eventSubmit: FormEvent) {
    eventSubmit.preventDefault(); //evitar o carregamento da tela quando se faz uma busca

    router.push(
      `/search?q=${encodeURIComponent(search)}`
    )

    setSearch(''); //limpar o campo de pesquisa
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
        <button type="submit">Search</button>
      </form>

      <h2>Listagem de Produtos</h2>

      <ul>
          {searchResults.map((product) => {
              return (
                  <li key={product.id}>
                  <Link href={`/catalog/products/${product.uid}`}>
                    <a>
                      {PrismicDOM.RichText.asText(product.data.title)}
                    </a>
                  </Link>
                </li>
              );
          })}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (context) => {
  const { q } = context.query;

  if(!q){
    return {
      props: {
        searchResults: []
      }
    };
  }

  const searchResults = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.fulltext('my.product.title', String(q))
  ]);
  console.log('searchResults', searchResults)

  return {
    props: {
      searchResults: searchResults.results
    }
  }
}
