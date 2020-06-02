import { observable } from 'mobx'

const reportStore = observable({
    data:{
        Detection_Id: "99e543b0584a4f6ca3c0d9fe6798e15c",
        date: "12/11/2019",
        realName: "张泽东",
        score_arom: 17,
        score_overall: 48,
        score_stability: 59,
        score_symmetry: 62,
        tester: {_id: "5df0c811728d6a3c1d9e3dd3", realName: "张泽东", phone: "15680686538"},
        url: "http://member.ntsports.tech/tests/xx_show_report?tester=5df0c811728d6a3c1d9e3dd3&Detection_Id=99e543b0584a4f6ca3c0d9fe6798e15c&__lng=zh",
        _id: "5df0c838728d6a3c1d9e3dd4",
    },
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
