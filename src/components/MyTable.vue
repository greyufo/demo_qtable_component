/* eslint-disable no-unused-vars */

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
          $handle.width(startWidth + (event.pageX - startX))
        }
      })
      $(document).on({
      /*   mousemove: function (event) {
          if (pressed) {
            $handle.width(startWidth + (event.pageX - startX))
          }
        }, */
        mouseup: function () {
          if (pressed) {
            $table.removeClass('resizing')
            pressed = false
          }
        }
      }).on('mousedown', '.table-resizable th', function (event) {
        $handle = $(this)
        pressed = true
        startX = event.pageX
        startWidth = $handle.width()

        $table = $handle.closest('.table-resizable').addClass('resizing')
      }).on('dblclick', '.table-resizable thead', function () {
        $(this).find('th[style]').css('width', '')
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
