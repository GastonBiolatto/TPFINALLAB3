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
    component: InicioView,
    meta: { requiresAuth: true }
  },
  {
    path: '/historial',
    name: 'Historial',
    component: HistorialView,
    meta: { requiresAuth: true }
  },
  {
    path: '/compra',
    name: 'Compra',
    component: CompraView,
    meta: { requiresAuth: true }
  },
  {
    path: '/venta',
    name: 'Venta',
    component: VentaView,
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('login_success');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login'); // Redirige a la página de login si no está autenticado
    } else {
      next(); // Continúa navegando a la ruta protegida
    }
  } else {
    next(); // Continúa navegando en cualquier otro caso
  }
});
export default router
