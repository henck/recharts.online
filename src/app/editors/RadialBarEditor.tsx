import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { IRadialBar, DataFields } from '../Types';
import { forceRegexes } from '../Util';
import { PresentationEditor } from './PresentationEditor';

interface IRadialBarEditorProps {
  className?: string;
  radialBar: IRadialBar;
  onUpdate: (radialBar: IRadialBar) => void;
}

class RadialBarEditor extends React.Component<IRadialBarEditorProps, IRadialBar> {

  constructor(props: IRadialBarEditorProps) {
    super(props);
    this.state = {...props.radialBar};
  }

  onChange = (data: IRadialBar, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ['strokeWidth', 'minAngle']); 
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
            label="Minimum angle"
            name="minAngle"
            control={<Input placeholder="Minimum angle" type="text" fluid clearable/>}
            value={this.state.minAngle}
            hint="Minimum angle of each bar"
          />
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
            control={<Checkbox checked={this.state.label} label="Draw label"/>}
            value={this.state.label}
          />
          <Form.Field
            name="background"
            control={<Checkbox checked={this.state.background} label="Draw background"/>}
            value={this.state.background}
          />
        </Form>        
      </div>
    );
  }
}

export { RadialBarEditor };