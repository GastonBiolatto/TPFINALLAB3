<template>
    <div>
    <h1>Bienvenido, {{ currentUser.name }}</h1>
    <button @click="logout">Cerrar sesión</button>
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
  