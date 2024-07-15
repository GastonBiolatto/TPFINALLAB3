<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><i class="fas fa-home"></i></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div>
            <form class="d-flex">
              <a class="btn btn-primary me-2" href="/Login" role="button">Login</a>
            </form>
          </div>
        </div>
      </nav>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center">Registro</h2>
          <form @submit.prevent="registerForm">
            <div class="mb-3">
              <label for="name" class="form-label">Nombre</label>
              <input v-model="name" type="text" class="form-control" id="name" placeholder="..." required autofocus>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Mail</label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="..." required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input v-model="password" type="password" class="form-control" id="password" placeholder="..." required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Registro</button>
          </form>
          <p class="mt-3 text-center">Ya tienes una cuenta? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    generateId(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    registerForm() {
      const { name, email, password } = this;

      let users = localStorage.getItem('users');
      if (!users) {
        users = [];
      } else {
        try {
          users = JSON.parse(users);
        } catch (e) {
          users = [];
        }
      }

      const isUserRegistered = users.find(user => user.email === email);
      if (isUserRegistered) {
        return alert('El usuario ya está registrado!');
      }

      const userId = this.generateId(8);
      users.push({ id: userId, name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registro Exitoso!');
      this.$router.push('/login');
    }
  }
};
</script>
  
<style scoped>
/* Estilos personalizados si es necesario */
</style>
  