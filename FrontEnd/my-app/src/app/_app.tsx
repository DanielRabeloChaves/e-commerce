import type { AppProps } from "next/app";
import { PrimeReactProvider } from "primereact/api";
import Layout from "./layout";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<PrimeReactProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</PrimeReactProvider>
	);
}