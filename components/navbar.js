import Link from 'next/link';
import React, { useContext } from 'react';
import { Context } from "../context/Context";
import logo from "../assets/images/logo.png"
import Image from 'next/image';
function NavBar(props) {
    const { connectWallet, currentAccount } = useContext(Context);
    console.log(currentAccount)
    return (
        <div className={styles.container}>
            <div>

                <Link href="/"><div className={styles.logo}><Image src={logo} /></div></Link>
            </div>
            {currentAccount !== undefined &&
                <div className='flex flex-row items-center'>
                    <Link className={styles.link} href="/uploads">Uploads</Link>
                    <Link className={styles.link} href="/add_evidence">Add evidence</Link>
                    <Link className={styles.link} href="/logs">Logs</Link>
                    <Link className={styles.link} href="/pinned_logs">Pinned logs</Link>
                    <p className={styles.button}>{currentAccount}</p>
                </div>
            }
        </div>
    );
}

export default NavBar;


const styles = {
    container: "w-full h-20 px-5 text-white backdrop-blur-3xl flex items-center justify-between",
    link: "font-bold mr-10",
    button: "text-black bg-white py-2 rounded font-bold w-36 px-3 truncate",
    logo: "w-20 h-10"

}