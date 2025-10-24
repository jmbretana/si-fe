import React from 'react';
import { useEffect, useState } from 'react';
import { controlDataOri } from '../../interfaces';
import MonitorChart from './Chart/MonitorChart';
import { MONITOR_LEN } from '../../constants/global';

interface MonitorComponentOriProps {
  dataLoad: controlDataOri;
  loading: boolean;
  start: boolean;
  hourMinutes: string;
  minValue: number;
  maxValue: number;
  //
}

const MonitorComponentOri: React.FunctionComponent<MonitorComponentOriProps> = (
  props,
) => {
  const [dataLoad, setDataLoad] = useState<Array<number>>();
  const [dataLastValue, setDataLastValue] = useState<string>('');

  const [first, setFirst] = useState(true);
  const [hourMinutes, sethourMinutes] = useState<string>(props.hourMinutes);

  const calculateFirstList = () => {
    const firstValue: Array<number> = [];

    if (props.dataLoad.ori === 10) {
      firstValue.push(1);
      setDataLastValue('1');
    } else {
      firstValue.push(Number('0.' + props.dataLoad.ori + '0'));
      setDataLastValue('0.' + props.dataLoad.ori + '0');
    }

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

      if (props.dataLoad.ori === 10) {
        list.push(1);
        setDataLastValue('1');
      } else {
        list.push(Number('0.' + props.dataLoad.ori + '0'));
        setDataLastValue('0.' + props.dataLoad.ori + '0');
      }
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
          title={'Ori'}
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

export default MonitorComponentOri;
