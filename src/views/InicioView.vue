<template>
    <div class="container-fluid bg-secondary-subtle full-screen-container">
        <div class="row">
            <div class="col">
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item list-group-item">
                                    <router-link to="/inicio" class="d-flex align-items-center p-3">
                                        <i class="fas fa-home"></i>
                                        <span class="ms-3 d-none d-sm-flex">Inicio</span>
                                    </router-link>
                                </li>
                                <li class="nav-item list-group-item">
                                    <router-link to="/compra" class="d-flex align-items-center p-3">
                                        <i class="fas fa-shopping-cart"></i>
                                        <span class="ms-3 d-none d-sm-flex">Compra</span>
                                    </router-link>
                                </li>
                                <li class="nav-item list-group-item">
                                    <router-link to="/venta" class="d-flex align-items-center p-3">
                                        <i class="fas fa-exchange-alt"></i>
                                        <span class="ms-3 d-none d-sm-flex">Venta</span>
                                    </router-link>
                                </li>
                                <li class="nav-item list-group-item">
                                    <router-link to="/historial" class="d-flex align-items-center p-3">
                                        <i class="fas fa-history"></i>
                                        <span class="ms-3 d-none d-sm-flex">Historial</span>
                                    </router-link>
                                </li>
                            </ul>
                            <form class="d-flex">
                                <p>$ {{ monedero.ARS.toFixed(2) }} <a class="btn" role="button"
                                        @click="agregaArs">agregar ars </a></p>
                            </form>
                            <button type="button" class="d-flex btn btn-outline-danger" @click="logout">Cerrar
                                sesión</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="row todo-alto">
            <div class="col-12 d-flex align-items-center justify-content-center">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Nombre</th>
                            <th>Símbolo</th>
                            <th>Cantidad</th>
                            <th>Valor en ARS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="coin in monedasConValor" :key="coin.id">
                                <td><img :src="coin.image" alt="Logo" width="30" height="30"></td>
                                <td>{{ coin.name }}</td>
                                <td>{{ coin.symbol }}</td>
                                <td>{{ coin.cantidad }}</td>
                                <td>{{ coin.totalValue }}</td>
                            </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                                <td colspan="4" class="text-end"><strong>Total ARS:</strong></td>
                                <td>{{ totalARS }}</td>

                            </tr>
                    </tfoot>
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
            monedero: { ARS: 0, monedas: {} }, // Cambié monedas a un objeto para mapear ids

            monedasConValor: [],
            totalARS: 0
        };
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        }
    },
    mounted() {
        this.cargarDatos();
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
        async cargarDatos() {
            try {
                let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars');
                this.events = response.data;
                this.obtenerMonedero();
            } catch (error) {
                console.error('Error al obtener los datos de CoinGecko:', error);
            }
        },
        async obtenerMonedero() {
            const userId = this.currentUser.id;
            let monedero = localStorage.getItem(userId);

            if (monedero) {
                this.monedero = JSON.parse(monedero); 
                this.actualizaMonedasConValor();
            } else {
                this.monedero = { ARS: 0, monedas: {} }; // Inicializa monedas como un objeto vacío
            }
        },
        actualizaMonedasConValor() {
            this.monedasConValor = this.events.map(coin => {
                const cantidad = this.monedero.monedas[coin.id] || 0; // Usa this.monedero.monedas
                const totalValue = cantidad * coin.current_price;
                return {
                    ...coin, 
                    cantidad, 
                    totalValue: totalValue.toFixed(4) };
            })
            .filter(coin => coin.cantidad > 0);
            this.totalARS = this.monedasConValor
            .reduce((total, coin) => total + parseFloat(coin.totalValue), 0)
            .toFixed(2);
        },

        agregaArs() {
            const userId = this.currentUser ? this.currentUser.id : null;
            if (!userId) return;

            let monedero = localStorage.getItem(userId);
            if (monedero) {
                monedero = JSON.parse(monedero);
            } else {
                monedero = { ARS: 0, monedas: {} }; // Inicializa monedas como un objeto vacío
            }
            monedero.ARS += 100;
            localStorage.setItem(userId, JSON.stringify(monedero));
            this.monedero = monedero;  // Actualiza el estado reactivo
            this.actualizaMonedasConValor(); // Actualiza el valor total y la tabla
        },
    },
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
