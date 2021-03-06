/* ---------------------- COPY RIGHT 2019: NOVO WORK SYSTEMS --------------------- */
/* -------------------------- Use @ your own risk. -------------------------- */
import React, { Component } from 'react';
import Header from './components/Header';
import { Settings } from './components/settings';
import { Container, Row, Col } from 'reactstrap';
import TableClass from './components/table';
import By from './components/By';

class App extends Component {
  state = {
    showAdd: false,
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
  add() {
    // Adding urls to cast
    this.setState({ showAdd: !this.state.showAdd });
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
                add={this.add.bind(this)}
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
                add={this.state.showAdd}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <By />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
