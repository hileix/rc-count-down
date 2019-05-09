import React from 'react';
import { storiesOf } from '@storybook/react';
import docs from './docs.md';

import ReactCountDown from '../ReactCountDown';

class ReactCountDownDemo extends React.Component {
  render() {
    const { time, onEnd, remainingTimePoints } = this.props;
    return (
      <div>
        {time && <ReactCountDown time={10} />}
        {onEnd && <ReactCountDown time={10} onEnd={alert('倒计时结束')} />}
        {remainingTimePoints && (
          <ReactCountDown
            time={10}
            remainingTimePoints={[
              {
                point: 5,
                callback: () => console.log('距离结束还有 5 秒钟')
              }
            ]}
          />
        )}
      </div>
    );
  }
}

const Time = () => {
  return <ReactCountDown time={10} />;
};

const OnEnd = () => {
  return <ReactCountDown time={5} onEnd={() => alert('倒计时结束')} />;
};

const RemainingTimePoints = () => {
  return (
    <ReactCountDown
      time={5}
      remainingTimePoints={[
        {
          point: 2,
          callback: () => console.log('距离结束还有 2 秒钟')
        }
      ]}
    />
  );
};

class InstanceProp extends React.Component {
  getCountDownRef = node => {
    this.countDownRef = node;
  };

  getUseTime = () => {
    alert(this.countDownRef.useTime);
  };

  getTotalTime = () => {
    alert(this.countDownRef.totalTime);
  };

  getRemainTime = () => {
    alert(this.countDownRef.remainTime);
  };

  render() {
    return (
      <div>
        <ReactCountDown time={10 * 60} ref={this.getCountDownRef} />
        <button onClick={this.getUseTime}>查看用时（单位：秒）</button>
        <br />
        <button onClick={this.getTotalTime}>查看总时间（单位：秒）</button>
        <br />
        <button onClick={this.getRemainTime}>查看剩余时间（单位：秒）</button>
        <br />
      </div>
    );
  }
}

storiesOf('ReactCountDown 倒计时', module)
  .add('time', () => <Time />, {
    notes: {
      markdown: docs
    }
  })
  .add('onEnd', () => <OnEnd />, {
    notes: {
      markdown: docs
    }
  })
  .add('remainingTimePoints', () => <RemainingTimePoints />, {
    notes: {
      markdown: docs
    }
  })
  .add('实例属性', () => <InstanceProp />, {
    notes: {
      markdown: docs
    }
  });
