const { ethers } = require("hardhat")

describe("SmartI Evidences", function () {
    it("Should create and execute smartI evidences", async function () {

        const SmartIEvidences = await ethers.getContractFactory("SmartIEvidences")
        const smartIEvidences = await SmartIEvidences.deploy()
        await smartIEvidences.deployed()

        await smartIEvidences.addEvidence(
            "2",
            "name",
            "this is a evidence",
            "hsdfh",
        )


    })
})