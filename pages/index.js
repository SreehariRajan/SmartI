import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import logo from "../assets/images/homelogo.png";
import { Context } from '../context/Context';

export default function Home() {

  const { connectWallet, currentAccount } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (currentAccount) {
      setLoading(true);
      setTimeout(() => {
        router.push("/logs");
      }, [1000]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount])
  return (
    <div className={"container_sub "}>
      <Head>
        <title>Smart i</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.body}>
        <div className={styles.box}>
          {
            !loading ?
              <>
                <div className={styles.logo}><Image src={logo} alt="" /></div>
                <p>Keeping an eye on your safety</p>
                <button onClick={() => connectWallet()} className={styles.button}>Connect Wallet</button>
              </>
              :
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
          }
        </div>
      </div>
    </div>
  )
}

const styles = {
  body: 'flex justify-center items-center h-full w-full text-white',
  box: "w-2/4 p-5 py-14 h-[50vh] flex flex-col items-center justify-center bg-slate-500 bg-opacity-10 rounded-3xl backdrop-blur-3xl font-bold  border border-white border-opacity-[0.2]",
  button: "text-black bg-white px-5 py-2 rounded font-bold mt-5",
  logo: "w-36 mb-10"

}
