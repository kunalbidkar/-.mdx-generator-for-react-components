import React, { Component } from "react";

export interface Props {
  /** The text to be displayed in the subtitle */
  subtitle: string;
}

export class SampleD extends Component<Props> {
  public render() {
    return <h2>{this.props.subtitle}</h2>;
  }
}

export default SampleD;
