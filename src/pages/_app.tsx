import "../styles/globals.css"
import "moment/locale/pt-br"

import type { AppProps } from "next/app"
import Layout from "../layout"
import moment from "moment"

moment.locale("pt-br")

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
