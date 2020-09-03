<template>
<div>
   <q-drawer
   :width="800"
   v-model="showDialog"
   side="right"
   bordered
   overlay>
    <q-toolbar class="bg-grey-1">
      <q-btn color="primary" dense icon="clear" class="q-mr-sm text-white"  @click="showDialog=false"/>
      <q-toolbar-title>{{title}}</q-toolbar-title>
      <q-btn dense flat color="secondary" label="Сохранить" icon="save" class="q-mr-sm text-green" @click="btnSave"/>

       <q-fab  padding="xs" flat dense icon="more_vert" direction="down">
        <q-fab-action color="blue" text-color="white" icon="content_copy" @click="btnCopy"/>
        <q-fab-action color="grey" text-color="white" icon="print" @click="btnPrint"/>
        <q-fab-action color="red" text-color="white" icon="delete" @click="btnDelete"/>
      </q-fab>
    </q-toolbar>
    </q-drawer>
</div>
</template>
<script>
import bus from '../event-bus'
import MyDialog from '../components/MyDialog'
export default {
  name: 'MyDrawer',
  props: {
    title: {
      type: String,
      default: ''
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
  }),
  methods: {
    btnSave () {
      bus.$emit('myTableSaveRecord')
    },
    btnPrint () {
      bus.$emit('myTablePrintRecord')
    },
    btnCopy () {
      bus.$emit('myTableCopyRecord')
    },
    btnDelete () {
      this.$q.dialog({
        component: MyDialog,
        message: 'Удаляем запись?'
      }).onOk(() => {
        console.log('delete')
        bus.$emit('myTableDeleteRecord')
      })
    }
  }

}
</script>
