/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

async function getSessionContent() {
    let url = 'https://devfest-nantes-2018-api.cleverapps.io/sessions';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getPresentateurs() {
    let url = 'https://devfest-nantes-2018-api.cleverapps.io/speakers';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderSessionContent() {
    
    let key = findGetParameter("id");
    console.log(key)

    let sessions = await getSessionContent();
    let session = sessions[key]
    let html = '';
    console.log(session)
    let htmlSegment = `
                        <h1>${session.title} </h1> 
                        `;
    if (typeof session.description !== 'undefined'){
        htmlSegment += `
        <p>${session.description} </p> 
        `;
    }

    if (typeof session.speakers !== 'undefined'){
        let speakers = await getPresentateurs();
        console.log(session.speakers)
        session.speakers.forEach((speakerId) => {
            htmlSegment += `
            <img src="https://devfest2018.gdgnantes.com/${speakers[speakerId].photoUrl}"> </img>
            <a href="speaker.html?id=${speakerId}">
            <p>${speakers[speakerId].name} </p> 
            </a>
            `;
        }

       );
    }

    html += htmlSegment;


    let container = document.querySelector('.container');
    container.innerHTML = html;
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

renderSessionContent();