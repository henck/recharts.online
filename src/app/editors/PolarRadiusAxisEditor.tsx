import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { IPolarRadiusAxis } from '../Types';
import { forceRegexes } from '../Util';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { PresentationEditor } from './PresentationEditor';
import { Message } from '@independent-software/typeui/controls/Message';

interface IPolarRadiusAxisEditorProps {
  className?: string;
  polarRadiusAxis: IPolarRadiusAxis;
  onUpdate: (polarRadiusAxis: IPolarRadiusAxis) => void;
}

class PolarRadiusAxisEditor extends React.Component<IPolarRadiusAxisEditorProps, IPolarRadiusAxis> {

  constructor(props: IPolarRadiusAxisEditorProps) {
    super(props);
    this.state = {...props.polarRadiusAxis};
  }

  onChange = (data: IPolarRadiusAxis, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ['strokeWidth', 'tickCount', 'angle', 'cx', 'cy']); 
    forceRegexes(data, /^\d+|dataMin|dataMax|auto$/, ['domainLow', 'domainHigh']);
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
            control={<Checkbox checked={this.state.active} label="Include polar radius axis"/>}
            value={this.state.active}
          />

          <div style={{display: this.state.active ? 'block' : 'none'}}>
            <PresentationEditor data={this.state}/>
            <Message type="info">
              Polar radius axis will only show after you create some radars.
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
              label="Angle"
              name="angle"
              control={<Input placeholder="Angle" type="text" fluid clearable/>}
              value={this.state.angle}
              hint="Angle of radial direction line to display axis text (0-360)"
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
              label="Domain (Low)"
              name="domainLow"
              control={<Input placeholder="Domain (low)" type="text" fluid clearable/>}
              value={this.state.domainLow}
              hint={<span>Number, <code>auto</code>, <code>dataMin</code>, <code>dataMax</code></span>}
            />  
            <Form.Field
              label="Domain (High)"
              name="domainHigh"
              control={<Input placeholder="Domain (high)" type="text" fluid clearable/>}
              value={this.state.domainHigh}
              hint={<span>Number, <code>auto</code>, <code>dataMin</code>, <code>dataMax</code></span>}
            />                  
            <Form.Field
              name="axisLine"
              control={<Checkbox checked={this.state.axisLine} label="Draw axis line"/>}
              value={this.state.axisLine}
            />            
            <Form.Field
              name="label"
              control={<Checkbox checked={this.state.label} label="Draw labels"/>}
              value={this.state.label}
            />     
            <Form.Field
              name="tick"
              control={<Checkbox checked={this.state.tick} label="Draw ticks"/>}
              value={this.state.tick}
            />                 
            <Form.Field
              label="Text orientation"
              name="orientation"
              control={<Dropdown 
                data={[ 'left', 'middle', 'right' ]} 
                label={(item:any) => item} 
                placeholder="Text orientation" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.orientation}
              hint="Orientation of axis text"
            />     
            <Form.Field
              label="Scale"
              name="scale"
              control={<Dropdown 
                data={[ 'auto', 'linear', 'pow', 'sqrt', 'log', 'identity', 'time', 'band', 'point', 'ordinal', 'quantile', 'quantize', 'utcTime', 'sequential', 'threshold' ]} 
                label={(item:any) => item} 
                placeholder="Scale" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.scale}
              hint="Axis scale"
            />  
            <Form.Field
              label="tickCount"
              name="Tick count"
              control={<Input placeholder="Tick count" type="text" fluid clearable/>}
              value={this.state.tickCount}
              hint="Count of axis ticks (not for category type)"
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

export { PolarRadiusAxisEditor };