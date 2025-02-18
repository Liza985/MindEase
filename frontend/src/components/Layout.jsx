import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<div>
			{/* <Header /> */}
			<main style={{ minHeight: "70vh" }}>{children}</main>
		</div>
	);
};

export default Layout;
