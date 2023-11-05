import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ServiceManagement(props) {
	const user = useUserInfo((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (user.role != "MN" && user.role != "AD") navigate("/access-denied");
		return;
	}, []);

	return <div>ServiceManagement</div>;
}
