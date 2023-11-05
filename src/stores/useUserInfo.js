import { create } from "zustand";

export const useUserInfo = create((set) => ({
	user: {
		userID: "",
		email: "",
		role: "",
		username: "",
	},
	setUser: (value) => {
		set(() => ({ user: value }));
	},
}));
