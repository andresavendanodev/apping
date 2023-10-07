<template>
  <div class="contListUser">
    <SplashScreen v-if="isLoading" />
    <h1>Lista de Usuarios</h1>
    <ul>
      <li v-for="user in users" :key="user.id" @click="goToUserDetails(user.id)" >
        {{ user.first_name }} {{ user.last_name }}
      </li>
    </ul>
  </div>
</template>
  
<script>
import { ref, onMounted } from "vue";
import SplashScreen from "@/components/SplashScreen.vue";
import { useUsersStore } from "../stores/users";
import { useRouter } from "vue-router";

export default {
  name: "UsersList",
  components: {
    SplashScreen,
  },
  setup() {
    const users = ref([]);
    const isLoading = ref(true);
    const useStore = useUsersStore() ;
    const router = useRouter();

    const goToUserDetails = (userId) => {
      console.log(userId);
      useStore.setSelectedUserId(userId);
      router.push("/user");
    };
    
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
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      isLoading,
      goToUserDetails
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
  cursor: pointer;
}
ul li:hover {
  background-color: rgba(22, 163, 18, 0.418);
}
</style>