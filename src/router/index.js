import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
//import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Suiviuser from "../views/Suiviuser.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/dashboard-default",
    name: "Tableau de bord",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Suivi Taxations",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Gestionnaires des postes",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Paramètres systèmes",
    component: VirtualReality,
  },
  {
    path: "/suiviuser",
    name: "Monitoring Connexion",
    component: Suiviuser,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
