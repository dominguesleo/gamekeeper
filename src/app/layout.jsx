import { Montserrat } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const montserrat = Montserrat({
	weights: [400, 700],
	styles: ["normal"],
	subsets: ["latin"]
});

export const metadata = {
	title: "GameKeeper",
	description: "Explore our extensive digital library of video games. Find the latest releases, timeless classics, and discover new favorites.",
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={montserrat.className}>
					<div className="body-content">
						{children}
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}