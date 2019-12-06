import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { IBar, DataFields } from '../Types';
import { forceRegexes } from '../Util';
import { PresentationEditor } from './PresentationEditor';

interface IBarEditorProps {
  className?: string;
  bar: IBar;
  onUpdate: (bar: IBar) => void;
}

class BarEditor extends React.Component<IBarEditorProps, IBar> {
  constructor(props: IBarEditorProps) {
    super(props);
    this.state = { ...props.bar };
  }

  onChange = (data: IBar, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["strokeWidth", "minPointSize"]); 
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
            label="Legend type"
            name="legendType"
            control={<Dropdown 
              data={[ 'line', 'square', 'rect', 'circle', 'cross', 'diamond', 'star', 'triangle', 'wye', 'none' ]} 
              label={(item:any) => item} 
              placeholder="Legend type" fluid clearable>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.legendType}
            hint={<span>Legend icon type. If <code>none</code>, no legend item is rendered.</span>}
          />              
          <Form.Field
            label="Minimum point size"
            name="minPointSize"
            control={<Input placeholder="Minimum point size" type="text" fluid clearable/>}
            value={this.state.minPointSize}
            hint="Minimal height of a bar in a horizontal BarChart"
          />
          <Form.Field
            name="label"
            control={<Checkbox checked={this.state.label} label="Draw labels"/>}
            value={this.state.label}
          />
          <Form.Field
            name="background"
            control={<Checkbox checked={this.state.background} label="Draw background"/>}
            value={this.state.background}
          />          
          <Form.Field
            label="Name"
            name="name"
            control={<Input placeholder="Name" type="text" fluid clearable/>}
            value={this.state.name}
            hint="Data name used in tooltip"
          />
          <Form.Field
            label="Unit"
            name="unit"
            control={<Input placeholder="Unit" type="text" fluid clearable/>}
            value={this.state.unit}
            hint="Unit used in tooltip"
          />          
        </Form>        
      </div>
    );
  }
}

export { BarEditor };