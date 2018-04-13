pragma solidity ^0.4.18;

contract Inbox {

    string public message;

    function Inbox(string newMessage) public {
        message = newMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }


}
