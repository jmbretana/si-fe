import React from 'react';
import InputUpDownComponent from '../../UI/InputUpDownComponent';

interface SecondsComponentProps {
  newSeconds: number;
  disabled?: boolean;
  //
  onChangeSeconds: (number) => void;
}

const SecondsComponent: React.FunctionComponent<SecondsComponentProps> = (
  props,
) => {
  return (
    <div className="row pt-2">
      <div>
        <div className="row">
          <div className="col-2">
            <p className="fs-6 fw-lighter text-white pt-1">Seg</p>
          </div>
          <div>
            <InputUpDownComponent
              value={props.newSeconds ? props.newSeconds : 1}
              min={1}
              max={60}
              disabled={props.disabled}
              //
              changeValue={(value) => props.onChangeSeconds(value)}
            />
          </div>
        </div>
      </div>
      <div>
        <input
          type="range"
          className="form-range"
          id="range"
          min="1"
          max="60"
          step="1"
          value={props.newSeconds ? props.newSeconds : ''}
          onChange={(e) => props.onChangeSeconds(Number(e.target.value))}
          disabled={props.disabled}
          style={{
            paddingTop: '15px',
            width: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default SecondsComponent;
