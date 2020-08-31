<template>
<q-layout view="lhh LpR lff" container style="height: 1080px" class="shadow-1 rounded-borders">
 <q-table
      :data="data"
      :columns="columns"
      :visible-columns="visibleColumns"
      :selected.sync="selectedRows"
      selection="multiple"
      row-key="name"
      :class="className"
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
            <q-avatar  icon = "sync_alt" color="blue" text-color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{onoff}} изменение ширины</q-item-label>
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
          <!-- max-width:none обязательно для чекбосов в первом столбце, чтобы плотнее были -->
          <q-th v-show="selectable" align="left" class="unresisible" style="max-width:none;width:1px">
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
import bus from '../event-bus'
export default {
  name: 'MyTable',
  data: () => ({
    onoff: 'Включить',
    selectedRows: [], // список выделенных строк
    visibleColumns: [], // перечень столбцов для отображения
    sortableColumns: [], // список имен столбцов, которые сортируются
    resizingColumn: {}, // экземпляр TH, который изменяем
    enableResizible: false, // Собственно включение или нет ресайзинга
    className: 'my-sticky-header-table', // класс для таблицы
    startX: 0, // стартовая позиция начала ресайзинга при клике
    startWidth: 0, // стартовая ширина изменяемого столбца
    sortable: false,
    filter: '',
    show_settings: false, // показать кнопку настройки
    show_dialog: false,
    deletable: false, // есть возможность удаления, когда выбраны какие-то строки
    selectable: false, // включается режим выбора строк
    icon_check_box: 'check_box', // иконка для кнопки включения режима выбора
    pagination: { // пагинатор
      sortBy: 'desc', // по какому столбцу сортироать
      descending: false, // направление
      page: 2, // какая траница
      rowsPerPage: 5 // сколько строк на странице
      // rowsNumber: 20
    }
  }),
  computed: {
    pagesNumber () {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage)
    }
  },
  mounted () {
    // временно, заполнение списка отображаемых столбцов
    this.visibleColumns = this.columns.map(e => e.name)
  },
  watch: {
    enableResizible: function (val) {
      if (val) {
        this.onoff = 'Выключить'
        this.resizeableTable()
      } else {
        this.unresizeableTable()
        this.onoff = 'Включить'
      }
    },

    selectedRows: function (val) {
      this.deletable = val.length > 0 // если выбрана хоть одна строка
    },
    selectable: function (val) {
      this.icon_check_box = !val ? 'check_box' : 'check_box_outline_blank' // меняем иконку у кнопки
      if (!val) this.selectedRows = [] // очищаем выбор
    }
  },
  methods: {
    newItem () {
      console.log('Новая запись')
      bus.$emit('myTableNewRecord')
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
      this.enableResizible = !this.enableResizible
    },
    saveSettings () {
      console.log('Сохраняем настройки')
    },
    showNotif (message, color, icon) {
      this.$q.notify({
        message,
        color,
        icon
      })
    },
    mouseOver (e) {
      e.srcElement.style.backgroundColor = 'blue'
    },
    mouseOut (e) {
      e.srcElement.style.backgroundColor = 'silver'
    },
    mouseUp (e) {
      this.resizing = false
    },
    mouseDown (e) {
      this.resizingColumn = e.path[1]
      this.resizing = true
      this.startWidth = e.path[1].offsetWidth
      this.startX = e.pageX
    },
    mouseMove (e) {
      if (this.resizing) {
        this.resizingColumn.style.width = this.startWidth + (e.pageX - this.startX) + 'px'
      }
    },
    setListeners (div) {
      div.addEventListener('mouseover', this.mouseOver) // возможно стилем сделать
      div.addEventListener('mouseout', this.mouseOut)
      div.addEventListener('mousedown', this.mouseDown, false)
    },
    unsetListeners (div) {
      div.removeEventListener('mouseover', this.mouseOver)
      div.removeEventListener('mouseout', this.mouseOut)
      div.removeEventListener('mousedown', this.mouseDown, false)
    },
    createDiv (h) {
      var div = document.createElement('div')
      div.style.top = 0
      div.style.right = 0
      div.style.width = '2px'
      div.style.position = 'absolute'
      div.style.cursor = 'col-resize'
      div.style.userSelect = 'none'
      div.style.backgroundColor = 'silver'
      div.style.userSelect = 'none'
      div.style.height = `${h}px`
      this.setListeners(div)
      return div
    },
    sortableTable () {
      this.columns.forEach(el => {
        el.sortable = this.sortableColumns.includes(el.name)
      })
    },
    unsortableTable () {
      this.sortableColumns = []
      this.columns.forEach(el => {
        if (!(el.sortable === undefined) && (el.sortable)) {
          this.sortableColumns.push(el.name) // запоминаяем столбцы, которые имели сортировку
        }
      })
      this.columns = this.columns.map(e => {
        if (e.sortable) e.sortable = false
        return e
      })
    },
    resetWith () {
      const cols = document.querySelectorAll('.q-table th')
      for (var i = 0; i < cols.length; i++) {
        cols[i].style.width = ''
      }
      this.showNotif('Сброшены изменения ширины столбцов', 'purple')
    },
    unresizeableTable () {
      document.querySelector('.q-table thead').removeEventListener('dblclick', this.resetWith)
      document.removeEventListener('mousemove', this.mouseMove)
      document.removeEventListener('mouseup', this.mouseUp)
      this.sortableTable()
      const cols = document.querySelectorAll('.q-table th')

      for (var i = 0; i < cols.length; i++) {
        const divs = cols[i].getElementsByTagName('div')
        for (var j = 0; j < divs.length; j++) {
          this.unsetListeners(divs[j])
          cols[i].removeChild(divs[j])
        }
      }
      this.showNotif('Выключено изменение ширины столбцов', 'red')
    },
    resizeableTable () {
      this.unsortableTable()
      document.querySelector('.q-table thead').addEventListener('dblclick', this.resetWith)
      document.addEventListener('mousemove', this.mouseMove)
      document.addEventListener('mouseup', this.mouseUp)
      const table = document.querySelectorAll('.q-table'),
        cols = document.querySelectorAll('.q-table th')
      for (var i = 0; i < cols.length; i++) {
        var div = this.createDiv(table[0].clientHeight)
        cols[i].style.width = cols[i].clientWidth + 'px'
        cols[i].appendChild(div)
        cols[i].style.position = 'relative'
      }
      this.showNotif('Включено изменение ширины столбцов', 'green')
    }
  },
  props: {

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
.table-resizable.resizing  {
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
