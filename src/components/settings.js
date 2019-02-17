import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export const SettingsCog = props => {
  let show = () => {
    props.show();
  };
  return <i className="fa fa-cog" onClick={show} />;
};
export class Settings extends Component {
  state = {
    ip: undefined
  };
  save(evt) {
    this.setState({ ip: evt.target.value });
  }
  render() {
    return (
      <div className="settings">
        {this.props.show && (
          <Form>
            <FormGroup>
              <Label for="ip">IP</Label>
              <Input
                type="text"
                name="ip"
                id="ip"
                placeholder="Roku IP Address"
                value={this.state.ip}
                onChange={this.save.bind(this)}
              />
            </FormGroup>
          </Form>
        )}
      </div>
    );
  }
}
