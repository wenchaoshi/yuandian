
import $ from 'jquery'
export default {
    intoView(obj){
        $(function(){
            obj.scrollIntoView(true)
          })
    },
}