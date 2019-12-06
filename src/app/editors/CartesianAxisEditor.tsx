import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { ICartesianAxis } from '../Types';
import { forceRegexes } from '../Util';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { PresentationEditor } from './PresentationEditor';

interface ICartesianAxisEditorProps {
  className?: string;
  cartesianAxis: ICartesianAxis;
  onUpdate: (cartesianAxis: ICartesianAxis) => void;
}

class CartesianAxisEditor extends React.Component<ICartesianAxisEditorProps, ICartesianAxis> {
  constructor(props: ICartesianAxisEditorProps) {
    super(props);
    this.state = {...props.cartesianAxis};
  }

  onChange = (data: ICartesianAxis, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["strokeWidth", "tickMargin", "tickSize", "minTickGap", "x", "y", "width", "height"]); 
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
            control={<Checkbox checked={this.state.active} label="Include cartesian axis"/>}
            value={this.state.active}
          />

          <div style={{display: this.state.active ? 'block' : 'none'}}>
            <PresentationEditor data={this.state}/>
            <Flex>
              <Flex.Row>
                <Flex.Column>
                  <Form.Field
                    label="X-coordinate"
                    name="x"
                    control={<Input placeholder="X" type="text" fluid clearable/>}
                    value={this.state.x}
                    hint="Axis x-coordinate (pixels)"
                  />
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    label="Y-coordinate"
                    name="y"
                    control={<Input placeholder="Y" type="text" fluid clearable/>}
                    value={this.state.y}
                    hint="Axis y-coordinate (pixels)"
                  />  
                </Flex.Column>
              </Flex.Row>
            </Flex>
            <Flex>
              <Flex.Row>
                <Flex.Column>
                  <Form.Field
                    label="Width"
                    name="width"
                    control={<Input placeholder="Width" type="text" fluid clearable/>}
                    value={this.state.width}
                    hint="Axis width in pixels"
                  />
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    label="Height"
                    name="height"
                    control={<Input placeholder="Height" type="text" fluid clearable/>}
                    value={this.state.height}
                    hint="Axis height in pixels"
                  />  
                </Flex.Column>
              </Flex.Row>
            </Flex>

            <Form.Field
              label="Orientation"
              name="orientation"
              control={<Dropdown 
                data={[ 'left', 'right', 'top', 'bottom' ]} 
                label={(item:any) => item} 
                placeholder="Orientation" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.orientation}
              hint="Axis orientation"
            />          
            <Form.Field
              label="Interval"
              name="interval"
              control={<Dropdown 
                data={[ 'preserveStart', 'preserveEnd', 'preserveStartEnd' ]} 
                label={(item:any) => item} 
                placeholder="Interval" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.interval}
              hint="Tick interval"
            />  
            <Form.Field
              label="Minimum tick gap"
              name="minTickGap"
              control={<Input placeholder="Min tick gap" type="text" fluid clearable/>}
              value={this.state.minTickGap}
              hint="Minimum gap between two adjacent labels"
            />
            <Form.Field
              name="axisLine"
              control={<Checkbox checked={this.state.axisLine} label="Draw axis line"/>}
              value={this.state.axisLine}
            />  
            <Form.Field
              name="tickLine"
              control={<Checkbox checked={this.state.tickLine} label="Draw tick line"/>}
              value={this.state.tickLine}
            />  
            <Form.Field
              label="Tick size"
              name="tickSize"
              control={<Input placeholder="Tick size" type="text" fluid clearable/>}
              value={this.state.tickSize}
              hint="Length of tick line"
            />         
            <Form.Field
              label="Tick margin"
              name="tickMargin"
              control={<Input placeholder="Tick margin" type="text" fluid clearable/>}
              value={this.state.tickMargin}
              hint="Margin between tick line and tick"
            />              
            <Form.Field
              name="tick"
              control={<Checkbox checked={this.state.tick} label="Draw ticks"/>}
              value={this.state.tick}
            />            
            <Form.Field
              name="mirror"
              control={<Checkbox checked={this.state.mirror} label="Mirror ticks"/>}
              value={this.state.mirror}
            />  
            <Form.Field
              label="Label"
              name="label"
              control={<Input placeholder="Label" type="text" fluid clearable/>}
              value={this.state.label}
              hint="Axis label"
            />  
          </div>
        </Form>        
      </div>
    );
  }
}

export { CartesianAxisEditor };