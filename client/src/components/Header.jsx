import React from "react";
import {
	BrowserRouter,
	Link,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
//
import { logo } from "../assets";

const Header = () => {
	const location = useLocation();
	return (
		<header className=" fixed top-0 z-50 w-full b">
			<div className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-3 border-y-4 border-b-[#7469ff]">
				<Link to="/">
					AI IMAGE GEN BY
					<img
						src={logo}
						alt="logo"
						className="w-28 object-contain"
					/>
				</Link>
				{location.pathname == "/" ? (
					<Link
						to="/create-post"
						className="font-inter font-medium bg-[#7469ff] text-white px-4 py-1 rounded-md"
					>
						Create
					</Link>
				) : (
					<Link
						to="/"
						className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
					>
						Home
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
