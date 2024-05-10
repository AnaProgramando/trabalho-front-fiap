<template>
  <div class="modalContent" v-if="store.showModal">
    <Form novalidate class="modal" @submit="store.createTask">
      <h3>Adicionar uma tarefa</h3>
      <Field
        name="description"
        type="text"
        placeholder="Adicionar uma tarefa"
        autofocus
        rules="required"
      />
      <ErrorMessage name="description" />
      <Field name="due_date" type="date" placeholder="Data de conclusão" rules="required" />
      <ErrorMessage name="due_date" />

      <div class="button">
        <button type="submit">Salvar</button>
        <button @click="store.changeShowModal()">Cancelar</button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/store/Task'
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
const store = useTasksStore()

defineRule('required', (value) => {
  if (!value || !value.length) {
    return '* Campo obrigatório!'
  }
  return true
})
</script>

<style scoped>
.modalContent {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  padding: 60px;
}

.modal {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: white;
  align-items: center;
  padding: 24px 12px;
}

h3 {
  display: flex;
  flex-direction: column;
  color: #ed1164;
  text-align: center;
  margin: 0;
  padding-bottom: 18px;
}

input {
  color: #ed1164;
  border: solid 1px #ed1164;
  border-radius: 12px;
  padding: 12px;
  width: 287px;
  font-size: 14px;
  margin-bottom: 8px;
}

.button {
  display: flex;
  gap: 6px;
  padding-top: 18px;
}

.button > button:first-child {
  padding: 12px 28px;
  color: white;
  background-color: #91a3ad;
  border: none;
  border-radius: 12px;
}

.button > button:last-child {
  padding: 12px 28px;
  color: #91a3ad;
  border: none;
  border-radius: 12px;
  background-color: transparent;
  text-decoration: underline;
}

span {
  color: hsl(1, 98%, 50%);
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 1rem;
  margin-right:10rem ;
}
</style>
