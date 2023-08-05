pragma solidity ^0.8.4;

contract SmartICases {
    string public name;
    mapping(uint256 => Case) public cases;
    mapping(uint256 => PinnedCase) public pinnedCases;
    uint256 public caseCount = 0;
    uint256 public pinnedCaseCount = 0;

    struct Case {
        uint256 id;
        string location;
        string longitude;
        string latitude;
        string cid;
        string fileName;
        string time;
        string date;
        string category;
        bool verified;
    }
    struct PinnedCase {
        uint256 caseId;
        uint256 pinnedCaseId;
        string location;
        string longitude;
        string latitude;
        string cid;
        string fileName;
        string time;
        string date;
        string category;
        bool verified;
        address user;
    }

    constructor() {
        name = "SmartI Evidences";
    }

    event NewCase(Case);

    function addCase(
        string memory _cid,
        string memory _filename,
        string memory _location,
        string memory _longitude,
        string memory _latitude,
        string memory _time,
        string memory _date,
        string memory _category
    ) public {
        require(bytes(_cid).length > 0);
        require(bytes(_filename).length > 0);
        require(bytes(_location).length > 0);
        require(bytes(_longitude).length > 0);
        require(bytes(_latitude).length > 0);
        require(bytes(_time).length > 0);
        require(bytes(_date).length > 0);
        require(bytes(_category).length > 0);

        caseCount++;

        Case storage newCase = cases[caseCount];

        newCase.id = caseCount;
        newCase.location = _location;
        newCase.longitude = _longitude;
        newCase.latitude = _latitude;
        newCase.cid = _cid;
        newCase.fileName = _filename;
        newCase.time = _time;
        newCase.date = _date;
        newCase.category = _category;
        newCase.verified = false;

        emit NewCase(newCase);
    }

    function getCaseById(uint256 _id) external view returns (Case memory) {
        require(_id <= caseCount);
        Case storage item = cases[_id];
        return item;
    }

    function getAllCases() external view returns (Case[] memory) {
        uint currentIndex = 0;
        Case[] memory _cases = new Case[](caseCount);
        for (uint i = 0; i < caseCount; i++) {
            uint currentId = i + 1;
            Case storage currentItem = cases[currentId];
            _cases[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return _cases;
    }

    function pinCase(uint256 _id) public {
        require(_id <= caseCount);
        Case storage _case = cases[_id];
        pinnedCaseCount++;
        PinnedCase storage newCase = pinnedCases[pinnedCaseCount];

        newCase.caseId = _id;
        newCase.pinnedCaseId = pinnedCaseCount;
        newCase.location = _case.location;
        newCase.longitude = _case.longitude;
        newCase.latitude = _case.latitude;
        newCase.cid = _case.cid;
        newCase.fileName = _case.fileName;
        newCase.time = _case.time;
        newCase.date = _case.date;
        newCase.category = _case.category;
        newCase.verified = _case.verified;
        newCase.user = msg.sender;
    }

    function getPinnedCaseById(
        uint256 _id
    ) external view returns (PinnedCase memory) {
        require(_id <= caseCount);
        PinnedCase storage item = pinnedCases[_id];
        return item;
    }

    function getPinnedCases(
        address _user
    ) external view returns (PinnedCase[] memory) {
        uint _caseCount = 0;
        for (uint i = 0; i < pinnedCaseCount; i++) {
            if (pinnedCases[i + 1].user == _user) {
                _caseCount += 1;
            }
        }
        uint currentIndex = 0;

        PinnedCase[] memory _cases = new PinnedCase[](_caseCount);
        for (uint i = 0; i < pinnedCaseCount; i++) {
            if (pinnedCases[i + 1].user == _user) {
                PinnedCase storage currentItem = pinnedCases[i + 1];
                _cases[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return _cases;
    }
}
