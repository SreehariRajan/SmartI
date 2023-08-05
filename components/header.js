import React from 'react';

function Header(props) {
    return (
        <p className={styles.header}>{props.text}</p>
    );
}

export default Header;

const styles = {
    header: "font-bold text-2xl mb-20"
}