var IS_AUTO_RESIZE = false;   //设置不自适应
var vm = new Vue({
    el: '#app',
    template: '#list',
    data: function () {
        return {
            pageobj: {},
            saving: false
        };
    },
    methods: {
        savePage: function () {
            if (!this.checkBeforeSave()) return;
            var self = this;
            this.saving = true;
            var isAdd = false;
            if (!this.pageobj.id) {
                isAdd = true;
                this.pageobj.id = 0;
            }
            var objStr = JSON.stringify(this.pageobj);
            var parms = { action: 'save', data: objStr };
            RefreshPageData(parms, function (data) {
                if (data.status === 'ok') {
                    if (isAdd) {
                        window.top.vm.$Notice.success({
                            title: '新增任务定义成功',
                            desc: '数据名称：<' + self.pageobj.sjmc + '>   数据类型:<' + self.pageobj.sjlx + '>'
                        });
                        self.pageobj.id = Number(data.rtn);
                    } else {
                        window.top.vm.$Message.success('保存成功。');
                        CloseLayer();
                    }
                    RefreshMainList();
                } else {
                    window.top.vm.$Message.error('保存任务信息失败。');
                }
                self.saving = false;
            });
        },
        downloadFile: function (f) {
            var ifr = $('<iframe></iframe>');
            ifr.hide();
            $('body').append(ifr);
            ifr.attr('src', '../webdoc/file_download.aspx?file_id=' + f.id);
        },
        delFile: function (f) {
            var self = this;
            window.top.vm.$Modal.confirm({
                title: '提醒',
                content: '<p>是否确认删除文件&lt;' + f.filename + '&gt;?</p>',
                onOk: function () {
                    GetAPIData('../webdoc/ApiServer.ashx?tag=FILE-DEL_' + f.id, null, function (data) {
                        if (data.status === 'ok') {
                            ShowSuccessMessage('删除文件成功。');
                            var _i = self.uploadList.indexOf(f);
                            self.uploadList.splice(_i, 1);
                            //ResizeParentFrame();
                        }
                        else ShowErrorMessage('删除文件失败。');
                    });
                }
            });
        },
        ckInp: function (title, val) {
            if (val === null || val === undefined || val === '') {
                window.top.vm.$Notice.error({ title: title + '不能为空。' });
                return false;
            }
            return true;
        },
        checkBeforeSave: function () {
            if (this.ckInp('数据名称', this.pageobj.sjmc) && this.ckInp('使用单位', this.pageobj.sydw)) {
                 return true;
            }
            return false;
        }
    },
    mounted: function () {
    }
});
