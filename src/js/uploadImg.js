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
    tinyImgUpload
}

function tinyImgUpload(self,el, options) {
    // 判断容器元素合理性并且添加基础元素
 

    var el = document.getElementById(el);
    //el.value=null;
    var ele={};
    ele.files = [];   // 当前上传的文件数组


    // 预览图片
    //处理input选择的图片
    function handleFileSelect(evt) {
        var files = evt.files;
        ele.files=[];
        for(var i=0, f; f=files[i];i++){
            // 过滤掉非图片类型文件
            if(!f.type.match('image.*')){
                continue;
            }
            // 过滤掉重复上传的图片
            
            ele.files.push(f);

            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    // 向图片容器里添加元素
                    self.imgUrl=e.target.result
                };
            })(f);

            reader.readAsDataURL(f);
        }
        console.log(ele.files)
    }
    handleFileSelect(el)


    // 上传图片
    function uploadImg() {
        console.log(ele.files);

        var xhr = new XMLHttpRequest();
        var formData = new FormData();

        for(var i=0, f; f=ele.files[i]; i++){
            formData.append('files', f);
        }

        console.log('1',ele.files);
        console.log('2',formData);

        xhr.onreadystatechange = function (e) {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    options.onSuccess(xhr.responseText);
                }else {
                    options.onFailure(xhr.responseText);
                }
            }
        }

        xhr.open('POST', options.path, true);
        xhr.send(formData);

    }
    return uploadImg;
}
