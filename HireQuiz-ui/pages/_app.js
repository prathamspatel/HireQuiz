// pages\_app.js
// Created by: Nirav, Pratham
// Last Updated by: Nirav on June 08

import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from '../components/Layout';
import { SWRConfig } from "swr"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <SWRConfig 
        value={{
          fetcher: async (url) => {
            const res = await fetch(url);
            if (!res.ok) {
              const error = new Error(
                "An error occurred while fetching the data."
              );
              error.info = await res.json();
              error.status = res.status;
              throw error;
            }
            return res.json();
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  );
}
export default MyApp