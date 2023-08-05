const { ethers } = require("hardhat");

async function main() {
    const CasesContract = await ethers.getContractFactory("SmartICases");
    const casesContract = await CasesContract.deploy()
    await casesContract.deployed()
    console.log("cases Contract deployed to:", casesContract.address);

}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    })