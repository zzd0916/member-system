import { observable } from 'mobx'

const reportStore = observable({
    data:{},
    list:[],
    count: 0,
    p: 1,
    ps: 10,
    setList(l) {
        this.list = l   
    },
    setData(d) {
        this.data = d
    },
    setPage(d) {
        this.count = d.count;
        this.p = d.p;
        this.ps = d.ps;
    }
})

export default reportStore
