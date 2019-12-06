import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { IRadar, DataFields } from '../Types';
import { forceRegexes } from '../Util';
import { PresentationEditor } from './PresentationEditor';

interface IRadarEditorProps {
  className?: string;
  radar: IRadar;
  onUpdate: (radar: IRadar) => void;
}

class RadarEditor extends React.Component<IRadarEditorProps, IRadar> {

  constructor(props: IRadarEditorProps) {
    super(props);
    this.state = {...props.radar};
  }

  onChange = (data: IRadar, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["strokeWidth"]); 
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
            name="dot"
            control={<Checkbox checked={this.state.dot} label="Draw dots"/>}
            value={this.state.dot}
          />        
        </Form>        
      </div>
    );
  }
}

export { RadarEditor };