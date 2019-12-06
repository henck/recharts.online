import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { ICartesianGrid } from '../Types';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { forceRegexes } from '../Util';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { PresentationEditor } from './PresentationEditor';

interface ICartesianGridEditorProps {
  className?: string;
  cartesianGrid: ICartesianGrid;
  onUpdate: (cartesianGrid: ICartesianGrid) => void;
}

class CartesianGridEditor extends React.Component<ICartesianGridEditorProps, ICartesianGrid> {

  constructor(props: ICartesianGridEditorProps) {
    super(props);
    this.state = {...props.cartesianGrid};
  }

  onChange = (data: ICartesianGrid, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["strokeWidth", "x", "y", "width", "height"]); 
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
            control={<Checkbox checked={this.state.active} label="Include cartesian grid"/>}
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
                  hint="Grid x-coordinate (pixels)"
                />
              </Flex.Column>
              <Flex.Column>
                <Form.Field
                  label="Y-coordinate"
                  name="y"
                  control={<Input placeholder="Y" type="text" fluid clearable/>}
                  value={this.state.y}
                  hint="Grid y-coordinate (pixels)"
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
                  hint="Grid width in pixels"
                />
              </Flex.Column>
              <Flex.Column>
                <Form.Field
                  label="Height"
                  name="height"
                  control={<Input placeholder="Height" type="text" fluid clearable/>}
                  value={this.state.height}
                  hint="Grid height in pixels"
                />  
              </Flex.Column>
            </Flex.Row>
          </Flex>
          <Form.Field
            name="horizontal"
            control={<Checkbox checked={this.state.horizontal} label="Draw horizontal grid lines"/>}
            value={this.state.horizontal}
          />          
          <Form.Field
            name="vertical"
            control={<Checkbox checked={this.state.vertical} label="Draw vertical grid lines"/>}
            value={this.state.vertical}
          />   
          </div>  
        </Form>        
      </div>
    );
  }
}

export { CartesianGridEditor };