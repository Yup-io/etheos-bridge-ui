import React from 'react';
import PropTypes from 'prop-types';

export default class NumberCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countedValue: props.start,
    };
    this.countUp = this.countUp.bind(this);
    this.countDown = this.countDown.bind(this);
    this.calculateSomeDelayPointForCountDown = this.calculateSomeDelayPointForCountDown.bind(this);
    this.calculateSomeDelayPointForCountUp = this.calculateSomeDelayPointForCountUp.bind(this);
  }

  componentDidMount() {
    const {
      start, end, delay, reverse,
    } = this.props;
    if (reverse === !true) {
      this.calculateSomeDelayPointForCountUp(start, end, delay);
    }
    else {
      this.calculateSomeDelayPointForCountDown(start, end, delay);
    }
  }

  calculateSomeDelayPointForCountUp(start, end, delay) {
    const newDelay = (delay * 1000) / end;
    const delayPercentage = (newDelay * 70) / 100;
    const addSomeToDelayToExisting = Math.round(newDelay - delayPercentage);
    const newStartPoint = (end * 95) / 100;
    this.countUp(start, end, Math.round(newDelay), Math.floor(newStartPoint), addSomeToDelayToExisting);
  }

  calculateSomeDelayPointForCountDown(start, end, delay) {
    const newDelay = (delay * 1000) / start;
    const delayPercentage = (newDelay * 70) / 100;
    const addSomeToDelayToExisting = Math.round(newDelay - delayPercentage);
    const newStartPoint = (start * 5) / 100;
    this.countDown(start, end, Math.round(newDelay), Math.floor(newStartPoint), addSomeToDelayToExisting);
  }

  countUp(start, end, delay, newStartPoint, addSomeToDelayToExisting) {
    let newDelay = delay;
    if (newStartPoint === start) {
      newDelay += addSomeToDelayToExisting * 10;
    }
    if (start !== end) {
      start += 1;
      setTimeout(
        () => this.setState({ countedValue: start }, () => this.countUp(start, end, newDelay, newStartPoint, addSomeToDelayToExisting)),
        delay,
      );
    }
  }

  countDown(start, end, delay, newStartPoint, addSomeToDelayToExisting) {
    let newDelay = delay;
    if (newStartPoint === start) {
      newDelay += addSomeToDelayToExisting * 10;
    }
    if (start !== end) {
      start -= 1;
      setTimeout(
        () => this.setState({ countedValue: start }, () => this.countDown(start, end, newDelay, newStartPoint, addSomeToDelayToExisting)),
        delay,
      );
    }
  }

  render() {
    const { countedValue } = this.state;
    const { className, preFix, postFix } = this.props;
    return (
      <div className={className}>
        {preFix}
        {' '}
        {countedValue}
        {' '}
        {postFix}
      </div>
    );
  }
}

NumberCounter.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  className: PropTypes.string,
  delay: PropTypes.number,
  preFix: PropTypes.string,
  postFix: PropTypes.string,
  reverse: PropTypes.bool,
};

NumberCounter.defaultProps = {
  start: 0,
  end: 0,
  className: '',
  delay: 2,
  preFix: '',
  postFix: '',
  reverse: false,
};
