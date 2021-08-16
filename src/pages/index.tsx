import { Title } from '@/styles/pages/Home';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

interface IProduct {
  id: string;
  title: string;
}
interface HomeProps {
  recomendedProducts: Document[];
}

export default function Home({ recomendedProducts }: HomeProps) {
  async function handleSum() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log('isOpen', isOpen)
    console.log('process.env.API_UR - Variavel de ambiente restrita', process.env.API_UR)
    console.log('process.env.NEXT_PUBLIC_API_URL - Variável de ambiente publica', process.env.NEXT_PUBLIC_API_URL)
    const math = (await import('@/lib/math')).default;
    // alert(math.sum(3,5));
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Aviso</ModalHeader>

          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <div>
      <SEO
        title="DevCommerce, your best ecommerce!"
        image="boost.png"
        shouldExcludeTitleSuffix />
      <Title>Hello NextJs!</Title>

      <section>
        <Title>Products</Title>
        <ul>
          {recomendedProducts.map((item: Document) => {
            return (
              <li key={item.id}>
                <Link href={`/catalog/products/${item.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(item.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <Button colorScheme="blue" onClick={handleSum}>Sum!</Button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recomendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);
  console.log('recomendedProducts', recomendedProducts)

  return {
    props: {
      recomendedProducts: recomendedProducts.results
    }
  }
}
