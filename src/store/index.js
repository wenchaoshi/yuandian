import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state={
    employeeData:[],
    searchData:{
        active:[],
        idata:[]
    },
    card:{
        cardIndex:0,
        card_imgs:{}
    }
}
const actions={

}

const mutations={
    setEmployeeData(state,data){
        //另外保存一份原始data，用以索引
        //避免出现js引用类型的问题  ****
        let idata=$.extend(true,[],data);  //$.extend方法用以新开一个堆区，防止js对象是应用类型的问题
        state.searchData.idata=[];
        state.searchData.idata.push(...idata)
        //避免出现js引用类型的问题

        //对元数据进行增加b标签操作，用于后面修改class
        data.map(item=>{
            let name=item.name.split('');
            let phone=item.phone?item.phone.split(''):[];
            let newName='';
            let newPhone='';
            for(let j=0;j<name.length;j++){
                newName+='<b>'+name[j]+'</b>';
            }
            for(let j=0;j<phone.length;j++){
                newPhone+='<b>'+phone[j]+'</b>';
            }
            item.name=newName;
            item.phone=newPhone;
        })

        state.employeeData=[];
        state.employeeData.push(...data);
        // state.searchData.idata.push(...idata)
    },
    setSearchDataActive(state,data){
        state.searchData.active=[];
        state.searchData.active.push(...data);
    },
    searchInit(state){
        state.employeeData=[];
        state.searchData.active=[];
    }
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})