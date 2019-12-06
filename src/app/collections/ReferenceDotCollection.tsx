import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';
import { Message } from '@independent-software/typeui/controls/Message';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { IReferenceDot, DefaultReferenceDot } from '../Types';
import { CollectionItem } from './CollectionItem';
import { ReferenceDotEditor } from '../editors/ReferenceDotEditor';

interface IReferenceDotCollectionProps {
  className?: string;
  referenceDots: IReferenceDot[];
  onUpdate: (data: IReferenceDot[]) => void;
}

class ReferenceDotCollection extends React.Component<IReferenceDotCollectionProps, {}> {

  handleUpdate = (index: number, referenceDot: IReferenceDot) => {
    this.props.referenceDots[index] = referenceDot;
    this.props.onUpdate(this.props.referenceDots);
  }

  handleAdd = () => {
    this.props.referenceDots.push(DefaultReferenceDot);
    this.props.onUpdate(this.props.referenceDots);
  }

  handleDelete = (index: number) => {
    this.props.referenceDots.splice(index, 1);
    this.props.onUpdate(this.props.referenceDots);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        {p.referenceDots.map((referenceDot, index) => 
          <CollectionItem key={index} title={"Reference dot #" + (index + 1)} onDelete={() => this.handleDelete(index)}>
            <ReferenceDotEditor referenceDot={referenceDot} onUpdate={(data: IReferenceDot) => this.handleUpdate(index, data)}/>
          </CollectionItem>
        )}
        {p.referenceDots.length == 0 && 
        <Message type="info">
          There aren't any reference dots yet. Use <b>Add reference dot</b> to create a reference dot.
        </Message>}          
        <AddButtonContainer>
          <Button compact size="small" onClick={this.handleAdd}>
            <Icon name="plus"/> Add reference dot
          </Button>
        </AddButtonContainer>
      </div>
    );
  }
}

const AddButtonContainer = styled('div')`
  text-align: right;
`

export { ReferenceDotCollection };
