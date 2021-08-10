import { Title } from '../styles/pages/Home';
import { useState, useEffect } from 'react';

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recomendedProducts, setRecomendedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/recommended').then(response =>{
      response.json().then(data => {
        setRecomendedProducts(data);
      })
    });
  }, []);
  
  return (
    <div>
      <Title>Hello NextJs!</Title>

      <section>
        <Title>Products</Title>
        <ul>
          {recomendedProducts.map((item: IProduct) => {
            return (
              <li key={item.id}>
                {item.title}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  )
}
