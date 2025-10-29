/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useState, useEffect, useRef } from 'react';

import ControlComponentOri from './ControlComponentOri';
import ControlComponentSp from './ControlComponentSp';
import ControlComponentFc from './ControlComponentFc';

import ButtonUI from '../UI/Button';
import RestartAlt from '@mui/icons-material/RestartAlt';

import Box from '@mui/system/Box';
import { Loading } from '@common';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/middleware/store/store';

import { makeReset } from 'src/middleware/actions/resetActions';
import { RESET_SUCCESS } from 'src/middleware/types/ResetActionTypes';

import { getUnify } from 'src/middleware/actions/unifyActions';
import { UNIFY_SUCCESS } from '@UnifyActionTypes';

const Control = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasCalledUnify = useRef(false);

  const [disabledOri, setDisabledOri] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const { status, data, error, isLoading } = useSelector(
    (state: RootState) => state.reset,
  );

  const { statusUnify, dataUnify } = useSelector(
    (state: RootState) => state.unify,
  );

  ///
  useEffect(() => {
    if (!hasCalledUnify.current) {
      hasCalledUnify.current = true;
      dispatch(getUnify());
    }
  }, [dispatch]);

  useEffect(() => {
    if (statusUnify === UNIFY_SUCCESS) {
      setShowLoading(false);
    }
  }, [statusUnify]);

  useEffect(() => {
    if (status === RESET_SUCCESS) {
      setShowLoading(false);
    }
  }, [isLoading, status]);

  //

  const iniciarHandler = () => {
    setShowLoading(true);
    dispatch(makeReset());
  };

  const onDisableOriHandler = (disabled: boolean) => {
    setDisabledOri(disabled);
  };
  ///

  const loadingView = (
    <Box>
      <Loading />
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

          {dataUnify && (
            <Box
              sx={{
                border: '2px solid #444',
                borderRadius: '10px',
                padding: '5px',
                marginBottom: '10px',
              }}
            >
              <ControlComponentOri unify={dataUnify} disabled={disabledOri} />
            </Box>
          )}

          {dataUnify && (
            <Box
              sx={{
                border: '2px solid #444',
                borderRadius: '10px',
                padding: '5px',
                marginBottom: '10px',
              }}
            >
              <ControlComponentSp
                unify={dataUnify}
                onDisableOri={onDisableOriHandler}
              />
            </Box>
          )}

          {dataUnify && (
            <Box
              sx={{
                border: '2px solid #444',
                borderRadius: '10px',
                padding: '5px',
                marginBottom: '10px',
              }}
            >
              <ControlComponentFc unify={dataUnify} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Control;
