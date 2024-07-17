import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import InicioView from '../views/InicioView.vue'
import HistorialView from '../views/HistorialView.vue'
import CompraView from '../views/CompraView.vue'
import VentaView from '../views/VentaView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView  
  },
  {
    path: '/registro',
    name: 'Registro',
    component: RegistroView  
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: InicioView
  },
  {
    path: '/historial',
    name: 'Historial',
    component: HistorialView
  },
  {
    path: '/compra',
    name: 'Compra',
    component: CompraView
  },
  {
    path: '/venta',
    name: 'Venta',
    component: VentaView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
