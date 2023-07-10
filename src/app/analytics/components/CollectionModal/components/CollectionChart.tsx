import { useState, useEffect } from "react";
import axios, { Method } from "axios";
import { createChart, UTCTimestamp } from "lightweight-charts";

interface CollectionModalProps {
  collectionId: string;
}

interface CandleStick {
  helloMoonCollectionId: string;
  granularity: string;
  lastblockid: number;
  startTime: number;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
}

const CollectionChart: React.FC<CollectionModalProps> = ({ collectionId }) => {
  const [candleSticks, setCandleSticks] = useState<CandleStick[]>([]);
  const [granularity, setGranularity] = useState<string>("FIVE_MIN");

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "POST" as Method,
        url: "https://rest-api.hellomoon.io/v0/nft/collection/floorprice/candlesticks",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: "Bearer e61f6dc6-b585-42fa-90aa-4611b292cf47",
        },
        data: {
          granularity: [granularity],
          helloMoonCollectionId: collectionId,
          limit: "1000",
        },
      };

      try {
        const response = await axios.request(options);
        setCandleSticks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [collectionId, granularity]);

  useEffect(() => {
    // Create the chart container
    const chartContainer = document.createElement("div");
    chartContainer.id = "chartContainer";

    // Apply CSS styles to position the chart container
    chartContainer.style.position = "absolute";
    chartContainer.style.top = "55%";
    chartContainer.style.left = "50%";
    chartContainer.style.transform = "translate(-50%, -50%)";

    // Append the chart container to the document body
    document.body.appendChild(chartContainer);

    // Create the chart
    const chart = createChart(chartContainer, {
      layout: {
        background: { color: "#111111" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#333333" },
        horzLines: { color: "#333333" },
      },
      width: 1500,
      height: 600,
    });
    const lineSeries = chart.addCandlestickSeries();

    const data = candleSticks.map((candleStick) => ({
      time: (candleStick.startTime * 1000) as UTCTimestamp,
      open: candleStick.open / 10 ** 9,
      high: candleStick.high / 10 ** 9,
      low: candleStick.low / 10 ** 9,
      close: candleStick.close / 10 ** 9, // Convert lamports to SOL
    }));

    // Sort the data array by time in ascending order
    data.sort((a, b) => a.time - b.time);

    lineSeries.setData(data);

    return () => {
      // Cleanup chart and container when component unmounts
      chartContainer.remove();
      chart.remove();
    };
  }, [candleSticks]);

  const handleGranularityChange = (selectedGranularity: string) => {
    setGranularity(selectedGranularity);
  };

  return (
    <div className="pl-auto mt-4">
      <div className="pl-auto">
        <button className="ml-2 rounded-sm bg-[#333333] px-2 py-1 text-[#f8f8f8]" onClick={() => handleGranularityChange("ONE_MIN")}>1MIN</button>
        <button className="ml-2 rounded-sm bg-[#333333] px-2 py-1 text-[#f8f8f8]" onClick={() => handleGranularityChange("FIVE_MIN")}>5MIN</button>
        <button className="ml-2 rounded-sm bg-[#333333] px-2 py-1 text-[#f8f8f8]" onClick={() => handleGranularityChange("ONE_HOUR")}>1HR</button>
        <button className="ml-2 rounded-sm bg-[#333333] px-2 py-1 text-[#f8f8f8]" onClick={() => handleGranularityChange("ONE_DAY")}>1D</button>
        <button className="ml-2 rounded-sm bg-[#333333] px-2 py-1 text-[#f8f8f8]" onClick={() => handleGranularityChange("ONE_WEEK")}>1W</button>
      </div>
      <div id="chartContainer"></div>
    </div>
  );
};

export default CollectionChart;
