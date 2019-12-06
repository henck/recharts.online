import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';
import { Message } from '@independent-software/typeui/controls/Message';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { IPie, DefaultPie } from '../Types';
import { CollectionItem } from './CollectionItem';
import { PieEditor } from '../editors';

interface IPieCollectionProps {
  className?: string;
  pies: IPie[];
  onUpdate: (data: IPie[]) => void;
}

class PieCollection extends React.Component<IPieCollectionProps, {}> {

  handleUpdate = (index: number, pie: IPie) => {
    this.props.pies[index] = pie;
    this.props.onUpdate(this.props.pies);
  }

  handleAdd = () => {
    this.props.pies.push(DefaultPie);
    this.props.onUpdate(this.props.pies);
  }

  handleDelete = (index: number) => {
    this.props.pies.splice(index, 1);
    this.props.onUpdate(this.props.pies);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        {p.pies.map((pie, index) => 
          <CollectionItem key={index} title={"Pie #" + (index + 1)} onDelete={() => this.handleDelete(index)}>
            <PieEditor pie={pie} onUpdate={(data: IPie) => this.handleUpdate(index, data)}/>
          </CollectionItem>
        )}
        {p.pies.length == 0 && 
        <Message type="info">
          There aren't any pies yet. Use <b>Add pie</b> to create a pie.
        </Message>}          
        <AddButtonContainer>
          <Button compact size="small" onClick={this.handleAdd}>
            <Icon name="plus"/> Add pie
          </Button>
        </AddButtonContainer>
      </div>
    );
  }
}

const AddButtonContainer = styled('div')`
  text-align: right;
`

export { PieCollection };
