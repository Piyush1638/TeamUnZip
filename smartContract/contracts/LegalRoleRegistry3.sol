// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LegalRoleRegistry3 {
    address public admin;

    enum Role { Client, Judge, Lawyer }

    struct JudgeDetails {
        string name;
        address judgeAddress;
        string[] caseIds;
        address[] clientIds;
    }

    struct ClientDetails {
        string clientName;
        address clientAddress;
        string caseId;
        address lawyerId;
    }

    struct LawyerDetails {
        string lawyerName;
        address lawyerId;
        string[] caseIds;
        address[] clientIds;
    }

    struct CaseDetails {
        string caseId;
        address clientId;
        address lawyerId;
        string documentLink;
    }

    mapping(string => CaseDetails) public cases;
    mapping(address => Role) public clients;
    mapping(address => Role) public judges;
    mapping(address => Role) public lawyers;

    mapping(address => JudgeDetails) public judgeInfo;
    mapping(address => ClientDetails) public clientInfo;
    mapping(address => LawyerDetails) public lawyerInfo;

    address[] public clientsArray;
    address[] public judgesArray;
    address[] public lawyersArray;
    string[] public casesArray;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can call this function");
        _;
    }

    event CaseAdded(string indexed caseId, address indexed clientId, address indexed lawyerId, string documentLink);
    event ClientAdded(address indexed client, bool alreadyExists, bool inOtherRole);
    event JudgeAdded(address indexed judge, bool alreadyExists, bool inOtherRole);
    event LawyerAdded(address indexed lawyer, bool alreadyExists, bool inOtherRole);

    constructor() {
        admin = msg.sender;
    }

    function addClient(address _client, string memory _clientName, string memory _caseId, address _lawyerId) external onlyAdmin {
        require(!isInArray(_client, judgesArray) && !isInArray(_client, lawyersArray), "Address is already in another role");

        if (isInArray(_client, clientsArray)) {
            emit ClientAdded(_client, true, false); // Client already exists
        } else {
            clients[_client] = Role.Client;
            clientsArray.push(_client);

            // Additional details for the client
            clientInfo[_client] = ClientDetails(_clientName, _client, _caseId, _lawyerId);

            emit ClientAdded(_client, false, false);
        }
    }

    function addCase(string memory _caseId, address _clientId, address _lawyerId, string memory _documentLink) external onlyAdmin {
        require(clients[_clientId] == Role.Client, "Client does not exist");
        require(lawyers[_lawyerId] == Role.Lawyer, "Lawyer does not exist");

        require(bytes(cases[_caseId].caseId).length == 0, "Case already exists");

        // Add case details
        cases[_caseId] = CaseDetails(_caseId, _clientId, _lawyerId, _documentLink);

        // Update additional details for the client and lawyer
        clientInfo[_clientId].caseId = _caseId;
        lawyerInfo[_lawyerId].caseIds.push(_caseId);

        // Add case ID to casesArray
        casesArray.push(_caseId);

        emit CaseAdded(_caseId, _clientId, _lawyerId, _documentLink);
    }

    function addJudge(address _judge, string memory _name) external onlyAdmin {
        require(!isInArray(_judge, clientsArray) && !isInArray(_judge, lawyersArray), "Address is already in another role");

        if (isInArray(_judge, judgesArray)) {
            emit JudgeAdded(_judge, true, false); // Judge already exists
        } else {
            judges[_judge] = Role.Judge;
            judgesArray.push(_judge);

            // Additional details for the judge
            judgeInfo[_judge] = JudgeDetails(_name, _judge, new string[](0), new address[](0));

            emit JudgeAdded(_judge, false, false);
        }
    }

    function addLawyer(address _lawyer, string memory _lawyerName) external onlyAdmin {
        require(!isInArray(_lawyer, clientsArray) && !isInArray(_lawyer, judgesArray), "Address is already in another role");

        if (isInArray(_lawyer, lawyersArray)) {
            emit LawyerAdded(_lawyer, true, false); // Lawyer already exists
        } else {
            lawyers[_lawyer] = Role.Lawyer;
            lawyersArray.push(_lawyer);

            // Additional details for the lawyer
            lawyerInfo[_lawyer] = LawyerDetails(_lawyerName, _lawyer, new string[](0), new address[](0));

            emit LawyerAdded(_lawyer, false, false);
        }
    }

    function getClientDetails(address _client) external view onlyAdmin returns (string memory, address, string memory, address) {
        require(clients[_client] == Role.Client, "Address is not a client");
        ClientDetails memory client = clientInfo[_client];
        return (client.clientName, client.clientAddress, client.caseId, client.lawyerId);
    }

    function getJudgeDetails(address _judge) external view onlyAdmin returns (string memory, address, string[] memory, address[] memory) {
        require(judges[_judge] == Role.Judge, "Address is not a judge");
        JudgeDetails memory judge = judgeInfo[_judge];
        return (judge.name, judge.judgeAddress, judge.caseIds, judge.clientIds);
    }

    function getLawyerDetails(address _lawyer) external view onlyAdmin returns (string memory, address, string[] memory, address[] memory) {
        require(lawyers[_lawyer] == Role.Lawyer, "Address is not a lawyer");
        LawyerDetails memory lawyer = lawyerInfo[_lawyer];
        return (lawyer.lawyerName, lawyer.lawyerId, lawyer.caseIds, lawyer.clientIds);
    }

    function getCaseDetails(string memory _caseId) external view onlyAdmin returns (string memory, address, address, address, string memory) {
        address clientId;
        address lawyerId;
        address judgeId;
        string memory documentLink;

        // Loop through clients to find matching caseId
        for (uint256 i = 0; i < clientsArray.length; i++) {
            if (keccak256(bytes(clientInfo[clientsArray[i]].caseId)) == keccak256(bytes(_caseId))) {
                clientId = clientInfo[clientsArray[i]].clientAddress;
                lawyerId = clientInfo[clientsArray[i]].lawyerId;
                break;
            }
        }

        // Loop through judges to find matching caseId
        for (uint256 i = 0; i < judgesArray.length; i++) {
            for (uint256 j = 0; j < judgeInfo[judgesArray[i]].caseIds.length; j++) {
                if (keccak256(bytes(judgeInfo[judgesArray[i]].caseIds[j])) == keccak256(bytes(_caseId))) {
                    judgeId = judgeInfo[judgesArray[i]].judgeAddress;
                    break;
                }
            }
        }

        // Get the document link from the appropriate source
        // You may have it stored in another mapping or structure

        // Return the details
        return (_caseId, clientId, lawyerId, judgeId, documentLink);
    }

    function getClientArray() public view onlyAdmin returns (address[] memory) {
        return clientsArray;
    }

    function getJudgesArray() public view onlyAdmin returns (address[] memory) {
        return judgesArray;
    }

    function getLawyersArray() public view onlyAdmin returns (address[] memory) {
        return lawyersArray;
    }

    function getCasesArray() public view onlyAdmin returns (string[] memory) {
        return casesArray;
    }

    // ... (other functions) ...

    // Internal function to check if an address is in an array
    function isInArray(address _addr, address[] storage _array) internal view returns (bool) {
        for (uint256 i = 0; i < _array.length; i++) {
            if (_array[i] == _addr) {
                return true;
            }
        }
        return false;
    }

    // Internal function to check if a case ID is in the array
    function isCaseInArray(string memory _caseId) internal view returns (bool) {
        for (uint256 i = 0; i < casesArray.length; i++) {
            if (keccak256(bytes(casesArray[i])) == keccak256(bytes(_caseId))) {
                return true;
            }
        }
        return false;
    }
}
