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

checkButton.onclick = async function () {
  let validatorKey = document.getElementById("validatorKey").value;

  if (!validatorKey) return;

  removeAllChildNodes(checkButton);
  checkButton.setAttribute('disabled', '');
  const loadingSpinner = document.createElement('span');
  loadingSpinner.setAttribute('class', 'spinner-border spinner-border-sm mx-1');
  loadingSpinner.setAttribute('role', 'status');
  loadingSpinner.setAttribute('aria-hidden', 'true');
  checkButton.appendChild(loadingSpinner);
  checkButton.appendChild(document.createTextNode('Loading...'));

  removeAllResults();

  if (validatorKey[0] != "0" && validatorKey[1] != "x") validatorKey = "0x" + validatorKey;
  
  for (const relay in relayList) {
    const checkUrl = relayList[relay] + urlPath + validatorKey;
    
    await axios({
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

  removeAllChildNodes(checkButton);
  checkButton.appendChild(document.createTextNode('Check!'));
  checkButton.removeAttribute('disabled');
}

// -------------------------------------------------

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function removeAllResults() {
  for (const relay in relayList) {
    const row = document.getElementById(relay);
    removeAllChildNodes(row);
  }
}