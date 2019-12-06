import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Accordion } from '@independent-software/typeui/controls/Accordion';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { Segment } from '@independent-software/typeui/controls/Segment';

interface ICollectionItemProps {
  className?: string;
  children?: any;
  title: string;
  onDelete: () => void;
}

/**
 * A CollectionItem is simply a wrapper that adds a title and a delete button
 * around some content.
 */
class CollectionItemBase extends React.Component<ICollectionItemProps, {}> {

  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        <Segment raised tight attached="top">
          <DeleteButtonContainer>
            <Icon size="small" name="times" color="darkred" cornered inverted onClick={p.onDelete}/>
          </DeleteButtonContainer>
          <h1>{p.title}</h1>
        </Segment>
        <Segment raised tight attached="bottom">
          {p.children}
        </Segment>
      </div>
    );
  }
}

const DeleteButtonContainer = styled('div')`
  position: absolute;
  right: 5px;
  top: 6px;
`

const CollectionItem = styled(CollectionItemBase)`
  h1 {
    font-weight: 500;
  }
`

export { CollectionItem };