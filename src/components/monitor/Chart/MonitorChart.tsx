/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useEffect, useState } from 'react';
import { optionEChart } from './OptionEChart';

import '../monitorStyle.css';

import { ReactECharts } from './ReactECharts';

import { MONITOR_TIME_REFRESH } from '@constants/global';
import Box from '@mui/system/Box';

interface MonitorChartProps {
  title: string;
  minValue: number;
  maxValue: number;
  xAxis: Array<string>;
  dataLoad: Array<number>;
  lastValue: string;
  hourMinutes: string;
  //
}
const MonitorChart: React.FunctionComponent<MonitorChartProps> = (props) => {
  const [option, setOption] = useState({});

  useEffect(() => {
    setOption(
      optionEChart(
        props.title,
        props.maxValue,
        props.minValue,
        props.xAxis,
        props.dataLoad,
      ),
    );
  }, []);

  useEffect(() => {
    const list: Array<number> = props.dataLoad;
    setInterval(function () {
      setOption(
        optionEChart(
          props.title,
          props.maxValue,
          props.minValue,
          props.xAxis,
          list,
        ),
      );
    }, MONITOR_TIME_REFRESH);
  }, [props.hourMinutes]);

  //

  const monitorView = (
    <Box className={'container'}>
      <div className={'divChart'}>
        <ReactECharts option={option} />
      </div>

      <div className="col-4">
        <div className="row d-flex justify-content-end">
          <div className="d-flex justify-content-end">
            <div className="col-8 d-flex align-self-center justify-content-end">
              <p className="value-monitor">{props.lastValue}</p>
            </div>
            <div className="col-4 d-flex align-self-center">
              {props.title === 'Ori' && <span className="lpm-value">Ori</span>}
              {props.title === 'Sp02' && (
                <span className="lpm-value">% Sp02</span>
              )}
              {props.title === 'Fc' && <span className="lpm-value">lpm</span>}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );

  return <>{monitorView}</>;
};

export default MonitorChart;
