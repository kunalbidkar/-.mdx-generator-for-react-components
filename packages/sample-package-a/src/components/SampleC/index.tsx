import React, { Component } from "react";

export interface Props {
  /** The text */
  text: string;
}

export class SampleC extends Component<Props> {
  public render() {
    return <p>{this.props.text}</p>;
  }
}

export default SampleC;
