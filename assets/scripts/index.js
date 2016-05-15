var Index = function () {


    return {
        //main function
        init: function () {
            App.addResponsiveHandler(function () {
                jQuery('.vmaps').each(function () {
                    var map = jQuery(this);
                    map.width(map.parent().width());
                });
            });
        },

        initJQVMAP: function () {

            var showMap = function (name) {
                jQuery('.vmaps').hide();
                jQuery('#vmap_' + name).show();
            }

            var setMap = function (name) {
                var data = {
                    map: 'world_en',
                    backgroundColor: null,
                    borderColor: '#333333',
                    borderOpacity: 0.5,
                    borderWidth: 1,
                    color: '#c6c6c6',
                    enableZoom: true,
                    hoverColor: '#c9dfaf',
                    hoverOpacity: null,
                    values: sample_data,
                    normalizeFunction: 'linear',
                    scaleColors: ['#b6da93', '#909cae'],
                    selectedColor: '#c9dfaf',
                    selectedRegion: null,
                    showTooltip: true,
                    onLabelShow: function (event, label, code) {

                    },
                    onRegionOver: function (event, code) {
                        if (code == 'ca') {
                            event.preventDefault();
                        }
                    },
                    onRegionClick: function (element, code, region) {
                        var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
                        alert(message);
                    }
                };

                data.map = name + '_en';
                var map = jQuery('#vmap_' + name);
                if (!map) {
                    return;
                }
                map.width(map.parent().parent().width());
                map.show();
                map.vectorMap(data);
                map.hide();
            }

            setMap("world");
            setMap("usa");
            setMap("europe");
            setMap("russia");
            setMap("germany");
            showMap("world");

            jQuery('#regional_stat_world').click(function () {
                showMap("world");
            });

            jQuery('#regional_stat_usa').click(function () {
                showMap("usa");
            });

            jQuery('#regional_stat_europe').click(function () {
                showMap("europe");
            });
            jQuery('#regional_stat_russia').click(function () {
                showMap("russia");
            });
            jQuery('#regional_stat_germany').click(function () {
                showMap("germany");
            });

            $('#region_statistics_loading').hide();
            $('#region_statistics_content').show();
        },

        initCalendar: function () {
            if (!jQuery().fullCalendar) {
                return;
            }

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};

            if ($('#calendar').width() <= 400) {
                $('#calendar').addClass("mobile");
                h = {
                    left: 'title, prev, next',
                    center: '',
                    right: 'today,month,agendaWeek,agendaDay'
                };
            } else {
                $('#calendar').removeClass("mobile");
                if (App.isRTL()) {
                    h = {
                        right: 'title',
                        center: '',
                        left: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                } else {
                    h = {
                        left: 'title',
                        center: '',
                        right: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                }               
            }

            $('#calendar').fullCalendar('destroy'); // destroy the calendar
            $('#calendar').fullCalendar({ //re-initialize the calendar
                disableDragging: false,
                header: h,
                editable: true,
                events: [{
                        title: 'All Day Event',                        
                        start: new Date(y, m, 1),
                        backgroundColor: App.getLayoutColorCode('yellow')
                    }, {
                        title: 'Long Event',
                        start: new Date(y, m, d - 5),
                        end: new Date(y, m, d - 2),
                        backgroundColor: App.getLayoutColorCode('green')
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d - 3, 16, 0),
                        allDay: false,
                        backgroundColor: App.getLayoutColorCode('red')
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d + 4, 16, 0),
                        allDay: false,
                        backgroundColor: App.getLayoutColorCode('green')
                    }, {
                        title: 'Meeting',
                        start: new Date(y, m, d, 10, 30),
                        allDay: false,
                    }, {
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        backgroundColor: App.getLayoutColorCode('grey'),
                        allDay: false,
                    }, {
                        title: 'Birthday Party',
                        start: new Date(y, m, d + 1, 19, 0),
                        end: new Date(y, m, d + 1, 22, 30),
                        backgroundColor: App.getLayoutColorCode('purple'),
                        allDay: false,
                    }, {
                        title: 'Click for Google',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        backgroundColor: App.getLayoutColorCode('yellow'),
                        url: 'http://google.com/',
                    }
                ]
            });
        },

        initCharts: function () {
            if (!jQuery.plot) {
                return;
            }

            // RANDOM data generator for plot charts during inavailability data (sample only)
            var data = [];  
            var totalPoints = 250;
            function getRandomData() {
                if (data.length > 0) data = data.slice(1);
                // do a random walk
                while (data.length < totalPoints) {
                    var prev = data.length > 0 ? data[data.length - 1] : 50;
                    var y = prev + Math.random() * 10 - 5;
                    if (y < 0) y = 0;
                    if (y > 100) y = 100;
                    data.push(y);
                }
                // zip the generated y values with the x values
                var res = [];
                for (var i = 0; i < data.length; ++i) res.push([i, data[i]])
                return res;
            }
            //END RANDOM

            function showTooltip(title, x, y, contents) {
            
            var merchantid  = [];

                    var xData=x;
                    //$('<div id="tooltip" class="chart-tooltip"><div class="date">' + title + '<\/div><div class="label label-success">CTR: ' + x / 10 + '%<\/div><div class="label label-danger">Imp: ' + x * 12 + '<\/div><\/div>').css({
                    $('<div id="tooltip" class="chart-tooltip"><div class="date">' + "XY-POS" + '<\/div><div class="label label-success">X : ' + xData + '<\/div><div class="label label-danger">Y: ' + y + '<\/div><\/div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y -  100,
                    width: 80,
                    left: x -  40,
                    border: '0px solid #ccc',
                    padding: '2px 6px',
                    'background-color': '#fff',
                }).appendTo("body").fadeIn(200);
            }

            function randValue() {
                return (Math.floor(Math.random() * (1 + 50 - 20))) + 10;
            }

            $.post("initialdatecall.php",{}, function( data ) {    
                        //alert('Great success! userdatecall.php');
                        console.log("DeviceId:" + data.DEVICE);
                        var totalsales      = ((parseFloat(data.CASH) + parseFloat(data.CREDIT)  + parseFloat(data.DEBIT))/1000000).toFixed(0) ;
                        var totalstruk      = (parseFloat(data.TOTALSTRUKCASH) + parseFloat(data.TOTALSTRUKCREDIT)  + parseFloat(data.TOTALSTRUKDEBIT)).toFixed(0); 
                        var salesperstruk   = (1000000*totalsales/totalstruk).toFixed(0);
                        var cashproportion  = (100 * parseFloat(data.CASH)/(totalsales*1000000)).toFixed(2);
                        var merchantid  = [
                             [1, data.TRANSACTIONAMOUNT[0]],
                             [2, data.TRANSACTIONAMOUNT[1]],
                             [3, data.TRANSACTIONAMOUNT[2]],
                             [4, data.TRANSACTIONAMOUNT[3]],
                             [5, data.TRANSACTIONAMOUNT[4]],
                             [6, data.TRANSACTIONAMOUNT[5]],
                             [7, data.TRANSACTIONAMOUNT[6]],
                             [8, data.TRANSACTIONAMOUNT[7]],
                             [9, data.TRANSACTIONAMOUNT[8]],
                             [10,data.TRANSACTIONAMOUNT[9]],
                             [11,data.TRANSACTIONAMOUNT[10]],
                             [12,data.TRANSACTIONAMOUNT[11]],
                             [13,data.TRANSACTIONAMOUNT[12]],
                             [14,data.TRANSACTIONAMOUNT[13]],
                             [15,data.TRANSACTIONAMOUNT[14]],
                             [16,data.TRANSACTIONAMOUNT[15]],
                             [17,data.TRANSACTIONAMOUNT[16]],
                             [18,data.TRANSACTIONAMOUNT[17]],
                             [19,data.TRANSACTIONAMOUNT[18]],
                             [20,data.TRANSACTIONAMOUNT[19]],
                             [21,data.TRANSACTIONAMOUNT[20]],
                             [22,data.TRANSACTIONAMOUNT[21]],
                             [23,data.TRANSACTIONAMOUNT[22]],
                             [24,data.TRANSACTIONAMOUNT[23]],
                             [25,data.TRANSACTIONAMOUNT[24]],
                             [26,data.TRANSACTIONAMOUNT[25]],
                             [27,data.TRANSACTIONAMOUNT[26]],
                             [28,data.TRANSACTIONAMOUNT[27]],
                             [29,data.TRANSACTIONAMOUNT[28]],
                             [30,data.TRANSACTIONAMOUNT[29]]
                        ];

                console.log("totalsales:" + totalsales);
                console.log("totalstruk:" + totalstruk);
                console.log("salesperstruk:" + salesperstruk);
                console.log("cashproportion:" + cashproportion);

                //INITILIAZE PAYMENT SUMMARY
                $('#totalsales span').html( totalsales );
                $('#salesperstruk span').html(salesperstruk);
                $('#cashproportion span').html(cashproportion);


                //INITILIAZE CHART
                if ($('#site_statistics').size() != 0) {

                    $('#site_statistics_loading').hide();
                    $('#site_statistics_content').show();

                    var plot_statistics = $.plot($("#site_statistics"), 
                    [
                        /*
                        {
                            data: bintaro,
                            label: "Cabang Bintaro"
                        }, {
                            data: tebet,
                            label: "Cabang Tebet"
                        }, {
                            data: menteng,
                            label: "Cabang Menteng"
                        }, {
                            data: palmerah,
                            label: "Cabang Palmerah"
                        }, 
                        */
                        {
                            data: merchantid,
                            label: "Cabang merchantid"
                        }
                    ], 
                        {
                        series: {
                            lines: {
                                show: true,
                                lineWidth: 2,
                                fill: true,
                                fillColor: {
                                    colors: [{
                                            opacity: 0.05
                                        }, {
                                            opacity: 0.01
                                        }
                                    ]
                                }
                            },
                            points: {
                                show: true
                            },
                            shadowSize: 2
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderWidth: 0
                        },
                        colors: ["#d12610", "#37b7f3", "#52e136"],
                        xaxis: {
                            ticks: 11,
                            tickDecimals: 0
                        },
                        yaxis: {
                            ticks: 11,
                            tickDecimals: 0
                        }
                    });

                    var previousPoint = null;
                    $("#site_statistics").bind("plothover", function (event, pos, item) {
                        $("#x").text(pos.x.toFixed(2));
                        $("#y").text(pos.y.toFixed(2));
                        if (item) {
                            if (previousPoint != item.dataIndex) {
                                previousPoint  = item.dataIndex;

                                $("#tooltip").remove();
                                var x = item.datapoint[0].toFixed(2),
                                    y = item.datapoint[1].toFixed(2);

                                showTooltip('24 Jan 2013', item.pageX, item.pageY, item.series.label + " of " + x + " = " + y);
                            }
                        } else {
                            $("#tooltip").remove();
                            previousPoint = null;
                        }
                    });
                }
            }, "json");           
        },

        initMiniCharts: function () {
             
            $('.easy-pie-chart .number.transactions').easyPieChart({
                animate: 1000,
                size: 75,
                lineWidth: 3,
                barColor: App.getLayoutColorCode('yellow')
            });

            $('.easy-pie-chart .number.visits').easyPieChart({
                animate: 1000,
                size: 75,
                lineWidth: 3,
                barColor: App.getLayoutColorCode('green')
            });
             
            $('.easy-pie-chart .number.bounce').easyPieChart({
                animate: 1000,
                size: 75,
                lineWidth: 3,
                barColor: App.getLayoutColorCode('red')
            });

            $('.easy-pie-chart-reload').click(function(){
                $('.easy-pie-chart .number').each(function() {
                    var newValue = Math.floor(100*Math.random());
                    $(this).data('easyPieChart').update(newValue);
                    $('span', this).text(newValue);
                });
            });
            
            /* OJILAN REMOVE THIS AS CREATING PRBLM   
            $("#sparkline_bar").sparkline([8,9,10,11,10,10,12,10,10,11,9,12,11,10,9,11,13,13,12], {
                type: 'bar',
                width: '100',
                barWidth: 5,
                height: '55',
                barColor: '#35aa47',
                negBarColor: '#e02222'}
            );

            $("#sparkline_bar2").sparkline([9,11,12,13,12,13,10,14,13,11,11,12,11,11,10,12,11,10], {
                type: 'bar',
                width: '100',
                barWidth: 5,
                height: '55',
                barColor: '#ffb848',
                negBarColor: '#e02222'}
            );

            $("#sparkline_line").sparkline([9,10,9,10,10,11,12,10,10,11,11,12,11,10,12,11,10,12], {
                type: 'line',
                width: '100',
                height: '55',
                lineColor: '#ffb848'
            });
            */

        },
        
        initChat: function () {

            var cont = $('#chats');
            var list = $('.chats', cont);
            var form = $('.chat-form', cont);
            var input = $('input', form);
            var btn = $('.btn', form);

            var handleClick = function (e) {
                e.preventDefault();
                
                var text = input.val();
                if (text.length == 0) {
                    return;
                }

                var time = new Date();
                var time_str = time.toString('MMM dd, yyyy hh:mm');
                var tpl = '';
                tpl += '<li class="out">';
                tpl += '<img class="avatar" alt="" src="assets/img/avatar1.jpg"/>';
                tpl += '<div class="message">';
                tpl += '<span class="arrow"></span>';
                tpl += '<a href="#" class="name">Bob Nilson</a>&nbsp;';
                tpl += '<span class="datetime">at ' + time_str + '</span>';
                tpl += '<span class="body">';
                tpl += text;
                tpl += '</span>';
                tpl += '</div>';
                tpl += '</li>';

                var msg = list.append(tpl);
                input.val("");
                $('.scroller', cont).slimScroll({
                    scrollTo: list.height()
                });
            }

            /*
            $('.scroller', cont).slimScroll({
                scrollTo: list.height()
            });
            */

            $('body').on('click', '.message .name', function(e){
                e.preventDefault(); // prevent click event

                var name = $(this).text(); // get clicked user's full name
                input.val('@' +  name + ':'); // set it into the input field
                App.scrollTo(input); // scroll to input if needed
            });

            btn.click(handleClick);
            input.keypress(function (e) {
                if (e.which == 13) {
                    handleClick();
                    return false; //<---- Add this line
                }
            });
        },

        initDashboardDaterange: function () {

            $('#dashboard-report-range').daterangepicker({
                opens: (App.isRTL() ? 'right' : 'left'),
                startDate: moment().subtract('days', 29),
                endDate: moment(),
                minDate: '01/01/2014',
                maxDate: '12/31/2016',
                dateLimit: {
                    days: 60
                },
                showDropdowns: false,
                showWeekNumbers: true,
                timePicker: false,
                timePickerIncrement: 1,
                timePicker12Hour: true,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                    'Last 5 Days': [moment().subtract('days', 4), moment()],
                    'Last 30 Days': [moment().subtract('days', 29), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                buttonClasses: ['btn'],
                applyClass: 'blue',
                cancelClass: 'default',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: 'Apply',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay: 1
                }
            },
            function (start, end) {

                var merchantid = [];
                console.log("initDashboardDaterange - Callback has been called!");
                $('#dashboard-report-range span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

                console.log("DateStart:" + start.format('YYYY-MM-DD'));
                console.log("DateEnd:" + end.format('YYYY-MM-DD'));

                //OJILAN- PUT PHP CALLER AFTER DATETIME CHANGES
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                $.post("userdatecall.php",{ startdate: start.format('YYYY-MM-DD'), enddate: end.format('YYYY-MM-DD')}, function( data ) {    
                        //alert('Great success! userdatecall.php');
                        console.log("DeviceId:" + data.DEVICE);
                        var totalsales      = ((parseFloat(data.CASH) + parseFloat(data.CREDIT)  + parseFloat(data.DEBIT))/1000000).toFixed(0) ;
                        var totalstruk      = (parseFloat(data.TOTALSTRUKCASH) + parseFloat(data.TOTALSTRUKCREDIT)  + parseFloat(data.TOTALSTRUKDEBIT)).toFixed(0); 
                        var salesperstruk   = (1000000*totalsales/totalstruk).toFixed(0);
                        var cashproportion  = (100 * parseFloat(data.CASH)/(totalsales*1000000)).toFixed(2);
                        merchantid  = [
                             [1, data.TRANSACTIONAMOUNT[0]],
                             [2, data.TRANSACTIONAMOUNT[1]],
                             [3, data.TRANSACTIONAMOUNT[2]],
                             [4, data.TRANSACTIONAMOUNT[3]],
                             [5, data.TRANSACTIONAMOUNT[4]],
                             [6, data.TRANSACTIONAMOUNT[5]],
                             [7, data.TRANSACTIONAMOUNT[6]],
                             [8, data.TRANSACTIONAMOUNT[7]],
                             [9, data.TRANSACTIONAMOUNT[8]],
                             [10,data.TRANSACTIONAMOUNT[9]],
                             [11,data.TRANSACTIONAMOUNT[10]],
                             [12,data.TRANSACTIONAMOUNT[11]],
                             [13,data.TRANSACTIONAMOUNT[12]],
                             [14,data.TRANSACTIONAMOUNT[13]],
                             [15,data.TRANSACTIONAMOUNT[14]],
                             [16,data.TRANSACTIONAMOUNT[15]],
                             [17,data.TRANSACTIONAMOUNT[16]],
                             [18,data.TRANSACTIONAMOUNT[17]],
                             [19,data.TRANSACTIONAMOUNT[18]],
                             [20,data.TRANSACTIONAMOUNT[19]],
                             [21,data.TRANSACTIONAMOUNT[20]],
                             [22,data.TRANSACTIONAMOUNT[21]],
                             [23,data.TRANSACTIONAMOUNT[22]],
                             [24,data.TRANSACTIONAMOUNT[23]],
                             [25,data.TRANSACTIONAMOUNT[24]],
                             [26,data.TRANSACTIONAMOUNT[25]],
                             [27,data.TRANSACTIONAMOUNT[26]],
                             [28,data.TRANSACTIONAMOUNT[27]],
                             [29,data.TRANSACTIONAMOUNT[28]],
                             [30,data.TRANSACTIONAMOUNT[29]]
                        ];

                        console.log("totalsales:" + totalsales);
                        console.log("totalstruk:" + totalstruk);
                        console.log("salesperstruk:" + salesperstruk);
                        console.log("cashproportion:" + cashproportion);

                        $('#totalsales span').html( totalsales );
                        $('#salesperstruk span').html(salesperstruk);
                        $('#cashproportion span').html(cashproportion);


                        //CALL FUNCTION TO UPDATE CHARTS
                        if ($('#site_statistics').size() != 0) {
                            $('#site_statistics_loading').hide();
                            $('#site_statistics_content').show();

                            var plot_statistics = $.plot($("#site_statistics"), [{
                                    data: merchantid,
                                    label: "Cabang merchantid"
                                }
                            ],{
                                series: {
                                    lines: {
                                        show: true,
                                        lineWidth: 2,
                                        fill: true,
                                        fillColor: {
                                            colors: [{
                                                    opacity: 0.05
                                                }, {
                                                    opacity: 0.01
                                                }
                                            ]
                                        }
                                    },
                                    points: {
                                        show: true
                                    },
                                    shadowSize: 2
                                },
                                grid: {
                                    hoverable: true,
                                    clickable: true,
                                    tickColor: "#eee",
                                    borderWidth: 0
                                },
                                colors: ["#d12610", "#37b7f3", "#52e136"],
                                xaxis: {
                                    ticks: 11,
                                    tickDecimals: 0
                                },
                                yaxis: {
                                    ticks: 11,
                                    tickDecimals: 0
                                }
                            });                
                        } 
                        //END OF CHARTUPDATE

                    }, "json");

            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////START OF CHART UPDATE///////////////////////////////////////////////////////////////
            
            var totalPoints = 250;
            // random data generator for plot charts

            function getRandomData() {
                if (data.length > 0) data = data.slice(1);
                // do a random walk
                while (data.length < totalPoints) {
                    var prev = data.length > 0 ? data[data.length - 1] : 50;
                    var y = prev + Math.random() * 10 - 5;
                    if (y < 0) y = 0;
                    if (y > 100) y = 100;
                    data.push(y);
                }
                // zip the generated y values with the x values
                var res = [];
                for (var i = 0; i < data.length; ++i) res.push([i, data[i]])
                return res;
            }

            function randValue() {
                return (Math.floor(Math.random() * (1 + 50 - 20))) + 10;
            }            

            if ($('#site_statistics').size() != 0) {
                $('#site_statistics_loading').hide();
                $('#site_statistics_content').show();

                var plot_statistics = $.plot($("#site_statistics"), [{
                        data: merchantid,
                        label: "Cabang merchantid"
                    }
                ],{
                    series: {
                        lines: {
                            show: true,
                            lineWidth: 2,
                            fill: true,
                            fillColor: {
                                colors: [{
                                        opacity: 0.05
                                    }, {
                                        opacity: 0.01
                                    }
                                ]
                            }
                        },
                        points: {
                            show: true
                        },
                        shadowSize: 2
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderWidth: 0
                    },
                    colors: ["#d12610", "#37b7f3", "#52e136"],
                    xaxis: {
                        ticks: 11,
                        tickDecimals: 0
                    },
                    yaxis: {
                        ticks: 11,
                        tickDecimals: 0
                    }
                });                
            } 

            ////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////END OF CHART UPDATE///////////////////////////////////////////////////////////////

            }
            );


            $('#dashboard-report-range span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
            $('#dashboard-report-range').show();
        },

        initIntro: function () {
            if ($.cookie('intro_show')) {
                return;
            }

            $.cookie('intro_show', 1);

            setTimeout(function () {
                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Meet Metronic!',
                    // (string | mandatory) the text inside the notification
                    text: 'Metronic is a brand new Responsive Admin Dashboard Template you have always been looking for!',
                    // (string | optional) the image to display on the left
                    image: './assets/img/avatar1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 12000);
            }, 2000);

            setTimeout(function () {
                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Buy Metronic!',
                    // (string | mandatory) the text inside the notification
                    text: 'Metronic comes with a huge collection of reusable and easy customizable UI components and plugins. Buy Metronic today!',
                    // (string | optional) the image to display on the left
                    image: './assets/img/avatar1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 13000);
            }, 8000);

            setTimeout(function () {

                $('#styler').pulsate({
                    color: "#bb3319",
                    repeat: 10
                });

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    position: 'top-left',
                    // (string | mandatory) the heading of the notification
                    title: 'Customize Metronic!',
                    // (string | mandatory) the text inside the notification
                    text: 'Metronic allows you to easily customize the theme colors and layout settings.',
                    // (string | optional) the image to display on the left
                    image1: './assets/img/avatar1.png',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 15000);

            }, 23000);

            setTimeout(function () {

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Notification',
                    // (string | mandatory) the text inside the notification
                    text: 'You have 3 new notifications.',
                    // (string | optional) the image to display on the left
                    image1: './assets/img/image1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 4000);

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                var number = $('#header_notification_bar .badge').text();
                number = parseInt(number);
                number = number + 3;
                $('#header_notification_bar .badge').text(number);
                $('#header_notification_bar').pulsate({
                    color: "#66bce6",
                    repeat: 5
                });

            }, 40000);

            setTimeout(function () {

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Inbox',
                    // (string | mandatory) the text inside the notification
                    text: 'You have 2 new messages in your inbox.',
                    // (string | optional) the image to display on the left
                    image1: './assets/img/avatar1.jpg',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                setTimeout(function () {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 4000);

                var number = $('#header_inbox_bar .badge').text();
                number = parseInt(number);
                number = number + 2;
                $('#header_inbox_bar .badge').text(number);
                $('#header_inbox_bar').pulsate({
                    color: "#dd5131",
                    repeat: 5
                });

            }, 60000);
        }

    };

}();
