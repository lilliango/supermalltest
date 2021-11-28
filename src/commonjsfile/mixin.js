import {debounce} from './utils'
import backtop from 'components/current/backtop/backtop'
// goodsitem的图片加载完成后bscroll刷新的混入封装
export const itemlistenermixin = {
  data() {
    return {
      itemimglistener: null,
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemimglistener = ()=>{  this.refresh() }
    this.$bus.$on('goodsitemimgload',this.itemimglistener)
  }
}
// backTop的混入封装
export const backtopmixin = {
  components: {
    backtop,
  },
  data() {
    return {
      isShowbt: false,
    }
  },
  methods: {
    backtotop() {
      this.$refs.scroll.scrollTo(0,0,300)
     },
  }
}