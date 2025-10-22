import React, { useEffect, useState } from "react";
import { ReactECharts } from "./Chart/ReactECharts";
import moment from "moment";
import { optionEChartHeart } from "./Chart/OptionEChartHeart";
import Box from "@mui/system/Box";

const FORMAT = "HH:mm:ss:SS";

const initialHourMinutes = () => {
  const now = new Date();
  const fechaHora = moment(now, FORMAT);
  return fechaHora.format(FORMAT);
};
const MonitorHeartBit = () => {
  const [option, setOption] = useState({});
  const [hourMinutes, setHourMinutes] = useState<string>(initialHourMinutes());
  const [heartList, setHeartList] = useState<Array<number>>([
    9, 7.5, 6, 3, 2, 2, 2,
  ]);
  const [separator, setSeparator] = useState<number>(1);

  useEffect(() => {
    setOption(
      optionEChartHeart(
        "Heart Bit",
        10,
        1,
        minutesData(),
        [9, 7.5, 6, 3, 2, 2, 2, 2, 9, 7.5, 6, 3, 2, 2, 2, 2]
      )
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const fechaHora = moment(now, FORMAT);
      setHourMinutes(fechaHora.format(FORMAT));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const list: Array<number> = heartList;
    setSeparator(separator + 1);

    list.push(9, 7.5, 6, 3, 2, 2, 2, 2);

    if (list.length > 50) {
      list.splice(0, 1);
    }

    setOption(optionEChartHeart("Heart Bit", 10, 1, minutesData(), list));

    setHeartList(list);
  }, [hourMinutes]);

  //

  const minutesData = () => {
    const res: Array<string> = [];
    let i = 1;

    for (let index = 0; index < 50; index++) {
      res.push(i.toString());
      ++i;
    }

    return res;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        width: "500px",
        height: "100px",
      }}
    >
      <ReactECharts option={option} />
    </Box>
  );
};

export default MonitorHeartBit;
