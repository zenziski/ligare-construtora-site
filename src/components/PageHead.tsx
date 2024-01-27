import Head from "next/head";

interface IPageHeadProps {
    title: string
    description?: string;
}

export const PageHead = (props: IPageHeadProps) => {
    return (
        <Head>
            <title>
                {`${props.title} | Ligare`}
            </title>
            {props.description ? (
                <meta name="description" content={props.description} />
            ) : (
                <meta name="description" content="Ligare Construtora" />
            )}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content="Ligare Construtora" />
            <meta property="og:description" content="A Ligare Construtora tem uma história de mais de 10 anos atuando no mercado  de construção e reforma em Curitiba e região." />
            <meta property="og:image" content="https://ligareconstrutora.com.br/imgs/logo_text.png" />
            <meta property="og:url" content="https://ligareconstrutora.com.br" />
            <meta property="og:type" content="website" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}