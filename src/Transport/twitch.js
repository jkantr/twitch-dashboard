import qs from 'qs';
import pMap from 'p-map';
import chunk from 'lodash.chunk';

export default function createAPI(clientId, accessToken) {
    const URL = 'https://api.twitch.tv/';
    const API = 'helix';

    if (!clientId || !accessToken) {
        throw new Error("Cannot create a new API client without a token and/or client id!");
    }

    let token = accessToken;

    function makeRequest(endpoint, paged = [], cursor) {
        let cursorParam = cursor ? `&after=${cursor}` : '';

        return fetch(`${URL}${API}${endpoint}${cursorParam}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Client-Id': clientId,
            }
        })
        .then(res => res.json())
        .then(json => digestQuery(endpoint, json, paged));
    }

    function digestQuery(endpoint, json, paged = []) {
        let payload = paged.concat(json.data)
        let cursor = json?.pagination?.cursor;

        if (cursor) {
            return makeRequest(endpoint, payload, cursor);
        } else {
            return {
                ...json,
                data: payload,
            }
        }
    }

    function getMe() {
        return makeRequest('/users');
    }

    function getUserFollows(userId) {
        return makeRequest(`/users/follows?from_id=${userId}&first=100`)
    }

    function getFollowedStreams(following, userId) {
        const chunksOfFollowing = chunk(following, 100);
        
        return pMap(
            chunksOfFollowing,
            (hundredFollowers) => {
                let payload = {
                    first: 100,
                    user_id: hundredFollowers.map(f => f.to_id)
                };

                return makeRequest(`/streams?${qs.stringify(payload, { arrayFormat: 'repeat' })}`);
            },
            { concurrency: 6 }
        )
        .then((arrayOfResponses) => arrayOfResponses.map(({ data }) => data).flat());            
    }

    function revokeToken(token, clientId) {
        return fetch(`https://id.twitch.tv/oauth2/revoke?client_id=${clientId}&token=${token}`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            if (res.ok) {
                return;
            } else {
                throw new Error(res.status);
            }
        })
    }

    return {
        getMe,
        getUserFollows,
        getFollowedStreams,
        revokeToken,
    };
};