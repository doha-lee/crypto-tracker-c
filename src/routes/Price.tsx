import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchCoinTickers } from "./api";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: center;
	background-color: ${(props) => props.theme.textColor};
	padding: 10px 20px;
	border-radius: 10px;
`;

const Title = styled.h1`
	font-size: 20px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	display: block;
	text-align: center;
`;

interface ChartProps {
	coinId: string;
}

interface IPrice {
	quotes: {
		USD: {
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_15m: number;
			percent_change_30m: number;
			percent_change_1h: number;
			percent_change_6h: number;
			percent_change_12h: number;
			percent_change_24h: number;
			percent_change_7d: number;
			percent_change_30d: number;
			percent_change_1y: number;
			ath_price: number;
			ath_date: string;
			percent_from_price_ath: number;
		};
	};
}

function Price({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<IPrice>(["price", coinId], () =>
		fetchCoinTickers(coinId)
	);
	return (
		<Container>
			{isLoading ? (
				<Loader>"Loading..."</Loader>
			) : (
				<>
					<Title>${data?.quotes.USD.price.toFixed(2)}</Title>
				</>
			)}
		</Container>
	);
}

export default Price;
