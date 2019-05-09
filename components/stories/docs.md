# ReactCountDown

## Example

```javascript
<ReactCountDown
  time={10}
  onEnd={() => alert('倒计时结束')}
  remainingTimePoints={[
    {
      point: 5,
      callback: () => console.log('距离结束还有 5 秒钟')
    }
  ]}
/>
```

## props

|        属性         |     类型     | 默认值 |          描述          |
| :-----------------: | :----------: | :----: | :--------------------: |
|        time         |   `number`   |   -    | 倒计时时间（单位：秒） |
|        onEnd        | `function()` |   -    |   时间为 0 时的回调    |
| remainingTimePoints |   `object`   |   -    | 剩余时间点回调（如下） |

### remainingTimePoints

|   属性   |     类型     | 默认值 |              描述              |
| :------: | :----------: | :----: | :----------------------------: |
|  point   |   `number`   |   -    | 距离倒计时的时间点（单位：秒） |
| callback | `function()` |   -    |        在该时间点的回调        |

## Instance property

- totalTime: 总时间（单位：秒）
- useTime: 用时（单位：秒）
- remainTime: 剩余时间（单位：秒）

```javascript
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
```
