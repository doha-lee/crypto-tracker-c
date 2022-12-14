import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

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

function CandleChart({ coinId }: ChartProps) {
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
					type="line"
					series={[
						{
							name: "Price",
							data: data?.map((price) =>
								parseFloat(price.close)
							) as number[],
						},
					]}
					options={{
						theme: { mode: "dark" },
						chart: {
							height: 500,
							width: 500,
							toolbar: { show: false },
							background: "transparent",
						},
						grid: { show: false },
						stroke: {
							curve: "smooth",
							width: 4,
						},
						yaxis: { show: false },
						xaxis: {
							axisBorder: { show: false },
							axisTicks: { show: false },
							labels: { show: false },
							type: "datetime",
							categories: data?.map((price) => price.time_close),
						},
						fill: {
							type: "gradient",
							colors: ["#0fbcf9"],
							gradient: {
								gradientToColors: ["#0be881"],
								stops: [0, 50],
							},
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

export default CandleChart;
