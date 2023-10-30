import { create } from "zustand";

export const useUserInfo = create((set) => ({
	user: {
		email: "",
		role: "",
		username: "",
	},
	setUser: (value) => {
		set(() => ({ user: value }));
	},
}));
