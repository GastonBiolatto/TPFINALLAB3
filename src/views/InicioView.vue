<template>
    <div>
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Navbar</a>
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
                            <li class="nav-item">
                                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <a class="btn " role="button" @click="logout">Cerrar sesión</a>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
        <div>

            <h1>Bienvenido, {{ currentUser.name }}</h1>
        </div>
    </div>
</template>
  
<script>
export default {
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
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
  
<style scoped>
/* Estilos personalizados si es necesario */
</style>
  