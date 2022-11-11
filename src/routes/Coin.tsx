import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
	Link,
	Route,
	Switch,
	useLocation,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
	margin: 0 auto;
	padding: 0px 20px;
	max-width: 480px;
`;

const Header = styled.header`
	height: 15vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	display: block;
	text-align: center;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: ${(props) => props.theme.textColor};
	color: ${(props) => props.theme.bgColor};
	padding: 10px 20px;
	border-radius: 10px;
`;

const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;

const Description = styled.p`
	margin: 20px 0px;
`;

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0;
	gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	padding: 7px 0;
	border-radius: 10px;
	background-color: ${(props) => props.theme.textColor};
	color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.bgColor};
	a {
		display: block;
	}
`;

interface RouteParams {
	coinId: string;
}

// interface RouteState {
// 	name: string;
// }

interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	logo: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
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

function Coin() {
	const { coinId } = useParams<RouteParams>();

	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
		["info", coinId],
		() => fetchCoinInfo(coinId)
	);
	const { isLoading: tickersLoading, data: tickersData } =
		useQuery<PriceData>(
			["tickers", coinId],
			() => fetchCoinTickers(coinId),
			// 🔻 useQuery 3rd Argument : Object
			{
				refetchInterval: 5000,
			}
		);

	// 🔻 5. isActive Props - 지정한 경로 진입시 객체를 반환
	const priceMatch = useRouteMatch("/:coinId/price");
	const chartMatch = useRouteMatch("/:coinId/chart");

	/*
	const [loading, setLoading] = useState(true);
	const { state } = useLocation<RouteState>(); // 🔻 3-2. Link로부터 전달받은 state를 확인하는 방법
	const [info, setInfo] = useState<InfoData>();
	const [priceInfo, setPriceInfo] = useState<PriceData>();
	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			).json();
			const priceData = await await (
				await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
			).json();
			setInfo(infoData);
			setPriceInfo(priceData);
			setLoading(false);
		})();
	}, [coinId]);
*/
	const loading = infoLoading || tickersLoading;
	return (
		<Container>
			<Header>
				<Helmet>
					<title>
						{infoData?.name
							? infoData.name
							: infoLoading
							? "Loading..."
							: infoData?.name}
					</title>
				</Helmet>
				{/* <Title>Coin: {coinId}</Title> */}
				{/* <Title>{state?.name || "Loading..."}</Title> */}
				<Title>
					{infoData?.name
						? infoData.name
						: infoLoading // 정상적인 경로로 진입하지 않은 경우 실행
						? "Loading..."
						: infoData?.name}
				</Title>
			</Header>
			{loading ? (
				<Loader>"Loading..."</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol</span>
							<span>{infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price</span>
							<span>${tickersData?.quotes.USD.price}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>

					<Overview>
						<OverviewItem>
							<span>Total Supply</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>

					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>

					<Switch>
						<Route path={`/:coinId/price`}>
							<Price coinId={coinId} />
						</Route>
						<Route path={`/:coinId/chart`}>
							<Chart coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	);
}

export default Coin;
