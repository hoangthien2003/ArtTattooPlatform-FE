import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ServiceManagement(props) {
	const { role } = props;
	const navigate = useNavigate();

	useEffect(() => {
		if (role != "MN" && role != "AD") navigate("/access-denied");
		return;
	}, []);

	return <div>ServiceManagement</div>;
}
