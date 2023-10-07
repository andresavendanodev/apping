// En un archivo users.js en tu carpeta de stores
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('https://reqres.in/api/users');

        if (!response.ok) {
          throw new Error("Error al cargar los usuarios");
        }

        const data = await response.json();
        this.users = data.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
