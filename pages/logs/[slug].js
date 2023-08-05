import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Web3Modal from "web3modal";
import CasesContract from "../../artifacts/contracts/SmartICases.sol/SmartICases.json"
import { casesContractAddress } from "../../config";
import { Context } from '../../context/Context';
function Details(props) {
    const router = useRouter();
    const query = router.query;
    console.log(query.id);
    const { connectWallet, currentAccount, notification, setNotification, setLoadingC } = useContext(Context);

    const handlePin = async () => {
        setLoadingC(true);
        setNotification("loading");
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        let contract = new ethers.Contract(casesContractAddress, CasesContract.abi, signer);

        await contract.pinCase(query.slug);

        setLoadingC(false);
        setNotification("Pinned a case .");
        console.log("pinned");
    }
    return (
        <div className='flex flex-col items-center'>
            <h1 className='-mb-5 mt-3 text-2xl font-bold  text-white'>Case Details</h1>
            <div className='w-full h-screen px-20 py-10'>
                <div className='text-lg font-medium rounded-xl shadow-xl text-white flex flex-row w-full px-10 shadow-xl drop-shadow-2xl   bg-slate-500 bg-opacity-20 py-10'>
                    <div className='pt-20 mb-10 pl-10  w-1/2 flex flex-col z-30 text-left px-10 relative'>
                        <p className=' font-semibold  absolute top-2 left-2'>Case : {query.slug}</p>
                        <p className='mb-3'>Category: <span className=' ml-3 text-red-500 font-bold'>{query.type}</span></p>
                        <p className='mb-3'>Location: <span className='font-bold ml-3'>{query.location}</span></p>
                        <p className='mb-3'>Date:<span className='font-bold ml-3'>{query.date}</span> </p>
                        <p className='mb-3'>Time: <span className='font-bold ml-3'>{query.time}</span></p>
                        {/* <div className='flex flex-row '>
                            <p>Description:</p>
                            <div className='ml-5 h-5 text-sm text-slate-900 rounded-md bg-slate-200 w-fit px-1   '>
                                Add Description
                            </div>
                        </div> */}
                        <div className='my-5  flex flex-row absolute bottom-0'>
                            <div className='ml-5 text-black rounded-md bg-white font-bold px-3 w-fit py-2 text-sm  '>
                                Download
                            </div>
                            <button onClick={handlePin} className='ml-5 rounded-md text-black text-sm w-fit  bg-white font-bold px-3 py-2 '>
                                Pin
                            </button>


                        </div>

                        <div classname="mapouter mt-4 "><div classname="mt-5 gmap_canvas">


                        </div></div>
                    </div>
                    <div className='w-1/2 ml-10 flex flex-col justify-center text-left'>
                        <iframe src={`https://${query.cid}.ipfs.w3s.link/`} width="100%" height="380" className='bg-transparent mb-10'></iframe>
                        <iframe className=''
                            src={"https://maps.google.com/maps?q=" + query.latitude + "," + query.longitude + "&t=&z=15&ie=UTF8&iwloc=&output=embed"}
                            width="100%"
                            height="100"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;