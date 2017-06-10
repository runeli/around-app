function browserCanUseGeolocation() {
    return 'geolocation' in navigator;
}
export default {
    isLocationAllowed: () => {
        return new Promise(function (resolve, reject) {
            if (browserCanUseGeolocation()) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject();
            }
        });
    },

    async getCurrentLocation() {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, {maximumAge:60000, timeout:5000, enableHighAccuracy:true})
        });
    }

}