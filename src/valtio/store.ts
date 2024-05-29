import { proxy } from "valtio";
import counterStore from "./counter/counterStore";
import userStore from "./auth/userStore";

const store = proxy({
    valtioCount: counterStore,
    userStore: userStore
});

export default store