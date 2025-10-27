/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useState, useEffect } from 'react';

import ControlComponentOri from './ControlComponentOri';
import ControlComponentSp from './ControlComponentSp';
import ControlComponentFc from './ControlComponentFc';

import { updateOri } from '@hooks/HookUpdateOri';
import { HookUpdateSp } from '@hooks/HookUpdateSp';
import { HookUpdateFc } from '@hooks/HookUpdateFc';

import ButtonUI from '../UI/Button';
import RestartAlt from '@mui/icons-material/RestartAlt';

import Box from '@mui/system/Box';

const Control = () => {
  const [disabledOri, setDisabledOri] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const { getLastOri, loadingResetOri, resetDataOri } = updateOri();
  const { getLastSp, loadingResetSp, resetDataSp } = HookUpdateSp();
  const { getLastFc, loadingResetFc, resetDataFc } = HookUpdateFc();

  //

  useEffect(() => {
    if (loadingResetOri && loadingResetSp && loadingResetFc) {
      getLastOri();
      getLastFc();
      getLastSp();

      setShowLoading(false);
    }
  }, [loadingResetOri, loadingResetSp, loadingResetFc]);

  ///

  const iniciarHandler = () => {
    setShowLoading(true);

    resetDataOri();
    resetDataSp();
    resetDataFc();
  };

  const onDisableOriHandler = (disabled: boolean) => {
    setDisabledOri(disabled);
  };
  ///

  const loadingView = (
    <Box>
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
        border: '2px solid #444',
        borderRadius: '10px',
        padding: '5px',
        marginBottom: '10px',
      }}
    >
      <ControlComponentOri disabled={disabledOri} />
    </Box>
  );

  const spView = (
    <Box
      sx={{
        border: '2px solid #444',
        borderRadius: '10px',
        padding: '5px',
        marginBottom: '10px',
      }}
    >
      <ControlComponentSp onDisableOri={onDisableOriHandler} />
    </Box>
  );

  const fcView = (
    <Box
      sx={{
        border: '2px solid #444',
        borderRadius: '10px',
        padding: '5px',
        marginBottom: '10px',
      }}
    >
      <ControlComponentFc />
    </Box>
  );

  return (
    <Box>
      {showLoading && loadingView}

      {!showLoading && (
        <Box>
          <Box
            sx={{
              paddingBottom: '10px',
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <ButtonUI
              title={'Reset'}
              saving={false}
              color={'error'}
              variant={'outlined'}
              startIcon={<RestartAlt />}
              //
              onClick={iniciarHandler}
            />
          </Box>

          {oriView}
          {spView}
          {fcView}
        </Box>
      )}
    </Box>
  );
};

export default Control;
