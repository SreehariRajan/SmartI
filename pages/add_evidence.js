import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import logo from "../assets/images/homelogo.png";
import { Context } from '../context/Context';
import { makeStorageClient } from '../utils/services';
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { evidencesContractAddress } from '../config';
import EvidenceContract from "../artifacts/contracts/SmartIEvidences.sol/SmartIEvidences.json"
import Header from '../components/header';

export default function AddEvidence() {

    const { currentAccount,
        connectWallet,
        notification,
        setNotification,
        addedCaseDetails,
        loadingC,
        setLoadingC } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formInput, setFormInput] = useState({ case_id: '', name: '', description: '' });
    const [fileUrl, setFileUrl] = useState(null);


    async function onChange(e) {
        setNotification(" ")
        setLoadingC(true);
        try {
            console.log("started adding");

            const client = makeStorageClient();
            const cid = await client.put(e.target.files);

            const response = await client.get(cid);
            if (!response.ok) {
                throw new Error(`failed to get ${cid}`)
            } else {
                const files = await response.files();
                for (const file of files) {
                    console.log(`${file.cid} -- ${file.name} -- ${file.size}`)
                    setFileUrl(`https://${cid}.ipfs.w3s.link/${file.name}`);
                }

            }

        } catch (e) {
            console.log(e);
        } finally {
            setNotification(" Uploaded file .")
            setLoadingC(false);
            console.log("finished adding");
        }


    }

    async function submitEvidence() {
        setLoadingC(true);
        setNotification(" ");
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()


        let contract = new ethers.Contract(evidencesContractAddress, EvidenceContract.abi, signer)
        let transaction = await contract.addEvidence(formInput.case_id, formInput.name, formInput.description, fileUrl)
        await transaction.wait();
        setLoadingC(false);
        setNotification("Evidence added successfully.")
    }
    return (
        <div className={"container_sub "}>
            <div className={styles.body}>
                <div className={styles.box}>
                    <Header text="Add Evidence" />

                    {
                        !loading ?
                            <div className='flex flex-col'>
                                <div className={styles.inputDiv}>
                                    <p className={styles.label}>CASE ID</p>
                                    <input onChange={e => setFormInput({ ...formInput, case_id: e.target.value })} className={styles.input} />
                                </div>
                                <div className={styles.inputDiv}>
                                    <p className={styles.label}>NAME</p>
                                    <input onChange={e => setFormInput({ ...formInput, name: e.target.value })} className={styles.input} />
                                </div>
                                <div className={styles.inputDiv}>
                                    <p className={styles.label}>DESCRIPTION</p>
                                    <textarea onChange={e => setFormInput({ ...formInput, description: e.target.value })} className={styles.input} />
                                </div>

                                <div className={styles.inputDiv}>
                                    <p className={styles.label}>ADD FILE</p>
                                    <input onChange={onChange} type={'file'} className={styles.input} />
                                </div>
                                <button disabled={fileUrl === null ? true : false} onClick={() => submitEvidence()} className={styles.button}>Add</button>
                            </div>
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
    body: 'flex justify-center items-start h-full w-full text-white',
    box: "w-2/4 p-5 py-20 pt flex flex-col items-center justify-center bg-slate-500 bg-opacity-10 rounded-3xl backdrop-blur-3xl border border-white border-opacity-[0.2]",
    button: "text-black bg-white px-5 py-2 rounded font-bold mt-5",
    logo: "w-36 mb-10",
    inputDiv: 'flex flex-col items-start mb-5',
    input: 'bg-slate-500 bg-opacity-10 rounded backdrop-blur-3xl border border-white border-opacity-[0.2] w-full px-2 py-1',
    label: 'text-opacity-[0.5] text-sm text-left text-slate-100 font-bold'

}
