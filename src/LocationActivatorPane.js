import * as React from 'react';
import LocationService from './LocationService';
import PropTypes from 'prop-types';

class LocationActivatorPane extends React.Component {

  checkUserLocation() {
    LocationService
    .isLocationAllowed()
    .then(() => {
      this.context.router.history.push('/map');
    })
    .catch(this.handleLocationSharingFailure);
  }

  handleLocationSharingFailure() {
    alert('handleLocationSharingFailure');
  }

  render() {
    return (
        <div className="full-height">
          <div className="aligner full-height">
            <div zDepth={5} className="intro-card">
              <h3 className="display-middle">Get started</h3>
              <p>You will be prompted to share your location</p>            
              <button className="around-main-button aligner-item display-middle" primary={true} onClick={this.checkUserLocation.bind(this)}>Get started</button>           
            </div>
          </div>
        </div>
    );
  }
}

LocationActivatorPane.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LocationActivatorPane;
