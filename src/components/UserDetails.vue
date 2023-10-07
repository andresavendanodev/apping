<template>
  <div class="contUserDetails">
    <h1>Detalles del Usuario</h1>
    <div v-if="isLoading">
      <p>Cargando detalles del usuario...</p>
      <SpinnerLoad></SpinnerLoad>
    </div>
    <div v-else-if="user">
      <div class="card">
        <img :src="user.avatar" alt="Avatar" />
        <h2>{{ user.first_name }} {{ user.last_name }}</h2>
        <p>{{ user.email }}</p>
      </div>
    </div>
    <div v-else>
      <p>No se encontraron detalles del usuario.</p>
    </div>
  </div>
</template>
  
<script>
import SpinnerLoad from "./SpinnerLoad.vue";
import { useUsersStore } from "../stores/users";

export default {
  name: "UserDetails",
  components: {
    SpinnerLoad
  },
  data() {
    return {
      user: null,
      isLoading: true,
    };
  },
  async created() {
    // console.log("Pinia");
    const useStore = useUsersStore() ;
    // const userId = this.$route.params.id;
    const userId = useStore.selectedUserId;
    // console.log(userId);

    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`);

      if (!response.ok) {
        throw new Error("Error al cargar los detalles del usuario");
      }

      const data = await response.json();
      this.user = data.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
  
<style>
.contUserDetails {
  text-align: center;
}
.card {
  box-shadow: -1px 0px 17px 0px rgba(176, 176, 176, 0.9);
  border-radius: 4px;
  padding: 24px;
  margin-top: 32px;
}
</style>
  