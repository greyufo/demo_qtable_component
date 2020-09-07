
<template>
  <q-layout view="lHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
        dense
        flat
        round icon="menu"
        @click="left = !left" />
        <q-toolbar-title>
          Пример таблицы
        </q-toolbar-title>
        <q-btn
        dense
        flat
        :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="toggleFullscreen" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
    </q-drawer>
    <my-drawer :showDialog="right" title="Новый пользователь"/>
    <q-page-container class="flex flex-center">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          Пример
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import MyDrawer from '../components/MyDrawer'
import bus from '../event-bus'
export default {
  components: {
    MyDrawer
  },
  data: () => ({

    left: false,
    right: false,
    fullscreen: () => this.$q.fullscreen.isActive

  }),
  methods: {
    toggleFullscreen () {
      this.$q.fullscreen.toggle()
    },
    saveRecord () {
      this.right = false
      this.$q.notify({ message: 'Запись сохранена', color: 'green' })
    },
    printRecord () {
      this.$q.notify({ message: 'Печать', color: 'gray' })
    },
    deleteRecord () {
      this.right = false
      this.$q.notify({ message: 'Запись удалена!', color: 'green' })
    }

  },
  created () {
    bus.$on('myTableSaveRecord', this.saveRecord)
    bus.$on('myTablePrintRecord', this.printRecord)
    bus.$on('myTableDeleteRecord', this.deleteRecord)
  }
}
</script>
