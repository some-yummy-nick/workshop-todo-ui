// Instruments
import { FULL_URL } from './config';

export const api = {
    async fetchTasks () {
        const response = await fetch(FULL_URL, {
            method: 'GET',
        });
        const { data: tasks } = await response.json();

        if (response.status !== 200) {
            throw new Error('Tasks were not fetched.');
        }

        return tasks;
    },
    async createTask (newTaskMessage) {
        const response = await fetch(FULL_URL, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: newTaskMessage }),
        });

        const { data: task } = await response.json();

        if (response.status !== 200) {
            throw new Error('Task was not created.');
        }

        return task;
    },
    async updateTask (updatedTask) {
        const { id } = updatedTask;
        const response = await fetch(`${FULL_URL}/${id}`, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });
        const { data } = await response.json();

        if (response.status !== 200) {
            throw new Error('Task was not updated.');
        }

        return data;
    },
    async removeTask (taskId) {
        const response = await fetch(`${FULL_URL}/${taskId}`, {
            method: 'DELETE',
        });

        if (response.status !== 200) {
            throw new Error('Task was not deleted.');
        }
    },
    async completeAllTasks (tasks) {
        const promises = [];

        for (const task of tasks) {
            promises.push(
                fetch(`${FULL_URL}/${task.id}`, {
                    method:  'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...task, completed: true }),
                })
            );
        }
        const responses = await Promise.all(promises);
        const success = responses.every((result) => result.status === 200);

        if (!success) {
            throw new Error('Tasks were not completed');
        }
    },
};
