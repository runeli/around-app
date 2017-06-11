import * as React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RuneliRouter from './RuneliRouter';
import AroundBar from './AroundBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {
  
  render() {
    return (
      <div className="app">
        <MuiThemeProvider>
          <div style={{height:'inherit', overflow: 'hidden'}}>
            <AroundBar />
            <div style={{height: 'inherit'}}>
              {RuneliRouter.singletonRouter()}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

}

export default App;