import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';
import Log from '../../components/log';
import CasesContract from "../../artifacts/contracts/SmartICases.sol/SmartICases.json"
import { casesContractAddress } from "../../config";
import { Context } from '../../context/Context';
import { useRouter } from 'next/router';
import Header from '../../components/header';
import { ThreeDots } from 'react-loader-spinner';
function Logs(props) {
    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const { connectWallet, currentAccount } = useContext(Context);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            if (currentAccount) {

                const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL")
                // const provider = new ethers.providers.JsonRpcProvider()
                const casesContract = new ethers.Contract(casesContractAddress, CasesContract.abi, provider)

                const data = await casesContract.getAllCases();

                setLogs(data);
                setLoading(false);
                console.log(data, "datas")
            } else {
                router.push("/");
            }
        })()
    }, [currentAccount]);


    let filteredLogs = [];

    filteredLogs = logs && logs.filter((item) => {
        return search !== "" ? item.date.toLowerCase().includes(search.toLowerCase()) : item;
    })

    return (
        <div className={styles.container}>
            <Header text="Logs" />

            <div className={styles.searchDiv}>
                <input onChange={(e) => setSearch(e.target.value)} className={styles.search} placeholder="Search by date" />
            </div>
            <div className={styles.table}>
                <Log header slno={"Sl no."} location={"Location"} time={"Time"} date={"Date"} type={"Type"} verified={"Verified"} />
                {(logs.length > 0 && !loading) ?
                    filteredLogs.map((log, index) => {
                        return (
                            <Log fileName={log.fileName} longitude={log.longitude} latitude={log.latitude} cid={log.cid} key={index} id={log.id} slno={index + 1} location={log.location} time={log.time} date={log.date} type={log.category} verified={log.verified} />

                        )
                    })
                    :
                    loading ?
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
                        :
                        <p className='w-full text-center py-10'>No records found</p>
                }
            </div>
        </div>
    );
}

export default Logs;

const styles = {
    container: 'flex flex-col justify-start items-center h-full w-full text-white py-20',
    table: 'rounded-3xl mt-5 shadow-xl drop-shadow-2xl w-3/4 flex flex-col backdrop-blur-3xl bg-slate-500 bg-opacity-10   py-5  mb-10 overflow-y-auto items-center',
    searchDiv: "w-3/4 flex justify-between",
    search: "w-2/4 px-3 py-2 rounded-3xl bg-transparent shadow-xl px-5 pl-10 drop-shadow-2xl  bg-slate-500 bg-opacity-10"


}