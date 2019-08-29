// Instruments
import { FULL_URL } from './config';

export const api = {
    async fetchTasks () {
        return [];
    },
    async createTask (newTaskMessage) {
        return {
            id:        Date.now(),
            message:   newTaskMessage,
            favorite:  false,
            completed: false,
            created:   new Date(),
        };
    },
    async updateTask (updatedTask) {
        return updatedTask;
    },
    async removeTask (taskId) {
        return true;
    },
    async completeAllTasks (tasks) {
        return true;
    },
};
