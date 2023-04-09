import { Component, Fragment } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    console.log({ getDerivedStateFromError: error });
    return;
  }

  render() {
    if (this.state.hasError) {
      return <h1>500 - Server Error</h1>;
    }

    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default ErrorBoundary;
