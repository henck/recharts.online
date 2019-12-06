import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { IPolarGrid } from '../Types';
import { forceRegexes } from '../Util';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { PresentationEditor } from './PresentationEditor';
import { Message } from '@independent-software/typeui/controls/Message';

interface IPolarGridEditorProps {
  className?: string;
  polarGrid: IPolarGrid;
  onUpdate: (polarGrid: IPolarGrid) => void;
}

class PolarGridEditor extends React.Component<IPolarGridEditorProps, IPolarGrid> {

  constructor(props: IPolarGridEditorProps) {
    super(props);
    this.state = {...props.polarGrid};
  }

  onChange = (data: IPolarGrid, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ['strokeWidth', 'cx', 'cy', 'innerRadius', 'outerRadius']); 
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
          <Form.Field
            name="active"
            control={<Checkbox checked={this.state.active} label="Include polar grid"/>}
            value={this.state.active}
          />

          <div style={{display: this.state.active ? 'block' : 'none'}}>
            <PresentationEditor data={this.state}/>
            <Message type="info">
              Polar grid will only show after you create some radars.
            </Message>            
            <Flex>
              <Flex.Row>
                <Flex.Column>
                  <Form.Field
                    label="Center X-coordinate"
                    name="cx"
                    control={<Input placeholder="Center X" type="text" fluid clearable/>}
                    value={this.state.cx}
                    hint="Center x-coordinate (number)"
                  />  
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    label="Center Y-coordinate"
                    name="cy"
                    control={<Input placeholder="Center Y" type="text" fluid clearable/>}
                    value={this.state.cy}
                    hint="Center y-coordinate (number)"
                  />            
                </Flex.Column>
              </Flex.Row>
              <Flex.Row>
                <Flex.Column>
                  <Form.Field
                    label="Inner radius"
                    name="innerRadius"
                    control={<Input placeholder="Inner radius" type="text" fluid clearable/>}
                    value={this.state.innerRadius}
                    hint="Radius of inner polar grid (number)"
                  />            
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    label="Outer radius"
                    name="outerRadius"
                    control={<Input placeholder="Outer radius" type="text" fluid clearable/>}
                    value={this.state.outerRadius}
                    hint="Radius of outer polar grid (number)"
                  />                      
                </Flex.Column>
              </Flex.Row>
            </Flex>
            <Form.Field
              label="Grid type"
              name="gridType"
              control={<Dropdown 
                data={[ 'polygon', 'circle' ]} 
                label={(item:any) => item} 
                placeholder="Grid type" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.gridType}
              hint="Grid type"
            />              
          </div>
        </Form>        
      </div>
    );
  }
}

export { PolarGridEditor };