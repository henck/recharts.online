import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';
import { Message } from '@independent-software/typeui/controls/Message';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { IScatter, DefaultScatter } from '../Types';
import { CollectionItem } from './CollectionItem';
import { ScatterEditor } from '../editors';

interface IScatterCollectionProps {
  className?: string;
  scatters: IScatter[];
  onUpdate: (data: IScatter[]) => void;
}

class ScatterCollection extends React.Component<IScatterCollectionProps, {}> {

  handleUpdate = (index: number, scatter: IScatter) => {
    this.props.scatters[index] = scatter;
    this.props.onUpdate(this.props.scatters);
  }

  handleAdd = () => {
    this.props.scatters.push(DefaultScatter);
    this.props.onUpdate(this.props.scatters);
  }

  handleDelete = (index: number) => {
    this.props.scatters.splice(index, 1);
    this.props.onUpdate(this.props.scatters);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        {p.scatters.map((scatter, index) => 
          <CollectionItem key={index} title={"Scatter #" + (index + 1)} onDelete={() => this.handleDelete(index)}>
            <ScatterEditor scatter={scatter} onUpdate={(data: IScatter) => this.handleUpdate(index, data)}/>
          </CollectionItem>
        )}
        {p.scatters.length == 0 && 
        <Message type="info">
          There aren't any scatters yet. Use <b>Add scatter</b> to create a scatter.
        </Message>}          
        <AddButtonContainer>
          <Button compact size="small" onClick={this.handleAdd}>
            <Icon name="plus"/> Add scatter
          </Button>
        </AddButtonContainer>
      </div>
    );
  }
}

const AddButtonContainer = styled('div')`
  text-align: right;
`

export { ScatterCollection };
