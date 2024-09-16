<template>
    <div class="container-fluid bg-secondary-subtle full-screen-container">
        <div class="row">
            <div class="col ">
                <nav class="navbar navbar-expand-lg bg-body-tertiary ">
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
                                <a class="btn " role="button" @click="logout">Cerrar sesión</a>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="row todo-alto">
            <div class="col-2 d-flex align-items-center justify-content-center">
                <div class="d-flex gap-4 ">
                    <ul class="list-group d-flex list-group-flush">
                        <li class="list-group-item">
                            <router-link to="/inicio" class="d-flex align-items-center p-3">
                                <i class="fas fa-home"></i>
                                <span class="ms-3 d-none d-sm-flex">Inicio</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to="/compra" class="d-flex align-items-center p-3">
                                <i class="fas fa-home"></i>
                                <span class="ms-3 d-none d-sm-flex">Compra</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to="/venta" class="d-flex align-items-center p-3">
                                <i class="fas fa-home"></i>
                                <span class="ms-3 d-none d-sm-flex">Venta</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to="/historial" class="d-flex align-items-center p-3">
                                <i class="fas fa-home"></i>
                                <span class="ms-3 d-none d-sm-flex">Historial</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-6 d-flex justify-content-center align-items-center ">
                <div class="table-responsive" style="height: 600px; overflow-y: auto;">
                    <table class="table table-striped table-hover table-bordered">
                        <thead class="table-dark">
                            <tr>
                                <th>Logo</th>
                                <th>Moneda</th>
                                <th>Simbolo</th>
                                <th>Precion (ars)</th>
                                <th>Elegir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="coin in coins" :key="coin.id">
                                <td>
                                    <img :src="coin.image" alt="coin image" width="30" height="30">
                                </td>
                                <td>{{ coin.name }}</td>
                                <td>{{ coin.symbol }}</td>
                                <td>{{ coin.current_price }}</td>
                                <td><button class="btn btn-sm btn-primary"
                                        @click="seleccionarMoneda(coin)">seleccionar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-4 d-flex justify-content-center align-items-center">
                <div class="card" style="width: 18rem" v-if="monedaSeleccionada">
                    <img :src="monedaSeleccionada.image" alt="coin image" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">{{ monedaSeleccionada.name }}</h5>
                        <p class="card-text">
                            Simbolo: {{ monedaSeleccionada.symbol }} <br>
                            Precio: {{ monedaSeleccionada.current_price }} ARS
                        </p>
                        <div class="mb-3">
                            <label for="cantidad" class="form-label">Cantidad</label>
                            <input type="number" class="form-control" id="cantidad" v-model.number="cantidad">
                        </div>
                        <button class="btn btn-success" @click="comprarMoneda">Comprar</button>
                    </div>
                </div>
                <div v-else>
                    <p>Selecciona una moneda para ver los detalles aquí</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            coins: [],
            monedaSeleccionada: null,
            cantidad: 0,
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },

    },
    mounted() {
        this.cargarDatos();
    },

    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        },
        async cargarDatos() {
            try {
                const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars");
                this.coins = response.data;
            } catch (error) {
                console.error('Error al obtener los datos de CoinGecko:', error);
            }
        },
        seleccionarMoneda(coin) {
            this.monedaSeleccionada = coin;
            this.cantidad = 0;
        },
        async comprarMoneda() {
        const currentUser = this.currentUser;
        const userId = currentUser.id;
        let monedero = localStorage.getItem(userId);

        if (!monedero) {
            return alert('No se encontró información del usuario.');
        }

        monedero = JSON.parse(monedero);

        const totalPrice = this.monedaSeleccionada.current_price * this.cantidad;

        if (totalPrice > monedero.ARS) {
            return alert('Saldo insuficiente para la compra.');
        }

        // Actualizar el saldo en el localStorage
        monedero.ARS -= totalPrice;

        // Verificar si el objeto de monedas ya existe en el localStorage
        if (!monedero.monedas) {
            monedero.monedas = {};
        }

        // Agregar o actualizar la moneda en el objeto del localStorage
        if (monedero.monedas[this.monedaSeleccionada.id]) {
            monedero.monedas[this.monedaSeleccionada.id] += this.cantidad;
        } else {
            monedero.monedas[this.monedaSeleccionada.id] = this.cantidad;
        }

        // Guardar el objeto modificado en el localStorage
        localStorage.setItem(userId, JSON.stringify(monedero));

        // Resetear selección
        this.monedaSeleccionada = null;
        this.cantidad = 0;

        alert('Compra realizada con éxito!');
    },
    }
};



</script>

<style>
.full-screen-container {
    height: 100vh;
}

.todo-alto {
    height: 85%;
}
</style>