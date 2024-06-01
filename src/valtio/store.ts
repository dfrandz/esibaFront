import { proxy } from "valtio";
import counterStore from "./counter/counterStore";
import userStore from "./auth/userStore";
import roleStore from "./role/roleStore";

const store = proxy({
    valtioCount: counterStore,
    userStore: userStore,
    roleStore: roleStore
});

export default store