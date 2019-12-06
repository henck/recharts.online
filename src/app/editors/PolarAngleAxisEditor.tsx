import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { IPolarAngleAxis, DataFields } from '../Types';
import { forceRegexes } from '../Util';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { PresentationEditor } from './PresentationEditor';
import { Message } from '@independent-software/typeui/controls/Message';

interface IPolarAngleAxisEditorProps {
  className?: string;
  polarAngleAxis: IPolarAngleAxis;
  onUpdate: (polarAngleAxis: IPolarAngleAxis) => void;
}

class PolarAngleAxisEditor extends React.Component<IPolarAngleAxisEditorProps, IPolarAngleAxis> {

  constructor(props: IPolarAngleAxisEditorProps) {
    super(props);
    this.state = {...props.polarAngleAxis};
  }

  onChange = (data: IPolarAngleAxis, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ['strokeWidth', 'cx', 'cy',]); 
    forceRegexes(data, /^\d+%?$/, ['radius']);
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
            control={<Checkbox checked={this.state.active} label="Include polar angle axis"/>}
            value={this.state.active}
          />

          <div style={{display: this.state.active ? 'block' : 'none'}}>
            <PresentationEditor data={this.state}/>
            <Form.Field
              label="Data key"
              name="dataKey"
              control={<Dropdown 
                data={DataFields} 
                label={(item:any) => item} 
                placeholder="Data key" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.dataKey}
              hint="Data key"
            />                 
            <Message type="info">
              Axis line and ticks won't show up unless you set a stroke presentation attribute.
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
            </Flex>
            <Form.Field
              label="Radius"
              name="radius"
              control={<Input placeholder="Radius" type="text" fluid clearable/>}
              value={this.state.radius}
              hint={<span>Outer radius of circle grid: number or <code>50%</code></span>}
            />            
            <Form.Field
              label="Axis line type"
              name="axisLineType"
              control={<Dropdown 
                data={[ 'polygon', 'circle' ]} 
                label={(item:any) => item} 
                placeholder="Axis line type" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.axisLineType}
              hint="Type of axis line"
            />              
            <Form.Field
              name="axisLine"
              control={<Checkbox checked={this.state.axisLine} label="Draw axis line"/>}
              value={this.state.axisLine}
            />            
            <Form.Field
              name="tickLine"
              control={<Checkbox checked={this.state.tickLine} label="Draw tick lines"/>}
              value={this.state.tickLine}
            />              
            <Form.Field
              name="tick"
              control={<Checkbox checked={this.state.tick} label="Draw ticks"/>}
              value={this.state.tick}
            />     
            <Form.Field
              label="Text orientation"
              name="orient"
              control={<Dropdown 
                data={[ 'outer', 'inner' ]} 
                label={(item:any) => item} 
                placeholder="Text orientation" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.orient}
              hint="Orientation of axis text"
            />                               
            <Form.Field
              label="Axis type"
              name="type"
              control={<Dropdown 
                data={[ 'number', 'category' ]} 
                label={(item:any) => item} 
                placeholder="Axis type" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.type}
              hint="Axis type"
            />           
            <Form.Field
              name="allowDuplicatedCategory"
              control={<Checkbox checked={this.state.allowDuplicatedCategory} label="Allow duplicated categories"/>}
              value={this.state.allowDuplicatedCategory}
            />                                                
          </div>
        </Form>        
      </div>
    );
  }
}

export { PolarAngleAxisEditor };