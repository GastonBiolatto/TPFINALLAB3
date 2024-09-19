<template>
    <div class="container-fluid bg-secondary-subtle full-screen-container">
        <div class="row">
            <div class="col ">
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
                                <a class="btn " role="button" @click="logout">Cerrar sesión</a>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="row todo-alto">

            <div class="col-8 d-flex align-items-center justify-content-center">
                <div class="container-fluid">
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
                                <td><button class="btn btn-sm btn-primary" @click="venderMoneda(coin)">Vender</button>
                                </td>
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
            <div class="col-4 d-flex justify-content-center align-items-center">
                <div class="card" style="width: 18rem" v-if="monedaSeleccionada">
                    <img :src="monedaSeleccionada.image" alt="coin image" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">{{ monedaSeleccionada.name }}</h5>
                        <p class="card-text">
                            Símbolo: {{ monedaSeleccionada.symbol }} <br>
                            Precio: {{ monedaSeleccionada.current_price }} ARS
                        </p>
                        <div class="mb-3">
                            <label for="cantidad" class="form-label">Cantidad a vender</label>
                            <input type="number" class="form-control" id="cantidad" v-model.number="cantidad" min="0"
                                max="monedaSeleccionada.quantity">
                        </div>
                        <button class="btn btn-danger" @click="venderMonedaConfirmado">Vender</button>
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
            events: [],
            monedas: [],
            monedasConValor: [],
            totalARS: 0,
            monedaSeleccionada: null,
            cantidad: 0,
        };
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
                this.events = response.data;
                this.cargarMonedero();
            } catch (error) {
                console.error('Error al obtener los datos de CoinGecko:', error);
            }
        },
        cargarMonedero() {
            const userId = this.currentUser.id;
            let monedero = localStorage.getItem(userId);

            if (monedero) {
                monedero = JSON.parse(monedero);
                this.monedas = monedero.monedas || {};
                this.actualizarMonedasConValor();
            }
        },
        actualizarMonedasConValor() {
            this.monedasConValor = this.events
                .map(coin => {
                    const cantidad = this.monedas[coin.id] || 0;
                    const totalValue = cantidad * coin.current_price;
                    return {
                        ...coin,
                        cantidad: cantidad,
                        totalValue: totalValue.toFixed(4) 
                    };
                })
                .filter(coin => coin.cantidad > 0); 

            this.totalARS = this.monedasConValor
                .reduce((total, coin) => total + parseFloat(coin.totalValue), 0)
                .toFixed(2);
        },
        venderMoneda(coin) {
            this.monedaSeleccionada = coin;
            this.cantidad = 0;
        },
        venderMonedaConfirmado() {
            if (this.cantidad < 0.001 || this.cantidad > this.monedaSeleccionada.cantidad) {
                alert('Cantidad inválida. Por favor, ingrese una cantidad válida.');
                return;
            }

            const valorVenta = this.cantidad * this.monedaSeleccionada.current_price;
            this.monedas[this.monedaSeleccionada.id] -= this.cantidad;

            if (this.monedas[this.monedaSeleccionada.id] <= 0) {
                delete this.monedas[this.monedaSeleccionada.id];
            }

            let monedero = JSON.parse(localStorage.getItem(this.currentUser.id)) || {};

            monedero.ARS = (monedero.ARS || 0) + valorVenta;

            this.historialDeTransaccion(monedero, this.monedaSeleccionada, this.cantidad, valorVenta, "venta");

            localStorage.setItem(this.currentUser.id, JSON.stringify({ monedas: this.monedas, ARS: monedero.ARS, historial: monedero.historial }));

            this.actualizarMonedasConValor();

            this.monedaSeleccionada = null;
            this.cantidad = 0;
        },
        historialDeTransaccion(monedero, moneda, cantidad, totalPrecio, tipo) {
            if (!monedero.historial) {
                monedero.historial = [];
            }
            const transaccion = {
                tipo: tipo,
                id: moneda.id,
                nombre: moneda.symbol,
                cantidad: cantidad,
                valorARS: totalPrecio.toFixed(2),
                fecha: new Date().toLocaleString(),
            }
            monedero.historial.push(transaccion);

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
