<template>
  <HeaderComponent />

  <main>
    <div class="buttonContent taskFilter">
      <span>Tarefas</span>
    </div>

    <div v-if="store.tasks.length === 0" class="mainView">
      <div class="empty">
        <img src="@/assets/icons/empty.svg" width="248" height="80" />
        <div>Você ainda não possui tarefas cadastradas!</div>
      </div>
    </div>

    <div v-if="store.tasks.length">
      <div
        class="buttonContent itemTask"
        :name="task.id"
        v-for="task in store.tasks"
        :key="task.name"
      >
        <div class="task">
          <div class="checked" @click="patchTask(task.id)">
            <img v-if="!task.date_of_conclusion" src="@/assets/icons/unchecked.svg" width="20" />
            <img v-if="task.date_of_conclusion" src="@/assets/icons/checked.svg" width="20" />
          </div>
          <div class="data">
            <div>
              <s v-if="task.date_of_conclusion"
                ><b>{{ task.description }}</b></s
              >
              <b v-if="!task.date_of_conclusion">{{ task.description }}</b>
            </div>
            <div>Conclusão em: {{ task.due_date }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="buttonContent" @click="store.changeShowModal()">
      <div class="addTask">
        <img src="@/assets/icons/add-icon.svg" width="24" />
        <span>Adicionar uma tarefa</span>
      </div>
    </div>
    <!--<FooterBar />-->
  </main>

  <ModalComponent />

</template>

<script setup lang="ts">
import { useTasksStore } from '@/store/Task'
import { onMounted } from 'vue'
import http from '@/api'
import ModalComponent from '@/components/ModalTask.vue'
import HeaderComponent from '@/components/NavBar.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import moment from 'moment'
import FooterBar from '@/components/FooterBar.vue';


const store = useTasksStore()

onMounted(() => getTasks())

const getTasks = async () => {
  const allTasks = await http.get('tasks')

  store.loadTasks(allTasks.data)
}

const patchTask = async (taskId: string) => {
  const taskIndex = store.tasks.findIndex((task) => task?.id === taskId)
  let dateOfConclusion = null

  if (store.tasks[taskIndex].date_of_conclusion === null) {
    dateOfConclusion = moment().format('DD/MM/Y')
  }

  await http
    .patch(`tasks/${taskId}`, {
      date_of_conclusion: dateOfConclusion
    })
    .then((response) => {
      toast(response.data, {
        theme: 'colored',
        type: 'success',
        position: 'top-center'
      })
      store.updateTaskCompletion(taskIndex, dateOfConclusion)
    })
    .catch((err) =>
      toast(err.response.data, {
        theme: 'colored',
        type: 'error',
        position: 'top-center'
      })
    )
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 18px 12px;
}

.buttonContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  height: 72px;
  border: 1px solid #91a3ad26;

  font-size: 18px;
  height: 48px;
  border-radius: 12px;
  color: #ed1164;
  background-color: #91a3ad26;
  font-weight: 600;
  border: none;
}

.buttonContent:last-child {
  margin-top: auto;
}

.addTask {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ed1164;
  font-size: 18px;
  font-weight: 600;
}

.taskFilter {
  margin-bottom: 8px;
}

.mainView {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
}

.empty {
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  gap: 12px;
}

.empty > div {
  text-align: center;
  color: #ed1164;
  font-weight: 600;
  font-size: 14px;
}

.itemTask {
  margin-top: 8px;
  margin-bottom: 8px;
}

.task {
  display: flex;
  gap: 12px;
  color: #575757;
  align-items: center;
}

.task > .data > div:first-child {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
}

.task > .data > div:last-child {
  font-size: 12px;
  font-weight: 400;
}
</style>
