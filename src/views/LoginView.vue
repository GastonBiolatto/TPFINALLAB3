<template>
    <div>
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/"><i class="fas fa-home"></i></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        <form class="d-flex">
                            <a class="btn btn-primary me-2" href="/registro" role="button">Registro</a>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h2 class="text-center">Login</h2>
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input v-model="email" type="email" class="form-control" placeholder="..." id="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input v-model="password" type="password" class="form-control" placeholder="..." id="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                        <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
                    </form>
                    <p class="mt-3 text-center">No tienes una cuenta? <router-link to="/registro">Registrarse</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {


    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            const success = await this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            });

            if (success) {
                const correntUser = this.$store.getters.currentUser;

                const userId = correntUser.id;
                let wallet = localStorage.getItem(userId);

                if (!wallet) {
                    localStorage.setItem(userId, JSON.stringify({ARS:0}));
                }
                
                alert(`Bienvenido ${this.$store.getters.currentUser.name}`);
                this.$router.push('/inicio');
            } else {
                this.errorMessage = 'Usuario y/o contraseña incorrectos!';
            }
        }
    }
    
}
</script>
  
<style scoped>
</style>
  