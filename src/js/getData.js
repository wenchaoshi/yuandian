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

function getData(url, option){
    let type=option.type||'get';
    $.ajax({
      url: 'https://wx.yun.xuemei99.com'+url+'&csrfmiddlewaretoken='+getCookie('csrftoken'),
      type: type,
      data: option.data?option.data:{},
      beforeSend: function (req) {
          req.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
      },
      success: function (data) {
          if(option.success){
            option.success(data)
          }
      },
      error: function (data) {
        if(option.error){
            option.error(data)
        }
        
      }
  });
}




export default {
    getData
}







