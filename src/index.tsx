import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</BrowserRouter>
	</QueryClientProvider>
);
