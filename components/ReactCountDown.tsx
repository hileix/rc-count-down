import React from 'react';
import PropTypes from 'prop-types';

export interface RemainingTimePointsInterface {
  point: number;
  callback: () => void;
}

export interface CountDownProps {
  time: number;
  onEnd: () => void;
  remainingTimePoints: Array<RemainingTimePointsInterface>;
}

export interface CountDownState {
  time: number;
}

/**
 * 倒计时组件
 */
export default class ReactCountDown extends React.Component<
  CountDownProps,
  CountDownState
> {
  static propTypes = {
    /**
     * 剩余时间（秒）
     */
    time: PropTypes.number.isRequired,

    /**
     * 时间为 0 时的回调函数
     */
    onEnd: PropTypes.func,

    /**
     * 剩余时间点回调
     * 默认：-
     * [{
     *   point: 10 * 60, // 距离倒计时 10 分钟
     *   callback: () => alert('距离结束还有 10 分钟') // 在距离结束还有 10 分钟时的回调函数
     * }]
     */
    remainingTimePoints: PropTypes.shape({
      point: PropTypes.number,
      callback: PropTypes.func
    })
  };

  static defaultTypes = {};

  constructor(props) {
    super(props);
    const { time } = props;

    this.totalTime = time;
    this.remainTime = time;

    this.state = {
      time
    };
  }

  private timer: any;

  totalTime: number; // 总时间
  useTime: number = 0; // 用时（单位：秒）
  remainTime: number; // 剩余时间

  componentDidMount = () => {
    this.setTime();
  };

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  };

  setTime = () => {
    this.timer = setTimeout(() => {
      const time = this.state.time - 1;
      if (time === 0) {
        this.setState({ time });
        this.props.onEnd && this.props.onEnd();
        return clearTimeout(this.timer);
      }
      const { remainingTimePoints } = this.props;

      // 在某个时间点
      remainingTimePoints &&
        remainingTimePoints.forEach(timePoint => {
          if (timePoint.point === time) {
            timePoint.callback && timePoint.callback();
          }
        });
      // 剩余时间
      this.remainTime = time;
      // 用时
      this.useTime = this.totalTime - this.remainTime;

      this.setState({ time: time });

      this.setTime();
    }, 1000);
  };

  render() {
    const { time } = this.state;
    let m: number | string = Math.floor(time / 60);
    let s: number | string = time % 60;

    m = m < 10 ? '0' + m : m + '';
    s = s < 10 ? '0' + s : s + '';

    return (
      <div>
        <span>{m}</span>
        <span>:</span>
        <span>{s}</span>
      </div>
    );
  }
}
