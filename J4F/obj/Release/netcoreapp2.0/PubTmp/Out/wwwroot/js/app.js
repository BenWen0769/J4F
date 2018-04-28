$(function() {
    if (!('IS_AUTO_RESIZE' in window)) window['IS_AUTO_RESIZE'] = true;  
    if (window['IS_AUTO_RESIZE']) {   //页面可设置此全局变量是否自适应内容变化
        if (window.top !== window)
            ResizeParentFrame();
        $(document.body).change(function () {
            ResizeParentFrame();
            setTimeout("ResizeParentFrame()", 85);
            setTimeout("ResizeParentFrame()", 200);
            setTimeout("ResizeParentFrame()", 550);
        });
        setTimeout("ResizeParentFrame()", 85);
        setTimeout("ResizeParentFrame()", 200);
        setTimeout("ResizeParentFrame()", 550);
    }


});


//通过访问页面后台刷新数据
function RefreshPageData(parms, callback) {
    var hasTopVm = !!window.top.vm;
    parms = parms || {};
    callback = callback || function () { };
    parms.ispostback = 1;
    if (hasTopVm) window.top.vm.$Loading.start();
    $.post(window.location.href, parms, function (data,statusCode) {
        if (data) {
            if (data.status === 'userlost') {
                if (hasTopVm) window.top.location.href = '../login/login_sjbs.aspx?userlost=1';
                return;
            }
            if (data.status === 'error') {
                ShowErrorMessage('服务器发生错误.');
            }
            callback(data, statusCode);
            if (hasTopVm) window.top.vm.$Loading.finish();
        } else {
            data = { status: 404};
            if (hasTopVm) window.top.vm.$Loading.error();
            if (hasTopVm) window.top.vm.$Message.error('访问服务器失败。');
            callback(data);
        }
    });
}


//获取后台数据
function GetAPIData(url, parms, callback) {
    $.post(url, parms, function (data) {
        if (data) {
            if (data.status === 'userlost')
                window.top.location.href = '../login/login_sjbs.aspx?userlost=1';
            else if (data.status === 'error') 
                ShowErrorMessage('服务器发生错误.');
            else
                if(callback) callback(data);
        } else {
            if (window.top.vm) {
                window.top.vm.$Notice.error({ title: '获取后台数据失败。' })
            } else {
                alert('获取后台数据失败。');
            }
        }
    });
}

//在主界面弹出错误信息
function ShowErrorMessage(mes) {
    if (window.top.vm) window.top.vm.$Message.error(mes);
    else alert(mes);
}



//在主界面弹出成功信息
function ShowSuccessMessage(mes) {
    if (window.top.vm) window.top.vm.$Message.success(mes);
    else alert(mes);
}


//在主界面弹出成功通知
function ShowSuccessNotice(conf) {
    if (window.top.vm) window.top.vm.$Notice.success(conf);
    else alert(conf.title);
}


//在主界面弹出信息通知
function ShowInfoNotice(conf) {
    if (window.top.vm) window.top.vm.$Notice.info(conf);
    else alert(conf.title);
}


//在主界面弹出出错通知 title,desc
function ShowErrorNotice(conf) {
    if (window.top.vm) window.top.vm.$Notice.error(conf);
    else alert(conf.title);
}

//刷新主页面打开的列表页面
function RefreshMainList() {
    if (window.top.getCenterWindow && window.top.getCenterWindow().vm)
        window.top.getCenterWindow().vm.$emit('refreshlist');
}

//设置本窗体自动扩展父窗体
function ResizeParentFrame() {
    var refParentIFrame = null; 
    var setHeight = $(document.body).outerHeight() + 40;
    var parentIFrames = window.parent.$("iframe").not("[ src*='Edit']").not("[ src*='edit']");
    for (var i = 0; i < parentIFrames.length; i++) {
//        var partUrl = parentIFrames[i].src.replace('..', '');
//        if (window.location.href.indexOf(partUrl) > -1) {
            refParentIFrame = parentIFrames[i];
//            break;
//        }
    }
    if (refParentIFrame === null) {
        return;
    }
    $(refParentIFrame).attr('height', setHeight);
    $(refParentIFrame).css('height', setHeight);
    //if (parent.ResizeParentFrame)
    //    parent.ResizeParentFrame();
}
function ResizeParentFrame1() {
    var refParentIFrame = null; 
    var setHeight = $(document.body).outerHeight() + 75;
    var parentIFrames = window.parent.document.getElementsByTagName('iframe');
    for (var i = 0; i < parentIFrames.length; i++) {
        //        var partUrl = parentIFrames[i].src.replace('..', '');
        //        if (window.location.href.indexOf(partUrl) > -1) {
        refParentIFrame = parentIFrames[i];
        //            break;
        //        }
    }
    if (refParentIFrame === null) {
        return;
    }
    $(refParentIFrame).attr('height', setHeight);
    $(refParentIFrame).css('height', setHeight);
    //if (parent.ResizeParentFrame)
    //    parent.ResizeParentFrame();
}
function ResizeParentFrame2() {
    var refParentIFrame = null; 
    var setHeight = $(document.body).outerHeight() + 75 + 200;
    var parentIFrames = window.parent.document.getElementsByTagName('iframe');
    for (var i = 0; i < parentIFrames.length; i++) {
        //        var partUrl = parentIFrames[i].src.replace('..', '');
        //        if (window.location.href.indexOf(partUrl) > -1) {
        refParentIFrame = parentIFrames[i];
        //            break;
        //        }
    }
    if (refParentIFrame === null) {
        return;
    }
    $(refParentIFrame).attr('height', setHeight);
    $(refParentIFrame).css('height', setHeight);
    //if (parent.ResizeParentFrame)
    //    parent.ResizeParentFrame();
}

//打开Modal
function OpenModal(url, title, width, parms, callback) {
    var mainVm = window.top.vm;
    if (!mainVm) return;
    var topWindow = window.top;
    topWindow.modalCount++;
    var ifrid = 'modalIfr' + topWindow.modalCount.modalCount;
    mainVm.$Modal.confirm({
        title: title,
        width: width,
        onOk: function () {
            var rt = GetIframeWindow(topWindow.frames[ifrid]).thisRV;
            if (callback) callback(rt);
        },
        okText:null,
        render: function (h) {
            return h('iframe', {
                attrs: {
                    'src': url,
                    'class': 'ifr',
                    'id': ifrid
                }
            });
        }
    });
    if (parms) GetIframeWindow(topWindow.frames[ifrid]).Args = parms;
    //if (!hasOK) {
    //    topWindow.$('body div:last-child').find('.ivu-modal-confirm-footer').hide();
    //}
}

//打开确认对话框
function ConfirmModal(title,content,okCallBack,cancelCallBack) {
    var mainVm = window.top.vm;
    if (!mainVm) return;
    if (!cancelCallBack) cancelCallBack = function () { };
    mainVm.$Modal.confirm({
        title: title,
        content: content,
        onOk: okCallBack,
        onCancel: cancelCallBack
    });
}

//打开Modal
function OpenLayer(url, title, width, height, parms, callback) {
    if (!height) height = window.screen.availHeight - 200;
    if (window.top.layer) {
        window.top.layer.open({
            type: 2,
            title: title,
            closeBtn: 1,
            shade: 0.3,
            offset: '100px',
            resize:true,
            maxmin: true, //开启最大化最小化按钮
            area: [width + 'px', height + 'px'],
            content: url,
            zIndex:900,
            success: function (o) {
                if(parms)
                   GetIframeWindow(o.find('iframe')[0]).Args = parms;
            }
        });
    } else {
        window.open(url);
    }
}


function CloseLayer() {
    var index = window.top.layer.getFrameIndex(window.name);
    window.top.layer.close(index)
}


//postback到后台
function DoPostBack(parm) {
    parm.dopostback = 1;
    var $form = $('<form method="post"></form>');
    $form.css('display', 'none');
    for (var i in parm) {
        var $input = $('<input></input>');
        $input.attr('name', i);
        $input.val(parm[i]);
        $form.append($input);
    }
    $('body').append($form);
    $form.submit();
}


//打开新的窗口
function OpenWindow(url, width, height) {
    var left = 0;
    var top = 0;
    if (width) {
        left = (window.screen.availWidth - width) / 2;
    }
    else {
        left = 0;
        width = window.screen.availWidth - 20;
    }
    if (height) {
        top = (window.screen.height - height) / 2;
    }
    else {
        top = 0;
        height = window.screen.availHeight - 40;
    }
    window.open(url, '_blank', 'titlebar=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,hotkeys=no,dependent=no,resizable=yes,left=' + left + 'px,top=' + top + 'px,width=' + width + 'px,height=' + height + 'px');
};


function GetIframeWindow(ifr) {
    if (ifr.contentWindow) return ifr.contentWindow;
    else return ifr.window;
}