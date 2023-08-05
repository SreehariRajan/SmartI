import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';
import Log from '../components/log';
import EvidenceContract from "../artifacts/contracts/SmartIEvidences.sol/SmartIEvidences.json"
import { Context } from '../context/Context';
import { useRouter } from 'next/router';
import Header from '../components/header';
import { ThreeDots } from 'react-loader-spinner';
import { evidencesContractAddress } from '../config';
import Card from '../components/card';
function Uploads(props) {
    const [evidences, setEvidences] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const { connectWallet, currentAccount } = useContext(Context);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            if (currentAccount) {

                const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL")
                const evidenceContract = new ethers.Contract(evidencesContractAddress, EvidenceContract.abi, provider)
                const data = await evidenceContract.getAllEvidences(currentAccount);
                setEvidences(data);
                setLoading(false);
                console.log(data, "datas")
            } else {
                router.push("/");
            }
        })()
    }, [currentAccount]);


    let filteredEvidences = [];

    filteredEvidences = evidences && evidences.filter((item) => {
        return search !== "" ? item.name.toLowerCase().includes(search.toLowerCase()) : item;
    })

    return (
        <div className={styles.container}>
            <Header text="Uploads" />

            <div className={styles.searchDiv}>
                <input onChange={(e) => setSearch(e.target.value)} className={styles.search} placeholder="Search by date" />
            </div>
            <div className={styles.table}>
                {(evidences.length > 0 && !loading) ?
                    filteredEvidences.map((evidence, index) => {
                        return (
                            <Card key={index} {...evidence} />

                        )
                    })
                    :
                    loading ?
                        <div className='w-full flex justify-center'>

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
                        </div>
                        :
                        <p className='w-full text-center py-10'>No evidence found</p>
                }
            </div>
        </div>
    );
}

export default Uploads;

const styles = {
    container: 'flex flex-col justify-start items-center h-full w-full text-white py-20',
    table: 'rounded-3xl mt-5 w-3/4 flex flex-wrap    py-5  mb-10 overflow-y-auto items-center',
    searchDiv: "w-3/4 flex justify-between",
    search: "w-2/4 px-3 py-2 rounded-3xl bg-transparent shadow-xl px-5 pl-10 drop-shadow-2xl  bg-slate-500 bg-opacity-10"


}