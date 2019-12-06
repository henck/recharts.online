import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { IScatter } from '../Types';
import { forceRegexes } from '../Util';
import { PresentationEditor } from './PresentationEditor';

interface IScatterEditorProps {
  className?: string;
  scatter: IScatter;
  onUpdate: (scatter: IScatter) => void;
}

class ScatterEditor extends React.Component<IScatterEditorProps, IScatter> {

  constructor(props: IScatterEditorProps) {
    super(props);
    this.state = {...props.scatter};
  }

  onChange = (data: IScatter, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ['strokeWidth']); 
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
            name="line"
            control={<Checkbox checked={this.state.line} label="Draw line"/>}
            value={this.state.line}
          />
          <Form.Field
            label="Shape"
            name="shape"
            control={<Dropdown 
              data={[ 'circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye' ]} 
              label={(item:any) => item} 
              placeholder="Shape" fluid>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.shape}
            hint={<span>Shape item</span>}
          />   
          <Form.Field
            label="Line type"
            name="lineType"
            control={<Dropdown 
              data={[ 'joint', 'fitting' ]} 
              label={(item:any) => item} 
              placeholder="Line type" fluid>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.lineType}
            hint={<span>Line type</span>}
          />             
          
        </Form>        
      </div>
    );
  }
}

export { ScatterEditor };