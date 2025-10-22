import React from 'react';
import { useEffect, useState } from 'react';
import MonitorChart from './Chart/MonitorChart';
import { MONITOR_LEN } from '../../constants/global';

interface MonitorComponentProps {
  title: string;
  value: number;
  loading: boolean;
  start: boolean;
  hourMinutes: string;
  minValue: number;
  maxValue: number;
  //
}

const MonitorComponent: React.FunctionComponent<MonitorComponentProps> = (
  props,
) => {
  const [dataLoad, setDataLoad] = useState<Array<number>>();
  const [dataLastValue, setDataLastValue] = useState<string>('');

  const [first, setFirst] = useState(true);
  const [hourMinutes, sethourMinutes] = useState<string>(props.hourMinutes);

  const calculateFirstList = () => {
    const firstValue: Array<number> = [];
    firstValue.push(props.value);
    setDataLastValue(props.value ? props.value.toString() : '');
    return firstValue;
  };

  useEffect(() => {
    const list: Array<number> = dataLoad ? dataLoad : calculateFirstList();

    if (first) {
      setFirst(false);
      setDataLoad(calculateFirstList());
    }

    if (!first && props.hourMinutes !== hourMinutes) {
      sethourMinutes(props.hourMinutes);

      if (list.length > MONITOR_LEN) {
        list.splice(0, 1);
      }

      list.push(props.value);
      setDataLastValue(props.value ? props.value.toString() : '');
      setDataLoad(list);
    }
  }, [props.hourMinutes]);

  //

  const minutesData = () => {
    const res: Array<string> = [];
    let i = 1;

    for (let index = 0; index < MONITOR_LEN; index++) {
      res.push(i.toString());
      ++i;
    }

    return res;
  };

  return (
    <>
      {dataLoad && dataLoad.length > 0 && (
        <MonitorChart
          title={props.title}
          minValue={props.minValue}
          maxValue={props.maxValue}
          xAxis={minutesData()}
          dataLoad={dataLoad ? dataLoad : []}
          lastValue={dataLastValue}
          hourMinutes={hourMinutes}
        />
      )}
    </>
  );
};

export default MonitorComponent;
