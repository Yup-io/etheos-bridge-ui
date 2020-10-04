var React = require('react');
var ReactDOM = require('react-dom');
var clamp = require('clamper');
var PropTypes = require('prop-types');
/**
 * multuline text-overflow: ellipsis
 */
function Dotdotdot() {
  if(!(this instanceof Dotdotdot)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

Dotdotdot.prototype = Object.create(React.Component.prototype);
Dotdotdot.prototype.componentDidUpdate = function() {
  if (this.props.clamp) {
    this.dotdotdot(ReactDOM.findDOMNode(this.refs.container));
  }
};

Dotdotdot.prototype.dotdotdot = function(container) {
  if (container.length) {
    throw new Error('Please provide exacly one child to dotdotdot');
  }

  clamp(container, {
    clamp: this.props.clamp,
    truncationChar: this.props.truncationChar,
    useNativeClamp: this.props.useNativeClamp
  });
};

Dotdotdot.prototype.render = function() {
  return React.createElement(
    this.props.tagName || "div",
    { ref: "container", className: this.props.className },
    this.props.children
  );
};

// Statics:
Dotdotdot.propTypes = {
  children: PropTypes.node,
  clamp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  truncationChar: PropTypes.string,
  className: PropTypes.string,
  tagName: PropTypes.string,
  useNativeClamp: PropTypes.bool
};

Dotdotdot.defaultProps = {
  truncationChar: '\u2026',
  useNativeClamp: true
};

module.exports = Dotdotdot;
