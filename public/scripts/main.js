'use strict';

const relayList = {
  "flashbots": "https://boost-relay.flashbots.net",
  "bloxrouteMaxProfit": "https://bloxroute.max-profit.blxrbdn.com",
  "bloxrouteEthical": "https://bloxroute.ethical.blxrbdn.com",
  "bloxrouteRegulated": "https://bloxroute.regulated.blxrbdn.com",
  "blocknative": "https://builder-relay-mainnet.blocknative.com",
  "eden": "https://relay.edennetwork.io/"
}
const urlPath = "/relay/v1/data/validator_registration?pubkey=";

const checkButton = document.getElementById("checkButton");

checkButton.onclick = function () {
  let validatorKey = document.getElementById("validatorKey").value;

  if (!validatorKey) return;

  if (validatorKey[0] != "0" && validatorKey[1] != "x") validatorKey = "0x" + validatorKey;
  
  for (const relay in relayList) {
    const checkUrl = relayList[relay] + urlPath + validatorKey;
    
    axios({
      method: 'get',
      url: "/checkRegistry",
      params: {
        checkUrl: checkUrl
      }
    })
      .then(function (response) {
        const row = document.getElementById(relay);
        removeAllChildNodes(row);
        
        if (response.data) {
          const checkBadge = document.createElement('span');
          checkBadge.setAttribute('class', 'badge bg-primary rounded-pill');
          const checkIcon = document.createElement('i');
          checkIcon.setAttribute('class', 'bi bi-check-lg');
          checkBadge.appendChild(checkIcon);
          
          row.appendChild(checkBadge);
        } else {
          const crossBadge = document.createElement('span');
          crossBadge.setAttribute('class', 'badge bg-danger rounded-pill');
          const crossIcon = document.createElement('i');
          crossIcon.setAttribute('class', 'bi bi-x-lg');
          crossBadge.appendChild(crossIcon);
          
          row.appendChild(crossBadge);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}