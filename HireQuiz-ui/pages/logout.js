// pages\logout.js
// Created by: Parita
// Last Updated by: Parita on June 21 
import Head from 'next/head';
import { Auth } from '../lib/auth';

export default function Logout() {
  return (
    <>
      <Head>
        <title>Logout</title>
        <meta name="description" content="Login to your app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form>
          <div className="p-3 mb-2 bg-light text-dark">
            <div className="mt-5 col-md-12">
              <div className="text-center">
                <p>Are you sure you want to Logout?</p>
                <button id="logout" className="btn btn-primary" onClick={Auth.signOut()}>Logout</button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
