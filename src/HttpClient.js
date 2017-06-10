// let request = require('superagent');
import generateAround from './AroundRandomGenerator'

import ApplicationStateStore from './ApplicationStateStore';

class HttpClient {

    getArounds(location) {
        if(ApplicationStateStore.helpers().hasArounds()) {
            return Promise.resolve(ApplicationStateStore.getState().aroundCache.arounds);
        }                        
        const helsinkiLocation = {lng: 24.9410248, lat:60.1733244};
        const arounds = [];
        for(let i = 0; i < 5; i++) {
            arounds.push(generateAround(helsinkiLocation, 1))
        }
        ApplicationStateStore.helpers().addAroundsToCache(arounds);
        return new Promise((resolve, reject) => {
            setTimeout(() => {resolve(arounds)}, 1000);
        });
    }
}

export default new HttpClient();