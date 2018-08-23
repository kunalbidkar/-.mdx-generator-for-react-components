import React, { Component } from "react";

export interface Props {
  /** The text to display in the button */
  text?: string;

  /** The click handler */
  onClick: () => void;
}

export class SampleA extends Component<Props> {
  public static defaultProps: Partial<Props> = {
    text: "Click Here"
  };

  public render() {
    return (
      <button type="button" onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}

export default SampleA;
