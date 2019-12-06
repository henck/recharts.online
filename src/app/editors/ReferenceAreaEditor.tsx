import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { IReferenceArea } from '../Types';
import { forceRegexes } from '../Util';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { PresentationEditor } from './PresentationEditor';

interface IReferenceAreaEditorProps {
  className?: string;
  referenceArea: IReferenceArea;
  onUpdate: (referenceArea: IReferenceArea) => void;
}

class ReferenceAreaEditor extends React.Component<IReferenceAreaEditorProps, IReferenceArea> {

  constructor(props: IReferenceAreaEditorProps) {
    super(props);
    this.state = {...props.referenceArea};
  }

  onChange = (data: IReferenceArea, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["strokeWidth"]); 
    forceRegexes(data, /^.+$/, ["x1", "x2", "y1", "y2"]); 
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
                  label="X1"
                  name="x1"
                  control={<Input placeholder="X1" type="text" fluid clearable/>}
                  value={this.state.x1}
                  hint="Number or category name"
                />      
              </Flex.Column>
              <Flex.Column>
                <Form.Field
                  label="X2"
                  name="x2"
                  control={<Input placeholder="X2" type="text" fluid clearable/>}
                  value={this.state.x2}
                  hint="Number or category name"
                />                       
              </Flex.Column>
            </Flex.Row>
          </Flex>
          <Flex>
            <Flex.Row>
              <Flex.Column>
                <Form.Field
                  label="Y1"
                  name="y1"
                  control={<Input placeholder="Y1" type="text" fluid clearable/>}
                  value={this.state.y1}
                  hint="Number or category name"
                />                      
              </Flex.Column>
              <Flex.Column>
                <Form.Field
                  label="Y2"
                  name="y2"
                  control={<Input placeholder="Y2" type="text" fluid clearable/>}
                  value={this.state.y2}
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
            hint="Area label"
          />
          
        </Form>        
      </div>
    );
  }
}

export { ReferenceAreaEditor };