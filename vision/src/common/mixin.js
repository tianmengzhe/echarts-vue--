import { mapState } from 'vuex'

// 混入 主题切换
export const themeMixin = {
    computed: {
        ...mapState(['theme']),
    },
    watch:{
        theme(){
          console.log('主题切换了')
          if(this.char){
            this.char.dispose() // 销毁单前图表
            this.initChart() // 重新以新的主题名称初始化图表
            this.screenAdapter() // 更新屏幕适配
            this.upChart() // 更新图表的展示
          }
        }
    },
}
