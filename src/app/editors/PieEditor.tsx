import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { IPie, DataFields } from '../Types';
import { forceRegexes } from '../Util';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { PresentationEditor } from './PresentationEditor';

interface IPieEditorProps {
  className?: string;
  pie: IPie;
  onUpdate: (pie: IPie) => void;
}

class PieEditor extends React.Component<IPieEditorProps, IPie> {

  constructor(props: IPieEditorProps) {
    super(props);
    this.state = {...props.pie};
  }

  onChange = (data: IPie, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["strokeWidth", 'startAngle', 'endAngle', 'minAngle', 'paddingAngle']); 
    forceRegexes(data, /^\d+%?$/, ['cx', 'cy', 'innerRadius', 'outerRadius']);
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
          <Form.Field
            label="Data key"
            name="dataKey"
            control={<Dropdown 
              data={DataFields} 
              label={(item:any) => item} 
              placeholder="Data key" fluid>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.dataKey}
            hint="Data key"
          />    
          <Form.Field
            label="Name key"
            name="nameKey"
            control={<Dropdown 
              data={DataFields} 
              label={(item:any) => item} 
              placeholder="Name key" fluid clearable>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.nameKey}
            hint="Name key"
          />                        
          <Flex>
            <Flex.Row>
              <Flex.Column>
                <Form.Field
                  label="Center X-coord"
                  name="cx"
                  control={<Input placeholder="Center X" type="text" fluid clearable/>}
                  value={this.state.cx}
                  hint={<span>Center x-coordinate: number or <code>50%</code></span>}
                />  
              </Flex.Column>
              <Flex.Column>
                <Form.Field
                  label="Center Y-coord"
                  name="cy"
                  control={<Input placeholder="Center Y" type="text" fluid clearable/>}
                  value={this.state.cy}
                  hint={<span>Center y-coordinate: number or <code>50%</code></span>}
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
                  hint={<span>Inner radius of sectors: number or <code>50%</code></span>}
                />            
              </Flex.Column>
              <Flex.Column>
                <Form.Field
                  label="Outer radius"
                  name="outerRadius"
                  control={<Input placeholder="Outer radius" type="text" fluid clearable/>}
                  value={this.state.outerRadius}
                  hint={<span>Outer radius of sectors: number or <code>50%</code></span>}
                />                      
              </Flex.Column>
            </Flex.Row>
            <Flex.Row>
              <Flex.Column>
                <Form.Field
                  label="Start angle"
                  name="startAngle"
                  control={<Input placeholder="Start angle" type="text" fluid clearable/>}
                  value={this.state.startAngle}
                  hint="Start angle of first sector"
                />             
              </Flex.Column>
              <Flex.Column>
                <Form.Field
                  label="End angle"
                  name="endAngle"
                  control={<Input placeholder="End angle" type="text" fluid clearable/>}
                  value={this.state.endAngle}
                  hint="End angle of last sector"
                />                
              </Flex.Column>
            </Flex.Row>
            <Flex.Row>
              <Flex.Column>
                <Form.Field
                  label="Minimum angle"
                  name="minAngle"
                  control={<Input placeholder="Min. angle" type="text" fluid clearable/>}
                  value={this.state.minAngle}
                  hint="Minimum angle of each non-zero data element"
                />                
              </Flex.Column>
              <Flex.Column>
                <Form.Field
                  label="Padding angle"
                  name="paddingAngle"
                  control={<Input placeholder="Padding" type="text" fluid clearable/>}
                  value={this.state.paddingAngle}
                  hint="Angle between two sectors"
                />                
              </Flex.Column>
            </Flex.Row>
          </Flex>
          <Form.Field
            label="Legend type"
            name="legendType"
            control={<Dropdown 
              data={[ 'line', 'square', 'rect', 'circle', 'cross', 'diamond', 'star', 'triangle', 'wye', 'none' ]} 
              label={(item:any) => item} 
              placeholder="Legend type" fluid>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.legendType}
            hint={<span>Legend icon type. If <code>none</code>, no legend item is rendered.</span>}
          />
          <Form.Field
            name="label"
            control={<Checkbox checked={this.state.label} label="Draw labels"/>}
            value={this.state.label}
          />
          <Form.Field
            name="labelLine"
            control={<Checkbox checked={this.state.labelLine} label="Draw label lines"/>}
            value={this.state.labelLine}
          />        
          
        </Form>        
      </div>
    );
  }
}

export { PieEditor };