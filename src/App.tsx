import { ThemeProvider } from "styled-components";
import React, { useState } from "react";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme, lightTheme } from "./styles/theme";
import { BiSun, BiMoon, BiArrowBack } from "react-icons/bi";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	max-width: 480px;
	padding: 20px;
	border-radius: 15px;
	font-size: 32px;
`;

const Icon = styled.div``;

const Button = styled.div``;

function App() {
	const [darkMode, setDarkMode] = useState(true);
	const toggleMode = () => {
		setDarkMode((prev) => !prev);
	};

	let history = useHistory();
	const handleBack = () => {
		history.goBack();
	};

	return (
		<>
			<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
				<GlobalStyle />
				<Header>
					<Icon onClick={toggleMode}>
						{darkMode ? <BiMoon /> : <BiSun />}
					</Icon>
					<Button onClick={handleBack}>
						<BiArrowBack />
					</Button>
				</Header>
				<Router />
			</ThemeProvider>
		</>
	);
}

export default App;
