<template>
  <footer class="container">
    <span>© Copyright 2024. Todos os direitos reservados.</span>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar'
};
</script>

<style scoped>
.container {
  display: none;
  background-color: white;
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #333; /* Altere para a cor desejada */
  border-top: 1px solid #ddd; /* Altere para a cor desejada */

  @media screen and (min-width: 768px) { /* Altere para o ponto de interrupção desejado */
    display: flex;
  }
}
</style>
