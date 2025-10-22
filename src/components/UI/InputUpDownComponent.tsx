import React from 'react';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { transformToDecimal, invertDecimal } from '@utils/utils';

interface InputUpDownComponentProps {
  value: number;
  disabled?: boolean;
  min: number;
  max: number;
  ori?: boolean;
  //

  changeValue: (number) => void;
}

const InputUpDownComponent: React.FunctionComponent<
  InputUpDownComponentProps
> = (props) => {
  const [newValue, setNewValue] = useState<string>(
    props.value ? props.value.toString() : '',
  );

  useEffect(() => {
    if (props.ori) {
      setNewValue(transformToDecimal(Number(props.value))!);
    } else {
      setNewValue(props.value ? props.value.toString() : '');
    }
  }, [props.value]);

  const upValue = (value: string) => {
    let localValue = Number(value);

    if (props.ori) {
      localValue = invertDecimal(localValue);
    }

    if (value && localValue < props.max) {
      ++localValue;
      props.changeValue(localValue);
    }
  };

  const downValue = (value: string) => {
    let localValue = Number(value);

    if (props.ori) {
      localValue = invertDecimal(localValue);
    }

    if (value && localValue > props.min) {
      --localValue;
      props.changeValue(localValue);
    }
  };

  const editValue = (v) => {
    let value: number;

    if (v !== '') {
      if (props.ori) {
        value = Number(transformToDecimal(v));
      } else {
        value = v ? v.toString() : '';
      }
    } else value = 0;

    if (value > props.max) value = props.max;
    if (value < props.min) value = props.min;

    setNewValue(value ? value.toString() : '');
    props.changeValue(value);
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder=""
        aria-label=""
        value={newValue}
        onChange={(e) => editValue(e.target.value)}
      />
      <button
        type="button"
        onClick={() => downValue(newValue)}
        disabled={props.disabled}
        className={clsx(
          { 'bg-secondary': props.disabled },
          { 'btn btn-secondary': true },
        )}
      >
        <FaArrowCircleDown />
      </button>
      <button
        className={clsx(
          { 'bg-secondary': props.disabled },
          { 'btn btn-secondary btn-success': true },
        )}
        type="button"
        onClick={() => upValue(newValue)}
        disabled={props.disabled}
      >
        <FaArrowCircleUp />
      </button>
    </div>
  );
};

export default InputUpDownComponent;
