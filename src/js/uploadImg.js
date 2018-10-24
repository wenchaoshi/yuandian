/**
 * tinyImgUpload
 * @param ele [string] [生成组件的元素的选择器]
 * @param options [Object] [对组件设置的基本参数]
 * options具体参数如下
 * path 图片上传的地址路径 必需
 * onSuccess(res) 文件上传成功后的回调 参数为返回的文本 必需
 * onFailure(res) 文件上传失败后的回调 参数为返回的文本 必需
 * @return [function] [执行图片上传的函数]
 * 调用方法
 * tinyImgUpload('div', options)
 */

export default {
    uploadImg
}

function uploadImg(evt,onSuccess,onError) {

    var myProxyTable={
        'target':'ddd',
        'changeOrigin':true,
        'pathRewrite':{
            '^/aaa':'/dsada'
        }
    }

    //创建FormData对象
    var data = new FormData();
    //为FormData对象添加数据
    //
    // $.each(obj_select[0].files, function (i, file) {
    //     data.append('file', evt.target.files[0]);
    // });

    data.append('file', evt.target.files[0]);
    data.append('bucket', 'show');
    data.append('csrfmiddlewaretoken', $.cookie("csrftoken"));
    $.ajax({
        url: '/product/api/upload',
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
        }
    });
}