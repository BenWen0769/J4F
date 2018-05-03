
var modalCount = 0;
var EXIST_SHOW = false;  //退出确认框是否在显示

var vm;
$(function () {
    $(document).on('keydown', function (e) {
        if (EXIST_SHOW && e.keyCode === 13) {
            vm.exist();
        }
    });
    vm = new Vue({
        el: '#app',
        data: function() {
            return {
                menuData: [],
                tabs: [
                    { id: 0, title: '首页', link: '/home/desk' }],
                curTab: 0,
                mm_width: 0,
                mm_src: '',
                User: { name: '' },
                mainModal: false,
                modal_theme: false
            }
        },
        beforeMount: function() {
            this.menuData = [
                {
                    id: 1, title: '产品管理', icon:'ios-pricetags',submenu: [
                        { id: 3, title: '产品列表',url:'/products/list' },
                        { id: 4, title: '子菜单2', url: '' },
                        { id: 5, title: '子菜单2', url: '' }]
                },
                {
                    id: 10, title: '我的设置', icon: 'ios-pricetags', submenu: [
                        { id: 11, title: '暂未完成', url: '' }]
                }
            ];
        },
        mounted: function() {
            $('#weather').leoweather({ format: '<span id="colock">今日是{年}年{月}月{日}日 星期{周}</span>' });
        },
        methods: {
            menuClick: function(id) {
                var menu = this.getMenuById(id); 
                handleSysMenu(menu);
            },
            getMenuById: function(id) {
                for (var i in this.menuData) {
                    var _menu = this.menuData[i];
                    if (_menu.id === id) return _menu;
                    for (var j in _menu.submenu) {
                        if (_menu.submenu[j].id === id) return _menu.submenu[j];
                    }
                }
            },
            handleTabRemove: function(id) {
                var i = findIndexById(this.tabs, id);
                //                this.tabs[i] = {id:-1};
                this.tabs.splice(i,1,i);
                this.goHome();
                this.$nextTick(function () {
                    $('.ivu-tabs-content .ivu-tabs-tabpane:visible:eq(1)').remove();
                });
                //this.$forceUpdate();
                //alert(this.tabs.length);
            },
            mainModalClose: function() {
                clearIframe('#modalifr');
            },
            goHome: function() {
                this.curTab = 0;
            },
            refreshPage: function() {
                var thisCenter = getCenterWindow();
                thisCenter.location.href = thisCenter.location.href;
            },
            exist: function () {
                $.post("/member/loginout", null, function () {
                    window.location.href = '/login';
                });
            },
            backToLogin: function () {
                EXIST_SHOW = true;
                var self = this;
                this.$Modal.confirm({
                    title: '提醒',
                    content: '<p style="font-size: 16px;">是否确认退出当前帐号?</p>',
                    onOk: function() {
                        self.exist();
                    },
                    onCancel: function () {
                        EXIST_SHOW = false;
                    }
                });
            },
            tabClick: function (name) {

            }
        },
        created: function() {
            var self = this;
        }
    });
    
});

//系统功能菜单点击事件
function handleSysMenu(menu) {
    var url = menu.url;
    openUrlIntab(menu.id, menu.title, url);

}


//在tab中打开新的页面
function openUrlIntab(id, title, link) {
    if (findObjById(vm.$data.tabs, id) === null) {
        var newTab = { id: id, title: title, link: link };
        vm.$data.tabs.push(newTab);
    }
    vm.$data.curTab = id;
    //alert(vm.$data.tabs.length);
}

//在Modal中打开新页面(parms: 传递到新页面的参数)
function openUrlInModal(url, width,parms) {
    var $ifr = $('<iframe></iframe>');
    $ifr.attr('class', 'ifr');
    $ifr.attr('id', 'modalifr');
    $ifr.attr('src', url);
    $('#modalDiv').append($ifr);
    vm.$data.mm_width = width;
    vm.$data.mainModal = true;
    GetIframeWindow($ifr[0]).Args = parms;
}


//关闭主页面Modal
function closeModal() {
    vm.$data.mainModal = false;
    clearIframe('#modalifr');
}


//打开选择Modal
function openSelectModal(url,title, width,parms,callback) {
    vm.$Modal.confirm({
        title: title,
        width: width,
        onOk: function () {
            var rt = GetIframeWindow(window.frames["selIfr"]).thisRV;
            if(callback) callback(rt);
        },
        render: function (h) {
            return h('iframe', {
                attrs: {
                    'src': url,
                    'class': 'ifr',
                    'id':'selIfr'
                }
            });
        }
    });
    if (parms) GetIframeWindow(window.frames["selIfr"]).Args = parms;
    $('body div:last-child').find('.ivu-modal-confirm-footer').css('marginTop', 0);
}

function clearIframe(seletor) {
    $(seletor).remove();
}


//获取当前打开页面的window对象
function getCenterWindow() {
    return GetIframeWindow($('.ivu-tabs-tabpane:visible', document).find('iframe')[0]);
}



function findObjById(arr,id) {
    for (var i in arr)
        if (arr[i].id === id)
            return arr[i];
    return null;
}

function findIndexById(arr, id) {
    for (var i in arr)
        if (arr[i].id === id)
            return i;
    return null;
}


function switchSkin(skinName) {
    $("#" + skinName).addClass("selected")
               .siblings().removeClass("selected");
    $('#cssfile').attr("href", "/css/home/" + skinName + ".css");
    $.cookie("MyCssSkin", skinName, { path: '/', expires: 100 });
}
$(function() {
    $('#skin li').click(function() {
        switchSkin(this.id);
    });

    var cookie_skin = $.cookie("MyCssSkin");
    if (cookie_skin) {
        switchSkin(cookie_skin);
    }
});  