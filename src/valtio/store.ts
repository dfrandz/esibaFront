import { proxy } from "valtio";
import counterStore from "./counter/counterStore";
import userStore from "./auth/userStore";
import roleStore from "./role/roleStore";
import filiereStore from "./filiere/filiereStore";
import niveauStore from "./niveau/niveauFiliere";

const store = proxy({
    valtioCount: counterStore,
    userStore: userStore,
    roleStore: roleStore,
    filiereStore: filiereStore,
    niveauFiliereStore: niveauStore
});

export default store