import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export const SettingsCog = props => {
  let show = () => {
    props.show();
  };
  return <i className="fa fa-cog" onClick={show} />;
};
export class Settings extends Component {
  save(evt) {
    this.props.setIP(evt.target.value);
  }
  render() {
    return (
      <div className="settings">
        {this.props.show && (
          <Form>
            <FormGroup>
              <Label for="ip">IP Address</Label>
              <Input
                type="text"
                name="ip"
                id="ip"
                placeholder="Your Roku IP Address"
                value={this.props.ip}
                onChange={this.save.bind(this)}
              />
            </FormGroup>
          </Form>
        )}
      </div>
    );
  }
}
