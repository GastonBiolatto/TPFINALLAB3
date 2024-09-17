<template>
    <div class="container-fluid bg-secondary-subtle full-screen-container">
        <div class="row">
            <div class="col">
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/"><i class="fas fa-home"></i></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                            </ul>
                            <form class="d-flex">
                                <p>posee $ {{ monedero.ARS }} <a class="btn" role="button" @click="agregaArs">agregar ars</a></p>
                            </form>
                            <button type="button" class="d-flex btn btn-outline-danger" @click="logout">Cerrar sesión</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="row todo-alto">
            <div class="col-2 d-flex align-items-center justify-content-center">
                <div class="d-flex gap-4">
                    <ul class="list-group d-flex list-group-flush">
                        <li class="list-group-item">
                            <router-link to="/inicio" class="d-flex align-items-center p-3">
                                <i class="fas fa-home"></i>
                                <span class="ms-3 d-none d-sm-flex">Inicio</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to="/compra" class="d-flex align-items-center p-3">
                                <i class="fas fa-shopping-cart"></i>
                                <span class="ms-3 d-none d-sm-flex">Compra</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to="/venta" class="d-flex align-items-center p-3">
                                <i class="fas fa-exchange-alt"></i>
                                <span class="ms-3 d-none d-sm-flex">Venta</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to="/historial" class="d-flex align-items-center p-3">
                                <i class="fas fa-history"></i>
                                <span class="ms-3 d-none d-sm-flex">Historial</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-10 d-flex align-items-center justify-content-center">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Cripto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Valor en pesos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Completar con los datos de las criptomonedas -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            events: [], // Datos de las criptomonedas desde la API
            usuario: null,
            monedero: { ARS: 0 },
        };
    },

    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        }
    },

    watch: {
        currentUser: {
            handler(newUser) {
                this.usuario = newUser;
                this.obtenerMonedero(); // Actualiza el monedero cuando cambia el usuario
            },
            immediate: true
        }
    },

    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        },

        async obtenerMonedero() {
            const userId = this.currentUser ? this.currentUser.id : null;
            if (!userId) return;

            let monedero = localStorage.getItem(userId);
            if (monedero) {
                this.monedero = JSON.parse(monedero);  // Actualiza el estado reactivo
            } else {
                this.monedero = { ARS: 0 };
            }
        },

        agregaArs() {
            const userId = this.currentUser ? this.currentUser.id : null;
            if (!userId) return;

            let monedero = localStorage.getItem(userId);
            if (monedero) {
                monedero = JSON.parse(monedero);
            } else {
                monedero = { ARS: 0 };
            }
            monedero.ARS += 100;
            localStorage.setItem(userId, JSON.stringify(monedero));
            this.monedero = monedero;  // Actualiza el estado reactivo
        },
    },

    async created() {
        try {
            let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars');
            this.events = response.data;
            this.obtenerMonedero();  // Inicializa monedero al crear el componente
        } catch (error) {
            console.error('Error fetching cryptocurrency data:', error);
        }
    }
}
</script>

<style>
.full-screen-container {
    height: 100vh;
}

.todo-alto {
    height: 85%;
}
</style>
