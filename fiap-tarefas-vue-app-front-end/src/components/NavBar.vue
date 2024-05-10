<template>
  <header>
    <img src="@/assets/logo.svg" width="89" height="24px" />
    <div class="rightContent">
      <span>Olá, Admin</span>
      <a class="linkButton" @click="logoff">
        <img src="@/assets/icons/logout.svg" width="24" />
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import router from '@/router'
import { logout } from '@/services/auth'

const logoff = () => {
  logout()
  router.push('/')
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  height: 72px;
  border: 1px solid #91a3ad26;
}

.rightContent {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ed1164;
  font-size: 12px;
}
</style>
