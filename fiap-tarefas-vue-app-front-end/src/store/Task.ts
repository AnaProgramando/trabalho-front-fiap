import { defineStore } from 'pinia'
import http from '@/api'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import moment from 'moment'

interface TaskObject {
  id: string
  description: string
  due_date: string
  date_of_conclusion: string | null
}

export type RootState = {
  tasks: TaskObject[]
  showModal: boolean
}

export const useTasksStore = defineStore('tasks', {
  state: () =>
    ({
      tasks: [],
      showModal: false
    }) as RootState,
  actions: {
    changeShowModal() {
      this.showModal = !this.showModal
    },
    loadTasks(tasks: TaskObject[]) {
      this.tasks = tasks
    },
    addTask(task: TaskObject) {
      this.tasks.push(task)
    },
    updateTaskCompletion(taskIndex: number, dateOfConclusion: string) {
      this.tasks[taskIndex].date_of_conclusion = dateOfConclusion
    },
    async createTask(formData: any) {
      formData.due_date = moment(formData.due_date).format('DD/MM/Y')

      try {
        const response = await http.post('tasks', formData)
        toast(response.data.message, {
          theme: 'colored',
          type: 'success',
          position: 'top-center'
        })
        formData.id = response.data.taskId
        formData.date_of_conclusion = null
        this.addTask(formData)
        this.toggleModal()
      } catch (error) {
        toast(error.response.data, {
          theme: 'colored',
          type: 'error',
          position: 'top-center'
        })
      }
    }
  }
})
