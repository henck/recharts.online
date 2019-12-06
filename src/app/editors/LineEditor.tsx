import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { ILine, DataFields } from '../Types';
import { forceRegexes } from '../Util';
import { PresentationEditor } from './PresentationEditor';

interface ILineEditorProps {
  className?: string;
  line: ILine;
  onUpdate: (line: ILine) => void;
}

class LineEditor extends React.Component<ILineEditorProps, ILine> {

  constructor(props: ILineEditorProps) {
    super(props);
    this.state = {...props.line};
  }

  onChange = (data: ILine, forceupdate: boolean) => {
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
            label="Type"
            name="type"
            control={<Dropdown 
              data={[ 'basis', 'basisClosed', 'basisOpen', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']} 
              label={(item:any) => item} 
              placeholder="Type" fluid>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.type}
            hint="Line interpolation type"
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
            name="dot"
            control={<Checkbox checked={this.state.dot} label="Draw dots"/>}
            value={this.state.dot}
          />
          <Form.Field
            name="activeDot"
            control={<Checkbox checked={this.state.activeDot} label="Active dot"/>}
            value={this.state.activeDot}
          />        
          <Form.Field
            name="label"
            control={<Checkbox checked={this.state.label} label="Draw labels"/>}
            value={this.state.label}
          />
          <Form.Field
            name="connectNulls"
            control={<Checkbox checked={this.state.connectNulls} label="Connect graph line across null points"/>}
            value={this.state.connectNulls}
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

export { LineEditor };