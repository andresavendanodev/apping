<template>
  <div class="contListUser">
    <SplashScreen v-if="isLoading" />
    <h1>Lista de Usuarios</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <router-link :to="{ name: 'UserDetails', params: { id: user.id } }">
          {{ user.first_name }} {{ user.last_name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
  
<script>
import { ref, onMounted } from "vue";
import SplashScreen from "@/components/SplashScreen.vue";

export default {
  name: "UsersList",
  components: {
    SplashScreen,
  },
  setup() {
    const users = ref([]);
    const isLoading = ref(true);

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users");

        if (!response.ok) {
          throw new Error("Error al cargar los usuarios");
        }

        const data = await response.json();
        users.value = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false; // Ocultar el SplashScreen una vez que los datos se carguen o si hay un error.
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      isLoading,
    };
  },
};
</script>

<style scoped>
.contListUser {
  text-align: center;
}
ul {
  list-style: none;
  padding: 0;
}
ul li {
  margin: 12px 0;
}
</style>