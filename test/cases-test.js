const { ethers } = require("hardhat")

describe("SmartI Cases", function () {
    it("Should create and execute smartI contract", async function () {

        const SmartICases = await ethers.getContractFactory("SmartICases")
        const smartICases = await SmartICases.deploy()
        await smartICases.deployed()

        await smartICases.addCase(
            "hggjdj",
            "kannur",
            "9pm",
            "hfh",
            "hfh",
            "hfh",
            "16/12/02",
            "accident"
        )
        await smartICases.addCase(
            "hggjdj",
            "kannur",
            "9pm",
            "hfh",
            "hfh",
            "hfh",
            "16/12/02",
            "accident"
        )
        await smartICases.addCase(
            "hggjdj",
            "kannur",
            "9pm",
            "hfh",
            "hfh",
            "hfh",
            "16/12/02",
            "accident"
        )

        items = await smartICases.getAllCases();
        item = await smartICases.getCaseById(3);
        // item_pinned = await smartICases.getPinnedCaseById(3);
        await smartICases.pinCase(1);
        // await smartICases.pinCase(1);
        items_pinned = await smartICases.getPinnedCases("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
        console.log('items: ', items)
        console.log('item: ', item)
        console.log('pinned items: ', items_pinned)
        // console.log('pinned item: ', item_pinned)
    })
})