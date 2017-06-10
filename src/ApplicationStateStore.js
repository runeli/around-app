import _ from 'lodash';

const defaultState = {
    aroundCache: {
        lng: 24.9410248,
        lat: 60.1733244,
        date: new Date(),
        arounds: []
    }
};

class ApplicationStateStore {

    constructor() {
        this._state = defaultState;
    }

    getState() {
        return this._state;
    }

    setState(state) {
        return this._state = state;
    }

    mergeState(state) {
        let newState = _.cloneDeep(this._state);
        _.assign(newState, state);
        this._state = newState;
        return this._state;
    }

    helpers() {
        return {
            hasArounds: () => {
                return this._state.aroundCache.arounds.length > 0
            },
            addAroundsToCache: (aroundsList) => {
                let newState = {
                    aroundCache: {
                        date: new Date(),
                        arounds: aroundsList
                    }
                };
                this.mergeState(newState);
            },
            appendSingleAround: aroundToAppend => {
                const newArounds = this._state.aroundCache.arounds.slice(0);
                newArounds.push(aroundToAppend);
                this.helpers().addAroundsToCache(newArounds);
            }
        }
    }
}

export default new ApplicationStateStore();