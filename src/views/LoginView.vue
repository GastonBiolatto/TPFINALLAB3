<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="text-center">Login</h2>
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="email" type="email" class="form-control" id="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                    <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
                </form>
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
        alert(`Bienvenido ${this.$store.getters.currentUser.name}`);
        this.$router.push('/inicio');
      } else {
        this.errorMessage = 'Usuario y/o contraseña incorrectos!';
      }
    }
  }
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        login() {
            try {
                const users = JSON.parse(localStorage.getItem('users')) || [];

                const validUser = users.find(users => users.email === this.email && users.password === this.password);

                if (validUser) {
                    alert(`Bienvenido ${validUser.name}`);
                    localStorage.setItem('login_success', JSON.stringify(validUser));
                    this.$router.push('/inicio');
                } else {
                    this.errorMessage = 'Usuario y/o contraseña incorrectos!';
                }
            } catch (e) {
                console.log('Error:', e);
                this.errorMessage = 'Ocurrió un error. Por favor, intente de nuevo.';
            }
        }
    }*/
}
</script>
  
<style scoped>
/* Estilos personalizados si es necesario */
</style>
  