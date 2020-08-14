<template>

 <q-table
      title="Treats"

      :separator='separator'
      :data="data"
      :columns="columns"
      row-key="name"
    >
    </q-table>

</template>

<script>

export default {
  name: 'MyTable',
  props: {

    resizableColumns: {
      type: Boolean,
      default: true
    },
    separator: {
      type: String
    },

    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }

  },
  mounted () {
    if (this.$props.resizableColumns) { this.startResize() }
  },
  methods: {
    startResize () {
      // const tableElem = document.querySelector('.q-table')
      console.log()
    }
  }

}
</script>
<style>
.my_table table {
    color:blue !important;

}
</style>
