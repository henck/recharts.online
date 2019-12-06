import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { IYAxis, DataFields } from '../Types';
import { forceRegexes } from '../Util';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { PresentationEditor } from './PresentationEditor';

interface IYAxisEditorProps {
  className?: string;
  yaxis: IYAxis;
  onUpdate: (yaxis: IYAxis) => void;
}

class YAxisEditor extends React.Component<IYAxisEditorProps, IYAxis> {
  constructor(props: IYAxisEditorProps) {
    super(props);
    this.state = {...props.yaxis};
  }

  onChange = (data: IYAxis, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["strokeWidth", "tickCount", "paddingTop", "paddingBottom", "tickSize", "minTickGap"]); 
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
            control={<Checkbox checked={this.state.active} label="Include Y-axis"/>}
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
            <Form.Field
              label="Orientation"
              name="orientation"
              control={<Dropdown 
                data={[ 'left', 'right' ]} 
                label={(item:any) => item} 
                placeholder="Orientation" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.orientation}
              hint="Axis orientation"
            />          
            <Form.Field
              label="Type"
              name="type"
              control={<Dropdown 
                data={[ 'number', 'category' ]} 
                label={(item:any) => item} 
                placeholder="Type" fluid clearable>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.type}
              hint="Axis type"/>
            <Form.Field
              name="allowDecimals"
              control={<Checkbox checked={this.state.allowDecimals} label="Allow decimals"/>}
              value={this.state.allowDecimals}
            />              
            <Form.Field
              name="allowDataOverflow"
              control={<Checkbox checked={this.state.allowDataOverflow} label="Allow data overflow"/>}
              value={this.state.allowDataOverflow}
            />
            <Form.Field
              name="allowDuplicatedCategory"
              control={<Checkbox checked={this.state.allowDuplicatedCategory} label="Allow duplicated category"/>}
              value={this.state.allowDuplicatedCategory}
            />              
            <Flex>
              <Flex.Row>
                <Flex.Column>
                  <Form.Field
                    label="Domain (Low)"
                    name="domainLow"
                    control={<Input placeholder="Domain (low)" type="text" fluid clearable/>}
                    value={this.state.domainLow}
                    hint={<span>Number, <code>auto</code>, <code>dataMin</code>, <code>dataMax</code></span>}
                  />  
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    label="Domain (High)"
                    name="domainHigh"
                    control={<Input placeholder="Domain (high)" type="text" fluid clearable/>}
                    value={this.state.domainHigh}
                    hint={<span>Number, <code>auto</code>, <code>dataMin</code>, <code>dataMax</code></span>}
                  />            
                </Flex.Column>
              </Flex.Row>
            </Flex>
            <Flex>
              <Flex.Row>
                <Flex.Column width={1}>
                  <Form.Field
                    label="Padding top"
                    name="paddingTop"
                    control={<Input placeholder="Top" type="text" fluid clearable/>}
                    value={this.state.paddingTop}
                  />                     
                </Flex.Column>
                <Flex.Column width={1}>
                  <Form.Field
                    label="Bottom"
                    name="paddingBottom"
                    control={<Input placeholder="Bottom" type="text" fluid clearable/>}
                    value={this.state.paddingBottom}
                  />                         
                </Flex.Column>
              </Flex.Row>
            </Flex>
            <Flex>
              <Flex.Row>
                <Flex.Column>
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
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    label="Tick count"
                    name="tickCount"
                    control={<Input placeholder="Tick count" type="text" fluid clearable/>}
                    value={this.state.tickCount}
                    hint="Count of axis ticks"
                  />
                <Form.Field
                    label="Tick size"
                    name="tickSize"
                    control={<Input placeholder="Tick size" type="text" fluid clearable/>}
                    value={this.state.tickSize}
                    hint="Length of tick line"
                  />               
                </Flex.Column>
              </Flex.Row>
            </Flex>
            <Flex>
              <Flex.Row>
                <Flex.Column>
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
                    name="tick"
                    control={<Checkbox checked={this.state.tick} label="Draw ticks"/>}
                    value={this.state.tick}
                  />            
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    name="mirror"
                    control={<Checkbox checked={this.state.mirror} label="Mirror ticks"/>}
                    value={this.state.mirror}
                  />  
                  <Form.Field
                    name="reversed"
                    control={<Checkbox checked={this.state.reversed} label="Reverse ticks"/>}
                    value={this.state.reversed}
                  />            
                </Flex.Column>
              </Flex.Row>
            </Flex>      
            <Form.Field
              label="Label"
              name="label"
              control={<Input placeholder="Label" type="text" fluid clearable/>}
              value={this.state.label}
              hint="Axis label"
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
            <Flex>
              <Flex.Row>
                <Flex.Column>
                  <Form.Field
                    label="Unit"
                    name="unit"
                    control={<Input placeholder="Unit" type="text" fluid clearable/>}
                    value={this.state.unit}
                    hint="Axis unit"
                  />  
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    label="Name"
                    name="name"
                    control={<Input placeholder="Name" type="text" fluid clearable/>}
                    value={this.state.name}
                    hint="Axis name"
                  />  
                </Flex.Column>
              </Flex.Row>
            </Flex>
          </div>
        </Form>        
      </div>
    );
  }
}

export { YAxisEditor };