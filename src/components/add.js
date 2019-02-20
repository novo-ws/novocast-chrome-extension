import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Add = props => {
  return (
    <Form>
      <FormGroup>
        <Label for="url">Add Video/Live Streaming URL</Label>
        <Input
          type="text"
          name="url"
          id="url"
          placeholder="Paste video URL then Enter"
          onKeyPress={ev => {
            props.add(ev);
          }}
        />
      </FormGroup>
    </Form>
  );
};

export default Add;
