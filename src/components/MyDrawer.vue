<template>
<div>
   <q-drawer :width="800"  v-model="showDialog" side="right" bordered>
    <q-toolbar class="bg-grey-1">
      <q-btn color="primary" dense icon="clear" class="q-mr-sm text-white"  @click="showDialog=false"/>
      <q-toolbar-title>Править</q-toolbar-title>
      <q-btn dense  color="secondary" label="Сохранить" icon="save" class="q-mr-sm text-white" @click="btnSave"/>

       <q-fab  padding="xs" flat dense icon="more_vert" direction="down">
        <q-fab-action color="blue" text-color="white" icon="content_copy" />
        <q-fab-action color="grey" text-color="white" icon="print" @click="btnPrint"/>
        <q-fab-action color="red" text-color="white" icon="delete" @click="btnDelete"/>
      </q-fab>
    </q-toolbar>
    </q-drawer>
</div>
</template>
<script>
import bus from '../event-bus'

export default {
  name: 'MyDrawer',
  data: () => ({
  }),
  methods: {
    btnSave () {
      bus.$emit('myTableSaveRecord')
    },
    btnPrint () {
      bus.$emit('myTablePrintRecord')
    },
    btnDelete () {
      bus.$emit('myTableDeleteRecord')
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  }
}
</script>
