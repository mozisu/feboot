<template>
  <div>
    <page-header></page-header>
    hello vue
    <div class="box">feater</div>
  </div>
</template>
<script>
import PageHeader from './components/Header';

export default {
  components: {
    PageHeader,
  },
};
</script>
<style>
.box {
  color: #f80;
}
</style>
