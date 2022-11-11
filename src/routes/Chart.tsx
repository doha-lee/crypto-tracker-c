import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import Price from "./Price";

interface ChartProps {
	coinId: string;
}

interface IHistorical {
	time_close: number;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: number;
}

function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<IHistorical[]>(
		["ohlcv", coinId],
		() => fetchCoinHistory(coinId),
		{
			refetchInterval: 10000,
		}
	);
	return (
		<div>
			{isLoading ? (
				"Loading Chart..."
			) : (
				<ApexChart
					type="candlestick"
					series={[
						{
							name: "Price",
							data: data?.map((price) => ({
								x: price.time_close,
								y: [
									price.open,
									price.high,
									price.low,
									price.close,
								],
							})) as [],
						},
					]}
					options={{
						theme: {
							mode: "dark",
						},
						chart: {
							height: 500,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						grid: { show: false },

						yaxis: {
							show: false,
						},
						xaxis: {
							type: "datetime",
						},

						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
