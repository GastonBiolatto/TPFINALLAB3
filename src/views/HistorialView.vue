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
                            <router-link  to="/inicio" class="d-flex align-items-center p-3">
                                <i class="fas fa-home"></i>
                                <span class="ms-3 d-none d-sm-flex">Inicio</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link  to="/compra" class="d-flex align-items-center p-3">
                                <i class="fas fa-home"></i>
                                <span class="ms-3 d-none d-sm-flex">Compra</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link  to="/venta" class="d-flex align-items-center p-3">
                                <i class="fas fa-home"></i>
                                <span class="ms-3 d-none d-sm-flex">Venta</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link  to="/historial" class="d-flex align-items-center p-3">
                                <i class="fas fa-home"></i>
                                <span class="ms-3 d-none d-sm-flex">Historial</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-10 d-flex align-items-center justify-content-center">
                

            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },
    },
    watch: {
        currentUser: {
            handler(newUser) {
                this.usuario = newUser;
            },
            immediate: true
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
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