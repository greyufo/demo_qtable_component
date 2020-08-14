<template>

 <q-table
      title="Treats"

      :separator='separator'
      :data="data"
      :columns="columns"
      row-key="name"
      class="table-resizable"
    >
    </q-table>

</template>

<script>
import $ from 'jquery'
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
    // if (this.$props.resizableColumns) { this.startResize() }
    console.log($(document))
  }
  /*
  methods: {
    startResize () {
      // const tableEl = document.querySelector('.q-table')
      // tableEl.addEventListener('mousemove', this.startEvent, false)
      // console.log(tableEl)
    }
  },
  startEvent (event) {
    // console.log(2)
  } */

}
// https://codepen.io/jasongardner/pen/QNOXym
</script>
<style>

.table-resizable.resizing, .table-resizable th::before {
  cursor: col-resize;
  user-select: none;
}
.table-resizable th {
  position: relative;
}
.table-resizable th::before {
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 1em;
}
.table-resizable th:last-of-type::before {
  display: none;
}
.table-resizable td {
  max-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
