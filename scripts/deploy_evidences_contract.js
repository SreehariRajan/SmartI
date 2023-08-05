const { ethers } = require("hardhat");

async function main() {
    const EvidencesContract = await ethers.getContractFactory("SmartIEvidences");
    const evidencesContract = await EvidencesContract.deploy()
    await evidencesContract.deployed()
    console.log("cases Contract deployed to:", evidencesContract.address);

}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    })