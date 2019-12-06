import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';
import { Message } from '@independent-software/typeui/controls/Message';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { IRadialBar, DefaultRadialBar } from '../Types';
import { CollectionItem } from './CollectionItem';
import { RadialBarEditor } from '../editors';

interface IRadialBarCollectionProps {
  className?: string;
  radialBars: IRadialBar[];
  onUpdate: (data: IRadialBar[]) => void;
}

class RadialBarCollection extends React.Component<IRadialBarCollectionProps, {}> {

  handleUpdate = (index: number, radialBar: IRadialBar) => {
    this.props.radialBars[index] = radialBar;
    this.props.onUpdate(this.props.radialBars);
  }

  handleAdd = () => {
    this.props.radialBars.push(DefaultRadialBar);
    this.props.onUpdate(this.props.radialBars);
  }

  handleDelete = (index: number) => {
    this.props.radialBars.splice(index, 1);
    this.props.onUpdate(this.props.radialBars);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        {p.radialBars.map((radialBar, index) => 
          <CollectionItem key={index} title={"Radial bar #" + (index + 1)} onDelete={() => this.handleDelete(index)}>
            <RadialBarEditor radialBar={radialBar} onUpdate={(data: IRadialBar) => this.handleUpdate(index, data)}/>
          </CollectionItem>
        )}
        {p.radialBars.length == 0 && 
        <Message type="info">
          There aren't any radial bars yet. Use <b>Add radial bar</b> to create a radial bar.
        </Message>}          
        <AddButtonContainer>
          <Button compact size="small" onClick={this.handleAdd}>
            <Icon name="plus"/> Add radial bar
          </Button>
        </AddButtonContainer>
      </div>
    );
  }
}

const AddButtonContainer = styled('div')`
  text-align: right;
`

export { RadialBarCollection };
