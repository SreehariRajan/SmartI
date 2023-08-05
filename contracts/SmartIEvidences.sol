pragma solidity ^0.8.4;

contract SmartIEvidences {
    mapping(uint256 => Evidence) public evidences;
    uint256 public evidenceCount = 0;

    struct Evidence {
        uint256 id;
        string name;
        string description;
        string fileUrl;
        address user;
    }

    event NewEvidence(Evidence);

    function addEvidence(
        string memory _id,
        string memory _name,
        string memory _description,
        string memory _fileUrl
    ) public {
        require(bytes(_id).length > 0);
        require(bytes(_name).length > 0);
        require(bytes(_description).length > 0);
        require(bytes(_fileUrl).length > 0);

        evidenceCount++;

        Evidence storage newEvidence = evidences[evidenceCount];

        newEvidence.id = evidenceCount;
        newEvidence.name = _name;
        newEvidence.description = _description;
        newEvidence.fileUrl = _fileUrl;
        newEvidence.user = msg.sender;

        emit NewEvidence(newEvidence);
    }

    function getEvidenceById(
        uint256 _id
    ) external view returns (Evidence memory) {
        require(_id < evidenceCount);
        Evidence storage item = evidences[_id];
        return item;
    }

    function getAllEvidences(
        address _user
    ) external view returns (Evidence[] memory) {
        uint _userEvidenceCount = 0;
        for (uint i = 0; i < evidenceCount; i++) {
            if (evidences[i + 1].user == _user) {
                _userEvidenceCount += 1;
            }
        }
        uint currentIndex = 0;

        Evidence[] memory _evidence = new Evidence[](_userEvidenceCount);
        for (uint i = 0; i < evidenceCount; i++) {
            if (evidences[i + 1].user == _user) {
                Evidence storage currentItem = evidences[i + 1];
                _evidence[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return _evidence;
    }
}
