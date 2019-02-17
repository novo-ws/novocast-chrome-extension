import React, { Component } from 'react';
import Header from './components/Header';
import { Settings } from './components/settings';
import { Container } from 'reactstrap';
import TableClass from './components/table';

class App extends Component {
  state = {
    showSettings: false,
    ip: localStorage.getItem('ip') || ''
  };
  showSettings() {
    this.setState({ showSettings: !this.state.showSettings });
  }
  setIP(ip) {
    this.setState({ ip });
    localStorage.setItem('ip', ip);
  }
  render() {
    return (
      <div className="App">
        <Container>
          <Header show={this.showSettings.bind(this)} />
          <Settings
            show={this.state.showSettings}
            setIP={this.setIP.bind(this)}
            ip={this.state.ip}
          />
          <TableClass ip={this.state.ip} />
        </Container>
      </div>
    );
  }
}

export default App;
