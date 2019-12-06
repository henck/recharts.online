import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';
import { Message } from '@independent-software/typeui/controls/Message';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { IBar, DefaultBar } from '../Types';
import { CollectionItem } from './CollectionItem';
import { BarEditor } from '../editors/BarEditor';

interface IBarCollectionProps {
  className?: string;
  bars: IBar[];
  onUpdate: (data: IBar[]) => void;
}

class BarCollection extends React.Component<IBarCollectionProps, {}> {

  handleUpdate = (index: number, bar: IBar) => {
    this.props.bars[index] = bar;
    this.props.onUpdate(this.props.bars);
  }

  handleAdd = () => {
    this.props.bars.push(DefaultBar);
    this.props.onUpdate(this.props.bars);
  }

  handleDelete = (index: number) => {
    this.props.bars.splice(index, 1);
    this.props.onUpdate(this.props.bars);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        {p.bars.map((bar, index) => 
          <CollectionItem key={index} title={"Bar #" + (index + 1)} onDelete={() => this.handleDelete(index)}>
            <BarEditor bar={bar} onUpdate={(data: IBar) => this.handleUpdate(index, data)}/>
          </CollectionItem>
        )}
        {p.bars.length == 0 && 
        <Message type="info">
          There aren't any bars yet. Use <b>Add bar</b> to create a bar.
        </Message>}        
        <AddButtonContainer>
          <Button compact size="small" onClick={this.handleAdd}>
            <Icon name="plus"/> Add bar
          </Button>
        </AddButtonContainer>
      </div>
    );
  }
}

const AddButtonContainer = styled('div')`
  text-align: right;
`

export { BarCollection };
