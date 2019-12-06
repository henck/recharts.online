import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { IReferenceLine } from '../Types';
import { forceRegexes } from '../Util';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { PresentationEditor } from './PresentationEditor';

interface IReferenceLineEditorProps {
  className?: string;
  referenceLine: IReferenceLine;
  onUpdate: (referenceLine: IReferenceLine) => void;
}

class ReferenceLineEditor extends React.Component<IReferenceLineEditorProps, IReferenceLine> {

  constructor(props: IReferenceLineEditorProps) {
    super(props);
    this.state = {...props.referenceLine};
  }

  onChange = (data: IReferenceLine, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["strokeWidth"]); 
    forceRegexes(data, /^.+$/, ["x", "y"]); 
    forceRegexes(data, /^\d+ \d+$/, ["strokeDasharray"]); 
    forceRegexes(data, /^\d*\.?\d+$/, ["strokeOpacity", "fillOpacity"]); 
    this.props.onUpdate(data);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        <Form
          data={this.state}
          onChange={this.onChange}
          onValidate={function(){}}
        >
          <PresentationEditor data={this.state}/>
          <Flex>
            <Flex.Row>
              <Flex.Column>
                <Form.Field
                  label="X"
                  name="x"
                  control={<Input placeholder="X" type="text" fluid clearable/>}
                  value={this.state.x}
                  hint="Number or category name"
                />            
              </Flex.Column>
              <Flex.Column>
                <Form.Field
                  label="Y"
                  name="y"
                  control={<Input placeholder="Y" type="text" fluid clearable/>}
                  value={this.state.y}
                  hint="Number or category name"
                />                      
              </Flex.Column>
            </Flex.Row>
          </Flex>
          <Form.Field
            name="alwaysShow"
            control={<Checkbox checked={this.state.alwaysShow} label="Always show"/>}
            value={this.state.alwaysShow}
          />
          <Form.Field
            name="isFront"
            control={<Checkbox checked={this.state.isFront} label="Is front"/>}
            value={this.state.isFront}
          />        
          <Form.Field
            label="Label"
            name="label"
            control={<Input placeholder="Label" type="text" fluid clearable/>}
            value={this.state.label}
            hint="Line label"
          />
          
        </Form>        
      </div>
    );
  }
}

export { ReferenceLineEditor };