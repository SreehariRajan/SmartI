import Image from 'next/image';
import React from 'react';

function Card(props) {
    console.log(props)
    return (
        <a rel="noreferrer" href={props.fileUrl} target="_blank">

            <div className={styles.container}>
                <img alt="" src={props.fileUrl} className="w-full" />
                <p className={'text-gray-300 p-2'}>#{props.id.toNumber()}</p>
                <p className={styles.header}>{props.name}</p>
                <p className={styles.item}>{props.description}</p>
            </div>
        </a>
    );
}

export default Card;

const styles = {
    container: "w-64 border border-white border-opacity-[0.1] backdrop-blur-3xl bg-slate-500 bg-opacity-10 rounded m-2 shadow-xl drop-shadow-2xl",
    header: "font-bold py-2 hover:text-white hover:bg-transparent px-2 text-left",
    item: "text-left justify-center pb-5 px-2"
}