// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GlobalEducationNetwork {
    struct Institution {
        string name;
        address admin;
        bool isActive;
    }

    struct Partnership {
        uint256 id;
        address institution1;
        address institution2;
        string details;
        bool isActive;
    }

    struct Credential {
        uint256 partnershipId;
        string studentName;
        string courseName;
        uint256 issueDate;
        address issuingInstitution;
    }

    uint256 public partnershipCount;
    uint256 public credentialCount;

    mapping(address => Institution) public institutions;
    mapping(uint256 => Partnership) public partnerships;
    mapping(uint256 => Credential) public credentials;

    address public networkAdmin;

    event InstitutionAdded(address indexed institution, string name);
    event PartnershipCreated(uint256 indexed partnershipId, address institution1, address institution2, string details);
    event CredentialIssued(uint256 indexed credentialId, uint256 partnershipId, string studentName, string courseName);

    constructor() {
        networkAdmin = msg.sender;
    }

    modifier onlyNetworkAdmin() {
        require(msg.sender == networkAdmin, "Only the network admin can perform this action");
        _;
    }

    modifier onlyInstitutionAdmin(address _institution) {
        require(msg.sender == institutions[_institution].admin, "Only the institution admin can perform this action");
        _;
    }

    function addInstitution(address _institution, string memory _name) public onlyNetworkAdmin {
        institutions[_institution] = Institution({
            name: _name,
            admin: msg.sender,
            isActive: true
        });

        emit InstitutionAdded(_institution, _name);
    }

    function deactivateInstitution(address _institution) public onlyNetworkAdmin {
        institutions[_institution].isActive = false;
    }

    function createPartnership(address _institution2, string memory _details) public {
        require(institutions[msg.sender].isActive, "Your institution is not active");
        require(institutions[_institution2].isActive, "Partner institution is not active");

        partnershipCount++;
        partnerships[partnershipCount] = Partnership({
            id: partnershipCount,
            institution1: msg.sender,
            institution2: _institution2,
            details: _details,
            isActive: true
        });

        emit PartnershipCreated(partnershipCount, msg.sender, _institution2, _details);
    }

    function deactivatePartnership(uint256 _partnershipId) public {
        Partnership storage partnership = partnerships[_partnershipId];
        require(
            msg.sender == partnership.institution1 || msg.sender == partnership.institution2,
            "Only involved institutions can deactivate this partnership"
        );

        partnership.isActive = false;
    }

    function issueCredential(
        uint256 _partnershipId,
        string memory _studentName,
        string memory _courseName
    ) public {
        Partnership storage partnership = partnerships[_partnershipId];
        require(partnership.isActive, "Partnership is not active");
        require(
            msg.sender == partnership.institution1 || msg.sender == partnership.institution2,
            "Only partner institutions can issue credentials"
        );

        credentialCount++;
        credentials[credentialCount] = Credential({
            partnershipId: _partnershipId,
            studentName: _studentName,
            courseName: _courseName,
            issueDate: block.timestamp,
            issuingInstitution: msg.sender
        });

        emit CredentialIssued(credentialCount, _partnershipId, _studentName, _courseName);
    }
}
