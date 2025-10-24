/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useEffect, useState } from 'react';
import { optionEChart } from './OptionEChart';

import '../monitorStyle.css';

import { ReactECharts } from './ReactECharts';

import { MONITOR_TIME_REFRESH } from '@constants/global';
import { Box, Typography } from '@mui/material';

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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        height: '180px',
        maxHeight: '250px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <ReactECharts option={option} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          mt: 1,
          flexShrink: 0,
          gap: 2,
          alignItems: 'baseline',
        }}
      >
        <Box
          sx={{
            minWidth: '80px',
            maxWidth: '80px',
            textAlign: 'right',
          }}
        >
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {props.lastValue}
          </Typography>
        </Box>
        <Box
          sx={{
            minWidth: '60px',
            maxWidth: '60px',
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
            }}
          >
            {props.title === 'Ori'
              ? 'Ori'
              : props.title === 'Sp02'
                ? '% Sp02'
                : 'lpm'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MonitorChart;
