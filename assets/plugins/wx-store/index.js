module.exports = class Store {
  constructor({state, actions}) {
    this.state = state || {}
    this.actions = actions || {}
    this.ctxs = []
  }

  // 派发action, 统一返回promise action可以直接返回state
  dispatch(type, payload) {
    const update = res => {
      if (typeof res !== 'object') return
      this.setState(res)
      this.ctxs.map(ctx => {
        if (!ctx || typeof ctx.setData !== 'function') return
        ctx.setData(res)
      })
    }

    if (typeof this.actions[type] !== 'function') return
    const res = this.actions[type](this, payload)
    if (res.constructor.toString().match(/function\s*([^(]*)/)[1] === 'Promise') return res.then(update)
    else return new Promise(resolve => {
      update(res)
      resolve()
    })
  }

  // 修改state的方法
  setState(data) {
    this.state = {...this.state, ...data}
  }

  // 根据keys获取state
  getState(keys) {
    return keys.reduce((acc, key) => ({...acc, ...{[key]: this.state[key]}}), {})
  }

  // 映射state到实例中，可在onload或onshow中调用
  mapState(keys, ctx) {
    if (!ctx || typeof ctx.setData !== 'function') return
    ctx.setData(this.getState(keys))
    this.ctxs.push(ctx)
  }
}
