import React, { Component } from 'react';
import Header from './components/Header';
import { Settings } from './components/settings';
import { Container, Row, Col } from 'reactstrap';
import TableClass from './components/table';

class App extends Component {
  state = {
    showCasting: false,
    showSettings: false,
    ip: localStorage.getItem('ip') || ''
  };
  showCasting() {
    this.setState({ showCasting: !this.state.showCasting });
  }
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
          <Row>
            <Col>
              <Header
                show={this.showSettings.bind(this)}
                casting={this.state.showCasting}
              />
              <Settings
                show={this.state.showSettings}
                setIP={this.setIP.bind(this)}
                ip={this.state.ip}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TableClass
                ip={this.state.ip}
                showCasting={this.showCasting.bind(this)}
                casting={this.state.showCasting}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
