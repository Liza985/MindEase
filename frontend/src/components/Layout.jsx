import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			<main style={{ minHeight: "70vh", marginTop: "80px" }}>{children}</main>
		</div>
	);
};

export default Layout;
