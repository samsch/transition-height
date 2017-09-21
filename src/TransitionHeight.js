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
      height: this.props.collapsed ? '0px' : undefined,
    };
    this.getWrapperDiv = div => {
      this.divEl = div;
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.trigger !== this.props.trigger ||
      nextProps.collapsed !== this.props.collapsed
    ) {
      this.setState({
        height: this.props.collapsed ? '0px' : this.divEl.offsetHeight + 'px',
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      (this.state.height != null && prevProps.trigger !== this.props.trigger) ||
      prevProps.collapsed !== this.props.collapsed
    ) {
      setTimeout(() => {
        this.setState(
          {
            height: this.props.collapsed
              ? '0px'
              : this.divEl.offsetHeight + 'px',
          },
          () => {
            setTimeout(() => {
              this.setState({
                height: this.props.collapsed ? '0px' : undefined,
              });
            }, this.props.transitionTimeSeconds * 1000);
          }
        );
      }, 20);
    }
  }
  render() {
    const outerWrapperStyle = {
      transition: 'height ' + this.props.transitionTimeSeconds + 's ease',
      height: this.state.height,
      overflowY:
        !this.props.collapsed && this.state.height == null ? 'auto' : 'hidden',
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
