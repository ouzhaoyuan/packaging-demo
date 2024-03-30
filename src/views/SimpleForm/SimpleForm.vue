<template>
  <form @submit.prevent="submitForm()">
    <label for="text">Text:</label>
    <input type="text" id="text" v-model="form.text" />

    <label for="email">Email:</label>
    <input type="email" id="email" v-model="form.email" />

    <label for="password">Password:</label>
    <input type="password" id="password" v-model="form.password" />

    <label for="number">Number:</label>
    <input type="number" id="number" v-model.number="form.number" />

    <label for="date">Date:</label>
    <input type="date" id="date" v-model="form.date" />

    <label for="checkbox">Checkbox:</label>
    <input type="checkbox" id="checkbox" v-model="form.checkbox" />

    <label for="radio">Radio:</label>
    <input type="radio" id="radio" v-for="item in list" :key="item.id" v-model="form.radio" :value="item.title" > 

    <label for="select">Select:</label>
    <select id="select" v-model="form.select">
      <option :value="item.title" v-for="item in list" :key="item.id">{{ item.title }}</option>
    </select>

    <button type="submit" id="btn" @click="submitForm">Submit</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
interface List {
  id: string
  title: string
}
const list = ref<List[]>([])
const list2 = ref<List[]>([])
const form = reactive({
  text: '',
  email: '',
  password: '',
  number: 0,
  date: '',
  checkbox: false,
  radio: '',
  select: ''
})

async function init() {
  list2.value = await fetchData2()
 list.value = await fetchData()
}
init()
async function fetchData() {
  const response = await [{ id: '1', title: 'title1' }, { id: '2', title: 'title2' }]
  const data = await response
  return data;
}


async function fetchData2() {
  const response = await [{ id: '1', title: 'title1' }, { id: '2', title: 'title2' }]
  const data = await response
  return data;
}


 function submitForm() {
  return {id:1}
}
</script>
