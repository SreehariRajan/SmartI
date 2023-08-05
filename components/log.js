import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cross from "../assets/images/cross.png";
import React from 'react';

function Log(props) {
    const router = useRouter();
    const handleSelect = () => {
        router.push({ pathname: `/logs/${props.id}`, query: { ...props } })
    }
    return (
        <button disabled={props.id ? false : true} onClick={() => handleSelect(props.id)} className={`${styles.container} ${props.header && styles.header}`}>
            <div className={`${styles.item} w-[5%]`}>
                <p> {props.slno}</p>
            </div>
            <div className={`${styles.item} w-[22%]`}>
                <p> {props.location}</p>
            </div>
            <div className={`${styles.item} w-[10%]`}>
                <p> {props.time}</p>
            </div>
            <div className={`${styles.item} w-[10%]`}>
                <p> {props.date}</p>
            </div>
            <div className={`${styles.item} w-[15%] text-red-500`}>
                <p> {props.type}</p>
            </div>
            <div className={`${styles.item} w-[15%]`}>
                {props.verified ? "verified" : <Image alt='not verified' className='w-6 h-7' src={cross} />}
            </div>
        </button>
    );
}

export default Log;

const styles = {
    container: "w-full flex flex-row item-center justify-between  py-2 px-3 hover:text-black hover:bg-white hover:bg-opacity-[0.9] border-b border-white border-opacity-[0.1]",
    header: "font-bold py-4 hover:text-white hover:bg-transparent",
    item: "text-center flex items-center overflow-hidden justify-center "
}