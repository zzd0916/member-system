import { observable } from 'mobx'

const counterStore = observable({
  counter: 0,
  counterStore() {
    console.log(this)
    this.counter++
  },
  increment(number) {
    console.log(number)
    this.counter += number
  },
  decrement() {
    console.log(this)
    this.counter--
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})
export default counterStore