import { observable } from 'mobx'

const reportStore = observable({
    list:[],
    setList(list) {
        this.list = list;
    }
})
export default reportStore
