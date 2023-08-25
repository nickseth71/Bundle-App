import React from 'react';
import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';

export default function bundle() {
    const runMutation = async () => {
      console.log('Mutation Runing');
    };

  return (
    <div>
        <Button onClick={runMutation}>Run Mutation</Button>
    </div>
  )
}
