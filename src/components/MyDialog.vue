<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
        <q-toolbar class="bg-grey-3">
        <q-icon :name="icon" class="text-red" style="font-size: 2rem;"></q-icon>

          <q-toolbar-title><span class="text-weight-bold">{{title}}</span></q-toolbar-title>
        </q-toolbar>

        <q-card-section>
          {{message}}
        </q-card-section>
      <q-card-actions align="right">
        <q-btn  flat color="positive" label="Да" @click="onOKClick" />
        <q-btn flat color="negative" label="Нет" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    title: {
      type: String,
      default: 'Внимание!'
    },
    icon: {
      type: String,
      default: 'warning'
    },
    message: {
      type: String,
      default: ''
    }
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>
