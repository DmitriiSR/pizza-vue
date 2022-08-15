export const modalsModule = {
    state: () => ({
        createModalVisible: false,
        confirmModalVisible: false,
        deleteModalVisible: false,
        infoModalVisible: false,
        isEdit: false
    }),
    getters: {
        toggleCreate(state) {
            return !state.createModalVisible
        },
        toggleConfirm(state) {
            return !state.confirmModalVisible
        },
        toggleDelete(state) {
            return !state.deleteModalVisible
        },
        toggleInfo(state) {
            return !state.infoModalVisible
        },
        toggleEdit(state) {

            return !state.isEdit
        }
    },
    mutations: {
        toggleCreate(state) {
            state.createModalVisible = !state.createModalVisible
        },
        toggleConfirm(state) {
            state.confirmModalVisible = !state.confirmModalVisible
        },
        toggleDelete(state) {
            state.deleteModalVisible = !state.deleteModalVisible
        },
        toggleInfo(state) {
            state.infoModalVisible = !state.infoModalVisible
        },
        toggleEdit(state) {
            state.isEdit = !state.isEdit
            state.createModalVisible = !state.createModalVisible
        }
    },
    actions: {
        toggleEditModal({state, commit}) {
            if (state.isEdit)  {
                commit('toggleEdit')
                commit('setClearPizza')
            } else {
                commit('toggleCreate')
            }
        }
    }
}
