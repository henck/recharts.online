import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { IRechartsData } from '../Types';
import { Builder } from '../Builder';

interface ICodeProps {
  className?: string;
  rechart: IRechartsData;
}

class CodeBase extends React.Component<ICodeProps, {}> {

  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        <pre>
          {reactElementToJSXString(Builder.build(p.rechart, []), { showDefaultProps: false, filterProps: ['key'] })}
        </pre>        
      </div>
    );
  }
}

const Code = styled(CodeBase)`
`

export { Code };