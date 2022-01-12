$(document).ready(function () {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var startDate = (month < 10 ? '0' : '') + month + '/' +
        (day < 10 ? '0' : '') + day + '/' + d.getFullYear();

    $("#dtpIni").val(startDate);
    $("#dtpFnl").val(startDate);

});

$('#btnerrormessage').on('click', function () {
    $("#errormessage").addClass("fade");
});

$('.form_date').datetimepicker({
    defaultDate: new Date(),
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0,
    format: 'mm/dd/yyyy'
});

function GetEtoRInfo() {

    var storeNumber = $("#storeNum").val();
    var storeRegion = $("#storeReg").val();
    var InitDate = $("#dtpIni").val();
    var EndDate = $("#dtpFnl").val();

    var values = {
        "dateFrom": InitDate,
        "dateTo": EndDate,
        "storeNumber": storeNumber,
        "storeRegion": storeRegion
    }
    $.ajax({
        url: 'EtoR.aspx/GetEtoRList',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        data: JSON.stringify(values),
        method: 'POST',
        dataType: 'json',
        success: function (response) {
            if (response.d == "Empty") {                
                $('#message').text("Attention: No Data Found");                
                $("#errormessage").removeClass("fade");                
                waitingDialog.hide();
                response.d = "";
            }
            else if (response.d == "Invalid") {
                $('#message').text("Attention: You cannot select a Store # and Region # at the same time. Please select one or the other.");
                $("#errormessage").removeClass("fade");
                waitingDialog.hide();
                response.d = "";
            }
            else {                
                $("#errormessage").addClass("fade");
                waitingDialog.hide();
            }
            drawTable(response.d);
            //drawGauge(response.d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var response = jQuery.parseJSON(xhr.responseText)
            $('#message').text("Attention: " + response.Message);
            $("#errormessage").removeClass("alert - info");
            $("#errormessage").addClass("alert - danger");
            $("#errormessage").removeClass("fade");
            waitingDialog.hide();
        }
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function drawTable(values) {
    var data = [];
    if (values != "") {
        data = JSON.parse(values);
    }
    var table = $('#EtoRTable').DataTable({
        bDestroy: true,
        data: data,
        searching: true,
        fixedHeader: true,
        paging: false,
        dom: 'Blfrtip',
        scrollX: true,
        scrollY: '50vh',
        scrollCollapse: true,
        fixedHeader: true,
        responsive: true,
        paging: true,
        pageLength: 30,
        "language": {
            "emptyTable": "No Data Found"
        },
        columns: [            
            { "data": "Region" },
            { "data": "StoreNumber" },            
            { "data": "StoreReceipts", render: $.fn.dataTable.render.number(',', '.', 2, '') },
            { "data": "TotalPay", render: $.fn.dataTable.render.number(',', '.', 2, '') },
            { "data": "E2R", render: $.fn.dataTable.render.number(',', '.', 2, '') }
        ],
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total over this page
            pageTotalRec = api
                .column(2, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            pageTotalPay = api
                .column(3, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(2).footer()).html(
                '$' + pageTotalRec + ''
            );
            $(api.column(3).footer()).html(
                '$' + pageTotalPay
            );
        },
        order: [[0, 'asc']],
        rowGroup: {
            endRender: function (rows, group) {
                var sumRec = rows
                    .data()
                    .pluck(2)
                    .reduce(function (a, b) {
                        return a + b.replace(/[^\d]/g, '') * 1;
                    }, 0);

                var sumPay = rows
                    .data()
                    .pluck(3)
                    .reduce(function (a, b) {
                        return a + b.replace(/[^\d]/g, '') * 1;
                    }, 0);

                return 'Total Region ' + group + ': ' +
                    $.fn.dataTable.render.number(',', '.', 0, '$').display(sumRec) + ' - ' + $.fn.dataTable.render.number(',', '.', 0, '$').display(sumPay);
            },
            dataSrc: 0
        }
    });

}

function drawGauge(values) {
    var data = [];
    if (values != "") {
        data = JSON.parse(values);
    }
    $("#container").empty();

    data.forEach(function (data, index) {

        $('#container').append('<div class="card"><h2 class="number">$' + data.TotalPay + '</h2><h2 class="number">Hours: ' + data.TotalHours + '</h2><p class="title">' + data.LastName + ', ' + data.FirstName + '</p><p>' + data.StoreNumber + '</p></div>');

    });


}

$('#Export').click(function (event) {

    var storeNumber = $("#storeNum").val();
    var storeRegion = $("#storeReg").val();
    var InitDate = $("#dtpIni").val();
    var EndDate = $("#dtpFnl").val();

    var values = {
        "dateFrom": InitDate,
        "dateTo": EndDate,
        "storeNumber": storeNumber,
        "storeRegion": storeRegion
    }

    $.ajax({
        type: "POST",
        url: "EtoR.aspx/ExportEtoR",
        data: JSON.stringify(values),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var JSONData = data.d;
            JSONToCSVConvertor(JSONData, 'ggi', true);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var response = jQuery.parseJSON(xhr.responseText)
            $('#message').text("Error: " + response.Message);
            $("#errormessage").removeClass("fade");
        }
    });

});

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    CSV += ReportTitle + '\r\n\n';
    if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }
    var fileName = "Report_";
    fileName += ReportTitle.replace(/ /g, "_");
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

$(".basic").click(function () {
    waitingDialog.show('Loading...');
});
