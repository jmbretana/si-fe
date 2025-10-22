export const optionEChartHeart = (
    type: string,
    maxValue: number,
    minValue: number,
    xAxis: Array<string>,
    data: Array<number>) => {
    const option = {
        notMerge: true,
        lazyUpdate: true,
        title: {
            text: "",
        },
        chart: {
            labelDisplay: "wrap",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#283b56",
                },
            },
        },

        xAxis: [
            {
                minorTick: {
                    show: true
                },
                boundaryGap: false,
                data: xAxis,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff',
                    },
                },
                splitNumber: 10,
                offset: 2.5

            },
        ],
        yAxis: [
            {
                type: "value",
                scale: true,
                max: maxValue,
                min: minValue,
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#222',
                    }
                },
                position: "right",
            },
        ],
        series: [
            {
                type: "line",
                showSymbol: false,
                data: data,
                smooth: true,
                lineStyle: {
                    color: '#fff',
                    width: 3,
                }
            },
        ],
    };

    return option;
}