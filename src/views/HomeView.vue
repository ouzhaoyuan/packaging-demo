<template>
  <div class="container">
    <div class="fs-virtuallist-container">
      <div class="fs-virtuallist-list">
        <div class="fs-virtuallist-item"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
class FsVirtuallist {
  state: any
  scrollStyle: any
  startIndex
  endIndex
  renderList: any
  oContainer
  oList

  constructor(containerSelector: any, listSelector: any) {
    this.state = {
      dataSource: [],
      itemHeight: 100,
      viewHeight: 100,
      maxCount: 0
    }
    this.scrollStyle = {} // list 动态样式（高度，偏移）
    this.startIndex = 0 // 当前视图列表在数据源中的起始索引
    this.endIndex = 0 // 当前视图列表在数据源中的末尾索引
    this.renderList = [] // 渲染在视图上的列表项
    // 根据用户传入的选择器获取 DOM 并保存// this.bindEvent();
      // this.addData();
      // this.render();
    this.oContainer = document.querySelector(containerSelector)
    this.oList = document.querySelector(listSelector)
  }
  init() {
    this.state.viewHeight = this.oContainer.offsetHeight
    this.state.maxCount = Math.ceil(this.state.viewHeight / this.state.itemHeight) + 1
    this.bindEvent();
      this.addData();
      this.render();
  }
  computedEndIndex() {
    const end = this.startIndex + this.state.maxCount
    this.endIndex = this.state.dataSource[end] ? end : this.state.dataSource.length
    if (this.endIndex >= this.state.dataSource.length) {
      this.addData()
    }
  }
  computedRenderList() {
    this.renderList = this.state.dataSource.slice(this.startIndex, this.endIndex)
  }
  computedScrollStyle() {
    const { dataSource, itemHeight } = this.state
    this.scrollStyle = {
      height: `${dataSource.length * itemHeight - this.startIndex * itemHeight}px`,
      transform: `translate3d(0,${this.startIndex * itemHeight}px,0)`
    }
  }
  bindEvent() {
    // 注意需要改变 this 指向 -> bind
    this.oContainer.addEventListener('scroll', this.handleScroll.bind(this))
  }

  addData() {
    for (let i = 0; i < 10; i++) {
      this.state.dataSource.push(this.state.dataSource.length + 1)
    }
  }

  handleScroll() {
    const { scrollTop } = this.oContainer
    this.startIndex = Math.floor(scrollTop / this.state.itemHeight)
    this.render()
  }

  render() {
    this.computedEndIndex()
    this.computedRenderList()
    this.computedScrollStyle()
    const template = this.renderList
      .map((i: any) => `<div class="fs-virtuallist-item">${i}</div>`)
      .join('')
    const { height, transform } = this.scrollStyle
    this.oList.innerHTML = template
    this.oList.style.height = height
    this.oList.style.transform = transform
  }
}

setTimeout(() => {
  const vList = new FsVirtuallist('.fs-virtuallist-container', '.fs-virtuallist-list')
  vList.init()
}, 2000)
</script>

<style>
/* 容器布局并设置具体的宽高 */
.container {
  width: 600px;
  flex: 1;
  margin: 100px auto;
  border: 1px solid red;
}

/* 作为虚拟列表组件宽高由父组件决定，注意这里需要保证垂直方向有滚动条 */
.fs-virtuallist-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

/* list 高度会用 JS 设置动态样式 */
.fs-virtuallist-list {
  width: 100%;
}

/* item 固定高度即可，其他样式仅为了做展示 */
.fs-virtuallist-item {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid #000;
  text-align: center;
  font-size: 20px;
  line-height: 100px;
}
</style>
