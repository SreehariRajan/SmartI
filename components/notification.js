import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import CasesContract from "../artifacts/contracts/SmartICases.sol/SmartICases.json"
import { casesContractAddress } from "../config";
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { ThreeDots } from 'react-loader-spinner';
function Notification(props) {

    const [caseAdded, setCaseAdded] = useState(false);
    const { currentAccount,
        connectWallet,
        notification,
        setNotification,
        addedCaseDetails,
        loadingC,
        setLoadingC } = useContext(Context);
    const router = useRouter();



    console.log(loadingC)
    const handleSelect = async () => {
        if (notification == "new-case") {
            let id = await addedCaseDetails.id.toNumber();
            setNotification("");
            router.push({ pathname: `/logs/${id}`, query: { fileName: addedCaseDetails.fileName, longitude: addedCaseDetails.longitude, latitude: addedCaseDetails.latitude, cid: addedCaseDetails.cid, id: id, location: addedCaseDetails.location, time: addedCaseDetails.time, date: addedCaseDetails.date, type: addedCaseDetails.category, verified: addedCaseDetails.verified } })
        }
        setNotification("");


    }
    if (notification.length === 0)
        return;
    return (
        <button onClick={handleSelect} className='absolute bottom-10 right-10 bg-white rounded px-10 min-w-[400px] py-4 hover:bg-gray-100 group'>
            {
                !loadingC && <p className='top-2 w-full text-right font-bold'>X</p>
            }
            {notification === "new-case" && notification !== "loading" && <p className='w-full text-left underline text-orange-500 font-bold mb-5'>Alert !</p>}
            {notification !== "loading" && <p className='font-bold w-full text-left mb-5'>{notification === "new-case" ? "New case reported ." : notification}</p>}
            {notification === "new-case" && notification !== "loading" && <p className='w-full text-left underline group-hover:text-blue-500'>click to view</p>}
            {loadingC &&
                <p className='text-center w-full flex justify-center'>

                    <ThreeDots
                        height="30"
                        width="80"
                        radius="9"
                        color="black"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </p>
            }
        </button>
    );
}

export default Notification;