import React from 'react';
import { useState, useEffect } from 'react';
import { controlDataOri, controlDataFc, controlDataSp } from '@interfaces';

import Box from '@mui/system/Box';
import moment from 'moment';

//import ControlBar from "../control/UI/ControlBar";
import MonitorComponent from '../monitor/MonitorComponent';
import MonitorComponentOri from '../monitor/MonitorComponentOri';

import { MONITOR_TIME_REFRESH } from '@constants/global';
import MonitorHeart from './MonitorHeart';

import { getUnify } from 'src/middleware/actions/unifyActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/middleware/store/store';

const FORMAT = 'HH:mm:ss';

const Monitor = () => {
  const dispatch = useDispatch<AppDispatch>();

  const initialHourMinutes = () => {
    const now = new Date();
    const fechaHora = moment(now, FORMAT);
    return fechaHora.format(FORMAT);
  };

  const [dataLoadOri, setDataLoadOri] = useState<controlDataOri>();
  const [dataLoadSp, setDataLoadSp] = useState<controlDataSp>();
  const [dataLoadFc, setDataLoadFc] = useState<controlDataFc>();

  const [hourMinutes, setHourMinutes] = useState<string>(initialHourMinutes());
  const [showLoading, setShowLoading] = useState<boolean>(true);

  const { statusUnify, dataUnify } = useSelector(
    (state: RootState) => state.unify,
  );

  //

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const fechaHora = moment(now, FORMAT);
      setHourMinutes(fechaHora.format(FORMAT));
    }, MONITOR_TIME_REFRESH);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(getUnify());
  }, [hourMinutes]);

  useEffect(() => {
    if (dataUnify) {
      setDataLoadOri({
        ori: dataUnify.ori,
        oriSeconds: dataUnify.oriSeconds,
        id: 1,
      });
    }

    if (dataUnify) {
      setDataLoadSp({
        sp: dataUnify.sp,
        spSeconds: dataUnify.spSeconds,
        id: 2,
      });
    }

    if (dataUnify?.fc) {
      setDataLoadFc({
        id: '3',
        fc: dataUnify.fc,
        fcSeconds: dataUnify.fcSeconds,
      });
    }

    if (dataUnify?.fc && dataUnify?.ori && dataUnify?.sp) {
      setShowLoading(false);
    }
  }, [dataUnify]);

  ///

  const loadingView = (
    <Box className="container border-white d-flex justify-content-center div-loading">
      <span
        className="spinner-border spinner-border-sm loading-data"
        role="status"
        aria-hidden="true"
      ></span>
    </Box>
  );

  const oriView = (
    <Box
      sx={{
        border: '2px solid #eee',
        borderRadius: '10px',

        width: '500px',
      }}
    >
      <MonitorComponentOri
        minValue={0}
        maxValue={1}
        dataLoad={dataLoadOri!}
        start={true}
        loading={false}
        hourMinutes={hourMinutes!}
      />
    </Box>
  );

  const spView = (
    <Box
      sx={{
        border: '2px solid #eee',
        borderRadius: '10px',
        marginBttom: '10px',
        width: '500px',
      }}
    >
      {dataLoadSp && (
        <MonitorComponent
          title={'Sp02'}
          minValue={1}
          maxValue={100}
          value={dataLoadSp.sp!}
          start={true}
          loading={false}
          hourMinutes={hourMinutes!}
        />
      )}
    </Box>
  );

  const fcView = (
    <Box
      sx={{
        border: '2px solid #eee',
        borderRadius: '10px',
        marginBttom: '10px',
        width: '500px',
      }}
    >
      {dataLoadFc && (
        <MonitorComponent
          title={'Fc'}
          minValue={1}
          maxValue={300}
          value={dataLoadFc!.fc!}
          start={true}
          loading={false}
          hourMinutes={hourMinutes!}
        />
      )}
    </Box>
  );

  const heartView = (
    <Box>
      <MonitorHeart dataLoad={dataLoadFc!} hourMinutes={hourMinutes!} />
    </Box>
  );

  return (
    <Box>
      {showLoading && loadingView}

      {!showLoading && (
        <Box>
          <Box
            sx={{
              background: "url('/masimo3.png') no-repeat",
              paddingTop: '120px',
              paddingLeft: '460px',
              paddingRight: '20px',
              paddingBottom: '120px',
            }}
          >
            <Box>
              <Box>{dataLoadFc && heartView}</Box>

              <Box gap={2} display="flex" flexDirection="column">
                {oriView}
                {spView}
                {fcView}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Monitor;
