Vue.component('hs-table', {
    template: '<div class="hslist">\
        <div class="list-btn">\
            <row>\
                <i-col span="6" align="left">\
                    <Input v-model="searchKey" placeholder="请输入关键字" class="searchInput" \
                        @on-enter="searchList" size="default">\
                        <Button slot="append" icon="ios-search" @click="searchList"></Button>\
                   </Input>\
                </i-col>\
                 <i-col span="12" align="center">\
                    <slot name="head_m"></slot>\
                </i-col>\
                 <i-col span="6" align="left">\
                    <slot name="head_r"></slot>\
                </i-col>\
            </row>\
        </div>\
        <i-Table border highlight-row :columns="columns" :data="data" @on-row-dblclick="showDetail"></i-Table>\
        <div class="pageDiv">\
            <Page :current="cPage" placement="top" :total="total" show-sizer :page-size="pageSize"\
                :page-size-opts="[10,15,20]" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>\
        </div>\
    </div>',
    props:['hsColumns','hsData','hsTotal'],
    data: function () {
        return {
            columns: this.hsColumns,
            data: this.hsData,
            cPage: 1,
            total: this.hsTotal,
            zt: '未完成',
            pageSize: 10,
            searchKey: ''
        };
    },
    methods:{
        showDetail: function (row) {
            this.$emit('dblclick', row);
        },
        searchList:function(){
            this.cPage=1;
            var self=this;
            var parms = {action:'searchlist',searchkey:this.searchKey,page:this.cPage,pagesize:this.pageSize,status:this.zt,};
            RefreshPageData(parms,function(info){
                self.data=info.data;
                self.total=info.total;
            });
        },
        ztChange:function(){
            this.cPage=1;
            this.pageSize=10;
            this.doChange();
        },
        pageChange:function(page){
            this.cPage=page;
            this.doChange();
        },
        pageSizeChange:function(pageSize){
            this.pageSize=pageSize;
            this.doChange();
        },
        doChange:function(){
            var self=this;
            var parms = {action:'data',page:this.cPage,pagesize:this.pageSize,status:this.zt};
            RefreshPageData(parms,function(info){
                self.data=info.data;
                self.total=info.total;
            });
            ResizeParentFrame();
            setTimeout("ResizeParentFrame()", 85);
            setTimeout("ResizeParentFrame()", 200);
            setTimeout("ResizeParentFrame()", 550);
        }
    }
});
