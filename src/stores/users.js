import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    selectedUserId: null,
  }),
  actions: {
    setSelectedUserId(userId) {
      this.selectedUserId = userId;
    },
  },
});
