
import $ from 'jquery'
export default {
    intoView(obj,bool){
        bool=bool||true;
        obj.get(0).scrollIntoView(bool)
    },
    request,
    uploadImg,
    getCookie,
    setCookie
}

function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 

//读取cookies 
function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

//   MH1ocoxyws9DSGLwlj2rme3PRlbfc2JtFU8zFvYlxKAeTaHEJ5TXA7QM3nqxVUkZ

function request(url, option){

    var that=this;
    // if(!that.global.mineDetail){
    //     get_data_fn('/wxemployee/employee/detail?shop=2013714&employee=2005503',{
    //         success(res){
    //             that.global.mineDetail=res.detail;
    //             console.log('获取用户信息成功');
    //             console.log(that.global.mineDetail);
    //             get_data_fn(url, option);
    //         }
    //     })
    // }else{
    //     get_data_fn(url, option);
    // }
    $('#app .load').text('正在加载...').addClass('active');
    setTimeout(()=>{
        get_data_fn(url, option);
    },10)
    
    
    function load_error(text){
        text=text||'加载失败，请重试';
        $('#app .load').text(text);
        setTimeout(()=>{
            $('#app .load').removeClass('active');
        },1000)
    }
    function get_data_fn(url, option){
        let type=option.type||'get';
        let token=getCookie('csrftoken');
        //let token='LeEnp9QrGqaWMeUpGC4ar0H25NskKlKVOnxn4r6v4Mx9WwmA5LmNHkMaJ2WGEDAZ';
        // let _url=''+url+'?csrfmiddlewaretoken='+token
        url='/myapi'+url      //测试用
        let ajaxTimeOut=$.ajax({
            url: url,
            type: type,
            async:option.async?option.async:false,
            timeout:2000,
            data: option.data?option.data:{},
            beforeSend: function (req) {
                req.setRequestHeader("X-CSRFToken", token);
                req.setRequestHeader('Authorization', 'Token 7ac9b03fc20cb1ffbd22c384efc9e87937f04680')
            },
            success: function (data) {
                if(!data.status==0){
                    //请求成功，但参数错误
                    if(option.other){
                        option.other(data)
                        $('#app .load').removeClass('active');
                    }else{
                        load_error('加载失败。'+ data.status);
                    }
                }
                if(data.status==0){
                    //请求成功返回数据
                    setTimeout(()=>{
                        if(option.success) option.success(data,token);
                    },30)
                    let successtext=option.successtext||'加载成功';
                    $('#app .load').text(successtext).addClass('success')
                    setTimeout(()=>{
                        $('#app .load').removeClass('active success');
                    },200)
                }
            },
            error: function (data) {
                if(option.error){
                    option.error(data)
                }
                //alert('请求失败，请重试')
                load_error();
            },
            complete: function (XMLHttpRequest, status) { //当请求完成时调用函数
                if (status == 'timeout') {//status == 'timeout'意为超时,status的可能取值：success,notmodified,nocontent,error,timeout,abort,parsererror 
                    ajaxTimeOut.abort(); //取消请求
                    if(option.timeoutfn){
                        option.timeoutfn()
                    }else{
                        load_error('请求超时，请重试');
                    }
                   
                }
            }        
        });
    }
}


function uploadImg(evt,onSuccess,onError) {

    //创建FormData对象
    var data = new FormData();
    //为FormData对象添加数据
    //
    // $.each(obj_select[0].files, function (i, file) {
    //     data.append('file', evt.target.files[0]);
    // });

    data.append('file', evt.target.files[0]);
    data.append('bucket', 'show');
    data.append('csrfmiddlewaretoken', getCookie('csrftoken'));
    $.ajax({
        url: '/wxemployee/upload/api/',
        type: 'post',
        data: data,
        cache: false,
        contentType: false,    //不可缺
        processData: false,    //不可缺
        success: function (data) {
            if (data['status'] == 0) {
                //console.log(data)
                if(onSuccess&& typeof (onSuccess)=='function')
                onSuccess(data);
            }
            else {
                alert(data['detail'])
            }
        },
        error:function(res){
            //alert(res)
        }
    });
}










