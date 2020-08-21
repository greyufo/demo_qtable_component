<template>
<q-layout view="lhh LpR lff" container style="height: 1080px" class="shadow-1 rounded-borders">
 <q-table
      dense
      :separator='separator'
      :data="data"
      :columns="columns"
      :visible-columns="visibleColumns"
      :selected.sync="selectedRows"
      selection="multiple"
      row-key="name"
      class="table-resizable my-sticky-header-table"
      :pagination.sync="pagination"
      hide-pagination
    >
  <template v-slot:top-left>
          <q-input  dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" ></q-icon>
            </template>
          </q-input>
  </template>
  <template v-slot:top-right>
  <q-btn color="secondary" icon="add" @click='newItem' label="Добавить" />
   <q-btn-dropdown
      v-show = "show_settings"
      icon="settings"
      class="glossy q-ml-lg"
      color="green"
      label="Настройка"
    >
     <q-list>
        <q-item clickable v-close-popup @click="saveSettings">
          <q-item-section avatar>
            <q-avatar  icon = "save" color="green" text-color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Сохранить настройки</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="onResizible">
          <q-item-section avatar>
            <q-avatar  icon = "multiple_stop" color="blue" text-color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Включить изменение ширины</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item-label header >
                Список столбцов
              </q-item-label>
        <q-item v-for="(col,key) in columns" :key="key">
        <q-item-section>
        <q-checkbox size="sm" :val="col.name" :label="col.label" v-model = "visibleColumns"/>
        </q-item-section>
      </q-item>
      </q-list>
  </q-btn-dropdown>
  <q-btn-dropdown
      icon="menu_open"
      class="glossy q-ml-lg"
      color="primary"
      label="Команды"
    >
      <q-list>
        <q-item clickable v-close-popup @click="setSelectable">
          <q-item-section avatar>
            <q-avatar :icon = "icon_check_box" color="blue" text-color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Групповые операции</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :disable="!deletable" clickable v-close-popup @click="deleteItem">
          <q-item-section avatar>
            <q-avatar icon="delete" color="red" text-color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Удалить запись</q-item-label>
          </q-item-section>
        </q-item>
        <q-item  clickable v-close-popup @click="exportTable" a>
          <q-item-section avatar>
            <q-avatar icon="cloud_download" color="orange" text-color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Экспортировать таблицу</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="printTable">
          <q-item-section avatar>
            <q-avatar icon="print" color="grey" text-color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Печать таблицы</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="settingsTable">
          <q-item-section avatar>
            <q-avatar icon="settings" color="green" text-color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Настройка таблицы</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
 </template>
 <template  v-slot:header="props">
        <q-tr :props="props">
          <q-th v-show="selectable" align="left" style="max-width:none;width:50px">
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
            <q-td v-show="selectable"><q-checkbox v-model="props.selected"/></q-td>
            <q-td v-for="(cell,key) in props.row" :props="props" :key="key" >{{cell}}</q-td>
          </q-tr>
        </template>
    </q-table>
      <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="md">
      </q-pagination>
     </div>
<!--
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

-->
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
  data: () => ({
    selectedRows: [],
    visibleColumns: [],
    filter: '',
    show_settings: false,
    show_dialog: false,
    deletable: false,
    selectable: true,
    icon_check_box: 'check_box',
    pagination: {
      sortBy: 'desc',
      descending: false,
      page: 2,
      rowsPerPage: 5
      // rowsNumber: 20
    }
  }),
  computed: {
    pagesNumber () {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage)
    }
  },
  mounted () {
    if (this.resizableColumns) { this.resize() }
    this.visibleColumns = this.columns.map(e => e.name)
  },
  watch: {
    selectedRows: function (val) {
      this.deletable = val.length > 0
    },
    selectable: function (val) {
      this.icon_check_box = !val ? 'check_box' : 'check_box_outline_blank'
      if (!val) this.selectedRows = []
    }
  },
  methods: {
    newItem () {
      console.log('Новая запись')
    },
    deleteItem () {
      console.log('Удалить запись')
    },
    printTable () {
      console.log('Печать таблицы')
    },
    exportTable () {
      console.log('Экспорт таблицы')
    },
    settingsTable () {
      this.show_settings = !this.show_settings
    },
    setSelectable () {
      this.selectable = !this.selectable
    },
    onResizible () {
      console.log('Изменение столбцов')
    },
    saveSettings () {
      console.log('Сохраняем настройки')
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
  },
  props: {
    resizableColumns: {
      type: Boolean,
      default: true
    },
    separator: {
      type: String
    },
    visColumns:
    {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }

  }

}
</script>

<style>
.table-resizable.resizing {
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
  cursor: col-resize;
  user-select: none;
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
.my-sticky-header-table {
  /* height or max-height is important */
  height: 450px;
  /* this is when the loading indicator appears */
}
.my-sticky-header-table .q-table__top,
.my-sticky-header-table .q-table__bottom,
.my-sticky-header-table thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: #efefef;
}
.my-sticky-header-table thead tr th {
  position: sticky;
  z-index: 1;
}
.my-sticky-header-table thead tr:first-child th {
  top: 0;
}
.my-sticky-header-table.q-table--loading thead tr:last-child th {
  /* height of all previous header rows */
  top: 100px;
}

</style>
