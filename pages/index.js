import Head from "next/head";
import { database } from "../firebase/firebaseConfig"
import { ref, set } from "firebase/database";
import NavBar from "@/components/navBar";
import AuthContextProvider from "@/contexts/AuthContex";

const addData = () => {
  set(ref(database, "klm"), {"users": "w"})
}

export default function Home() {
  return (
    <>
      <Head>
        <title>PriceWise</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <AuthContextProvider>
          <NavBar />
        </AuthContextProvider>
        ana sayfa
        <button onClick={() => addData()}>ekle</button>
      </div>
    </>
  );
}
