

$(function () {
    initChart();
});


function initChart() {
    var bs = true;
    for (var i = 0; i < bs_data.length; i++) {
        if (bs_data[i].y) {
            bs = false;
            break;
        }
    }
    if (bs) {
        $('#containerone').hide();
    } else {
        $('#bsDiv').hide();
        $('#oneImg').hide();
        handleLeft();
    }

    bs = true;
    for (var i = 0; i < sj_data.length; i++) {
        if (sj_data[i].y) {
            bs = false;
            break;
        }
    }
    if (bs) {
        $('#container').css("display", "none");

    } else {
        $('#sjDiv').hide();
        $('#twoImg').hide();
        handleRight();
    }
}


function edit(rwid,qcid) {
    var url = '../SS_sjbs/Sjbs_Rwdb_Edit.aspx?mode=view&id=' + rwid + '&qcid=' + qcid;
    new Util().openWindow(url, 1187, 550);
}

//右
var chart_right = null;
function handleRight() {
    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            spacing: [0, 0, 0, -10]
        },

        colors: [
          'red',//超期，
          'blue',//未到期
          'yellow'//到期
        ],
        title: {
            floating: true,
            text: '我的收集'

        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                point: {
                    events: {
                        mouseOver: function (e) {  // 鼠标滑过时动态更新标题
                            // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                            
                        }
                        //, 
                        // click: function(e) { // 同样的可以在点击事件里处理
                        //     chart.setTitle({
                        //         text: e.point.name+ '\t'+ e.point.y + ' %'
                        //     });
                        // }
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            innerSize: '80%',
            name: '我的收集',
            data: sj_data
        }]
    }, function (c) {
        // 环形图圆心
        var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
        c.setTitle({
            y: centerY + titleHeight / 2
        });
        chart_right = c;
    });
}


//左

var chart_left = null;

function handleLeft() {
    $('#containerone').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            width:null,
            spacing: [0, 0, 0, 10]
        },
        colors: [
             'red',//超期，
              'blue',//未到期
              'yellow'//到期
        ],
        title: {
            floating: true,
            text: '我的报送'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'

                    }
                },
                point: {
                    events: {
                        mouseOver: function (s) {  // 鼠标滑过时动态更新标题
                        }
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            innerSize: '80%',
            name: '我的报送',
            data: bs_data
        }]
    }, function (c) {
        var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
        c.setTitle({
            y: centerY + titleHeight / 2
        });
        chart_left = c;
    });
}


