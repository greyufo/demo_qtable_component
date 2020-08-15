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
var startX,
  startWidth,
  $handle,
  $table,
  pressed = false
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
    this.resize()
  },

  methods: {
    resize () {
      document.addEventListener('mousemove', function (e) {
        if (pressed) {
          $handle.style.width = startWidth + (e.pageX - startX) + 'px'
        }
      })
      document.addEventListener('mouseup', function (e) {
        if (pressed) {
          $table.classList.remove('resizing')
          pressed = false
        }
      })
      const thList = document.querySelectorAll('.table-resizable th')
      thList.forEach(th => {
        th.addEventListener('mousedown', function (e) {
          $handle = this
          pressed = true
          startX = e.pageX
          startWidth = $handle.offsetWidth
          $table = $handle.closest('.table-resizable')
          $table.classList.add('resizing')
        }, true)
      })
      document.querySelector('.table-resizable thead').addEventListener('dblclick', function (e) {
        thList.forEach(th => {
          th.style.width = ''
        })
      })
    }
  }

}
</script>
<style>

.table-resizable.resizing, .table-resizable th::before {
  cursor: col-resize;
  user-select: none;
}
.table-resizable th {
  position: relative;
   max-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
