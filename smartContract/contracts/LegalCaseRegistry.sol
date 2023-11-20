// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LegalCaseRegistry {
    address public admin;

    struct CaseDetails {
        string title;
        address clientId;
        address judgeId;
        address lawyerId;
        string fileIpfsHash;
    }

    mapping(string => bool) private caseTitles;  // To ensure unique case titles
    mapping(string => CaseDetails) public caseInfo;
    string[] public caseTitlesArray;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can call this function");
        _;
    }

    event CaseAdded(string indexed title, bool alreadyExists);

    constructor() {
        admin = msg.sender;
    }

    function addCase(string memory _title, address _clientId, address _judgeId, address _lawyerId, string memory _fileIpfsHash) external onlyAdmin {
        require(!caseTitles[_title], "Case with this title already exists");

        caseTitles[_title] = true;
        caseTitlesArray.push(_title);

        // Additional details for the case
        caseInfo[_title] = CaseDetails(_title, _clientId, _judgeId, _lawyerId, _fileIpfsHash);

        emit CaseAdded(_title, false);
    }

    function getCaseDetails(string memory _title) external view returns (string memory, address, address, address, string memory) {
        require(caseTitles[_title], "Case with this title does not exist");
        CaseDetails memory caseDetails = caseInfo[_title];
        return (caseDetails.title, caseDetails.clientId, caseDetails.judgeId, caseDetails.lawyerId, caseDetails.fileIpfsHash);
    }

    function getCaseTitlesArray() public view onlyAdmin returns(string[] memory) {
        return caseTitlesArray;
    }

    // ... (other functions) ...
}
