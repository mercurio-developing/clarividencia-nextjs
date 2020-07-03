// import App from 'next/app'
import "../style.scss";
import Layout from "../components/layout"
import 'font-awesome/css/font-awesome.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp