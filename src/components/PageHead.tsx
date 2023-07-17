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
                <meta name="description" content="Ligare construtora" />
            )}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}