import React from 'react';
import { useState, useEffect } from 'react';
import { controlDataOri, controlDataFc, controlDataSp } from '@interfaces';
import { updateOri } from '@hooks/HookUpdateOri';
import { HookUpdateSp } from '@hooks/HookUpdateSp';
import { HookUpdateFc } from '@hooks/HookUpdateFc';

import Box from '@mui/system/Box';
import moment from 'moment';

//import ControlBar from "../control/UI/ControlBar";
import MonitorComponent from '../monitor/MonitorComponent';
import MonitorComponentOri from '../monitor/MonitorComponentOri';

import { MONITOR_TIME_REFRESH } from '@constants/global';
import MonitorHeart from './MonitorHeart';

const FORMAT = 'HH:mm:ss';

const Monitor = () => {
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

  const { dataLastOri, getLastOri, loadingDataOri } = updateOri();
  const { dataLastSp, getLastSp, loadingDataSp } = HookUpdateSp();
  const { dataLastFc, getLastFc, loadingDataFc } = HookUpdateFc();

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
    getLastOri();
    getLastFc();
    getLastSp();
  }, [hourMinutes]);

  useEffect(() => {
    console.log('dataLastOri', dataLastOri);
    console.log('dataLastSp', dataLastSp);
    console.log('dataLastFc', dataLastFc);
    if (dataLastOri) {
      setDataLoadOri(dataLastOri);
    }

    if (dataLastSp) {
      setDataLoadSp(dataLastSp);
    }

    if (dataLastFc) {
      setDataLoadFc(dataLastFc);
    }

    if (dataLastFc && dataLastOri && dataLastSp) {
      setShowLoading(false);
    }
  }, [dataLastOri, dataLastFc, dataLastSp]);

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
        marginBttom: '10px',
        width: '500px',
      }}
    >
      <MonitorComponentOri
        minValue={0}
        maxValue={1}
        dataLoad={dataLoadOri!}
        start={true}
        loading={loadingDataOri}
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
          loading={loadingDataSp}
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
          value={dataLastFc!.fc!}
          start={true}
          loading={loadingDataFc}
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
            }}
          >
            <Box
              sx={{
                width: '560px',
                paddingBottom: '100px',
              }}
            >
              <Box>{dataLoadFc && heartView}</Box>

              {oriView}
              {spView}
              {fcView}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Monitor;
