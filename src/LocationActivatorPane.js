import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper'
import LocationService from './LocationService';
import RuneliRouter from './RuneliRouter';

class LocationActivatorPane extends React.Component {

  checkUserLocation() {
    LocationService
    .isLocationAllowed()
    .then(() => {
      RuneliRouter.setRoute('/map');
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
            <Paper zDepth={5} className="intro-card">
              <h3 className="display-middle">Get started</h3>
              <p>You will be prompted to share your location</p>            
              <RaisedButton className="aligner-item display-middle" label="Get started" primary={true} onClick={this.checkUserLocation}/>           
            </Paper>
          </div>
        </div>
    );
  }
}

export default LocationActivatorPane;
