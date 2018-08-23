import React, { Component } from "react";

export interface Props {
  /** The text to be displayed in the title */
  title: string;
}

export class SampleB extends Component<Props> {
  public render() {
    return <h1>{this.props.title}</h1>;
  }
}

export default SampleB;
