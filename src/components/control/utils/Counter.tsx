import { useEffect, useState } from "react";
import React from "react";
import Box from "@mui/system/Box";

/*
    container: {

    },
    counter: {
      textAlign: "right",
      width: "170px",
    },
    title: {
      color: "#bbb",
      fontSize: "20px",
      paddingLeft: "3px",
      width: "100px",
    },
*/

interface CounterProps {
  oldValue: number;
  newValue?: number;
  newSeconds: number;
  title: string;
  //
  onChangeCounter: (oriCounter: number) => void;
}

const CounterComponent: React.FunctionComponent<CounterProps> = (props) => {
  const [counter, setCounter] = useState<number | undefined>();
  const [old, setOld] = useState<number>(props.oldValue);

  useEffect(() => {
    setCounter(props.oldValue);
  }, []);

  useEffect(() => {
    setOld(props.oldValue ? props.oldValue : 0);
    if (props.newValue === undefined) setCounter(props.oldValue);
  }, [props.oldValue]);

  useEffect(() => {
    if (
      props.newValue &&
      (props.oldValue !== props.newValue || old !== props.oldValue)
    ) {
      props.oldValue !== counter
        ? calculateCounter(Number(counter), props.newValue, props.newSeconds)
        : calculateCounter(old, props.newValue, props.newSeconds);

      setOld(props.oldValue ? props.oldValue : 0);
    }
  }, [props.oldValue, props.newValue]);

  const calculateCounter = (
    oldValue: number,
    newValue: number,
    seconds: number
  ) => {
    let initialValue = 0;
    let finalValue = 0;
    let dif = 0;

    if (oldValue > newValue) {
      dif = oldValue - newValue;
      const jumps = dif / seconds;

      initialValue = oldValue;
      finalValue = newValue;

      let index = 0;

      const interval = setInterval(() => {
        if (index < seconds && initialValue - jumps > finalValue) {
          initialValue = initialValue - jumps;
        } else {
          initialValue = finalValue;

          // Sale del interval
          clearInterval(interval);
        }

        setCounter(Math.trunc(initialValue));
        props.onChangeCounter(Math.trunc(initialValue));
        ++index;
      }, 1000);
    }

    if (oldValue < newValue) {
      dif = newValue - oldValue;
      const jumps = dif / seconds;

      initialValue = oldValue;
      finalValue = newValue;

      let index = 0;
      const interval = setInterval(() => {
        if (index < seconds && initialValue < finalValue) {
          initialValue = initialValue + jumps;
        } else {
          initialValue = finalValue;

          // Sale del interval
          clearInterval(interval);
        }

        props.onChangeCounter(Math.trunc(initialValue));
        setCounter(Math.trunc(initialValue));

        ++index;
      }, 1000);
    }
  };

  ///

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <p>{counter}</p>
      <p>{props.title}</p>
    </Box>
  );
};

export default CounterComponent;
