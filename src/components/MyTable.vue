<template>
<q-layout view="lhh LpR lff" container style="height: 500px" class="shadow-1 rounded-borders">
 <q-table
      dense
      :separator='separator'
      :data="data"
      :columns="columns"
      :selected.sync="selectedRows"
      selection="multiple"
      row-key="name"
      class="table-resizable"
    >
  <template v-slot:top>
          <q-input  dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" ></q-icon>
            </template>
          </q-input>
  </template>
 <template v-slot:header="props">
        <q-tr :props="props">
          <q-th align="left" style="max-width:none;width:50px">
            <q-checkbox v-model="props.selected" >
              <q-tooltip anchor="center left" self="center right" :delay="1000">
              Снять/установить выделения на текущей странице
              </q-tooltip>
            </q-checkbox>
           </q-th>
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
       <template v-slot:body="props">
          <q-tr :props="props">
            <q-td><q-checkbox v-model="props.selected"></q-checkbox></q-td>
            <q-td v-for="(cell,key) in props.row" :props="props" :key="key" >{{cell}}</q-td>
          </q-tr>
        </template>
    </q-table>
      <q-page-sticky position="top-right" :offset="[0, 0]">
        <div>
           <q-tooltip anchor="center left" self="center right" :delay="1000">
          Доступные команды
        </q-tooltip>
        <q-fab
              icon="menu_open"
              direction="down"
              color="accent"
            >
              <q-fab-action @click="show_dialog = true" color="primary" icon="add">
               <q-tooltip anchor="center left" self="center right" :delay="1000">
          Добавить новую запись
        </q-tooltip>
              </q-fab-action>
              <q-fab-action @click="onClick" color="secondary" icon="cloud_download">
                <q-tooltip anchor="center left" self="center right" :delay="1000">
          Экспортировать таблицу
        </q-tooltip>
              </q-fab-action >
          <q-fab-action @click="onClick" color="blue" icon="check_box">
           <q-tooltip anchor="center left" self="center right" :delay="1000">
          Влючить режим отметки записей
        </q-tooltip>
        </q-fab-action>

          <q-fab-action disabled @click="onClick" color="red" icon="delete">
                <q-tooltip anchor="center left" self="center right" :delay="1000">
          Удалить отмеченные записи
        </q-tooltip>
              </q-fab-action>
            <q-fab-action  @click="onClick" color="green" icon="view_column">
                <q-tooltip anchor="center left" self="center right" :delay="1000">
          Настройка столбцов
        </q-tooltip>
              </q-fab-action>

          </q-fab>
           </div>

          </q-page-sticky>
</q-layout>
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
  data () {
    return {
      selectedRows: [],
      resizableColumns: false,
      filter: '',
      show_dialog: false
    }
  },
  mounted () {
    if (this.resizableColumns) { this.resize() }
  },

  methods: {
    onClick () {

    },
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
