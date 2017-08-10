# Wx-store 小程序状态管理方案

多页面间的状态管理和页面通信是一个老生常谈的问题，目前在前端领域已经有非常成熟的解决方案比如redux，也可以通过在app中建立事件总线利用发布订阅模式的方式来实现。

但对于小程序而言，上述方案都存在着一些的问题
- redux的概念较为复杂，初学者很难迅速上手掌握，并且代码量比较大，而小程序对包大小还是有一定限制的
- 事件总线的方式只是一种通信手段而毫无管理可言，代码写起来较为凌乱，并且需要适时地移除监听
- 对小程序而言，后台调用setData会影响前台页面的展示，当数据量较大时很容易造成卡顿，参见官方文档[小程序-优化建议](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html)
 

> 当页面进入后台态（用户不可见），不应该继续去进行setData，后台态页面的渲染用户是无法感受的，另外后台态页面去setData也会抢占前台页面的执行。

事实上在很多情况下，我们并不需要状态的及时更新，只需要在适当的时机展示正确的数据即可。

于是突发奇想（脑袋进水）做了一个简单的状态管理方案，这里借鉴了redux和vuex的部分思想和代码风格，其实非常简单，相信但凡有点水平都能看懂

 