import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet-async";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: ${(props) => props.theme.textColor};
	color: ${(props) => props.theme.bgColor};
	border-radius: 15px;
	margin-bottom: 10px;
	a {
		display: flex;
		align-items: center;
		padding: 20px;
		transition: color 0.2s ease-in;
	}
	&:hover {
		color: ${(props) => props.theme.accentColor};
	}
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
	color: ${(props) => props.theme.accentColor};
`;
/*
const coins = [
	{
		id: "btc-bitcoin",
		name: "Bitcoin",
		symbol: "BTC",
		rank: 1,
		is_new: false,
		is_active: true,
		type: "coin",
	},
];
*/

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
	/*
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState<ICoin[]>([]);
	useEffect(() => {
		(async () => {
			const response = await fetch(
				"https://api.coinpaprika.com/v1/coins",
			);
			const json = await response.json();
			setCoins(json.slice(0, 10));
			setLoading(false);
		})();
	}, []);
	 */

	return (
		<Container>
			<Helmet>
				<title>Coins</title>
			</Helmet>
			<Header>
				<Title>Coins</Title>
			</Header>
			{isLoading ? (
				<Loader>"Loading..."</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 10).map((coin) => (
						<Coin key={coin.id}>
							{/* <Link to={`${coin.id}`}> */}
							<Link
								// 🔻 3-1.Route를 통해 객체 형태의 데이터를 전달
								to={{
									pathname: `${coin.id}`,
									state: { name: coin.name },
								}}
							>
								<Img
									src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
									alt=""
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;
