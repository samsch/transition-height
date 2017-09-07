import React from 'react';

// non-'visible' overflow style to be added to inner wrapper, which stops
// margin collapsing out from children.
const styleOverFlowAuto = {
  overflowY: 'auto',
};

class TransitionHeight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: undefined,
    };
    this.getWrapperDiv = div => {
      this.divEl = div;
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.trigger !== this.props.trigger) {
      this.setState({
        height: this.divEl.offsetHeight,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.height != null && prevProps.trigger !== this.props.trigger) {
      this.setState(
        {
          height: this.divEl.offsetHeight,
        },
        () => {
          setTimeout(() => {
            this.setState({
              height: undefined,
            });
          }, this.props.transitionTimeSeconds * 1000);
        }
      );
    }
  }
  render() {
    const outerWrapperStyle = {
      transition: 'height ' + this.props.transitionTimeSeconds + 's ease',
      height: this.state.height,
      overflowY: this.state.height == null ? 'auto' : 'hidden',
    };
    return (
      <div style={outerWrapperStyle}>
        <div style={styleOverFlowAuto} ref={this.getWrapperDiv}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
TransitionHeight.defaultProps = {
  transitionTimeSeconds: 0.2,
};
export default TransitionHeight;
