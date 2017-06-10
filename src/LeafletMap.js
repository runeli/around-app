import React from 'react';
import LocationService from './LocationService';
import PostActionButton from './PostActionButton';
import HttpClient from './HttpClient';
const VIEWPORT_INFORMATION_ID = 'viewPortId';
const MAP_COMPONENT_ID = 'mapContainerId';

class LeafletMap extends React.Component {
    componentDidMount() {
        this._injectViewPortInformation();
        this._injectMap();
    }

    componentWillUnmount() {
        this._uninjectViewPortInformation();
    }

    _injectViewPortInformation() {
        let metaElement = document.createElement('meta');
        metaElement.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        metaElement.name = "viewport";
        metaElement.id = VIEWPORT_INFORMATION_ID;
        document.head.appendChild(metaElement);
    }

    _injectMap() {
        const google = window.google;

        LocationService.getCurrentLocation().then(coords => {            
            let center = {lat: coords.coords.latitude, lng: coords.coords.longitude}
            let map = new google.maps.Map(document.getElementById(MAP_COMPONENT_ID), {
                zoom: 15,
                center
            });
            HttpClient.getArounds().then(arounds => {
                arounds.forEach(around => {
                    console.log({lng: around.location.lng, lat:around.location.lat});
                    new google.maps.Marker({
                        position: {lng: around.location.lng, lat:around.location.lat},
                        map: map,
                        title: around.messageBody
                    });
                });
            });
        });
        

    }

    _uninjectViewPortInformation() {
        document.head.removeChild(document.getElementById(VIEWPORT_INFORMATION_ID));
    }

    _uninjectMap() {

    }

    render() {
        return (
            <div>
                <div id={MAP_COMPONENT_ID} />
                <PostActionButton />                
            </div>
        );
    }
}

export default LeafletMap;