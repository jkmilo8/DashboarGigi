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

function GetStoreInfo() {

    var storeNumber = $("#storeNum").val();
    var InitDate = $("#dtpIni").val();
    var EndDate = $("#dtpFnl").val();

    var values = {
        "dateFrom": InitDate,
        "dateTo": EndDate,
        "storeNumber": storeNumber
    }
    $.ajax({
        url: 'Store.aspx/GetStoreList',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        data: JSON.stringify(values),
        method: 'POST',
        dataType: 'json',
        success: function (response) {
            drawTable(response.d);
            drawGauge(response.d);
            waitingDialog.hide();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var response = jQuery.parseJSON(xhr.responseText)
            $('#message').text("Error: " + response.Message);
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
    var table = $('#StoreTable').DataTable({
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
        columns: [
            { "data": "StoreName" },
            { "data": "City" },
            { "data": "StoreNumber" },            
            { "data": "StoreReceipts", render: $.fn.dataTable.render.number(',', '.', 2, '') }
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

            // Total over all pages
            total = api
                .column(3)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total over this page
            pageTotal = api
                .column(3, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(3).footer()).html(
                '$' + pageTotal + ' ( $' + total + ' total)'
            );
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

        // $('#container').append(
        //     $('<canvas>').prop({
        //         id: 'gauge' + data.StoreNumber                 
        //    })
        //);

        //$("#gauge" + data.StoreNumber).gauge(data.StoreReceipts, { color: "#F44336", colorAlpha: 0.7, type: "halfcircle", unit: "" });

        $('#container').append('<div class="card"><h1 class="number">' + data.StoreReceipts + '</h1><p class="title">' + data.StoreName + '</p><p>' + data.City + ' - ' + data.StoreNumber + '</p></div>');
        //$('#container').append('<div class="card"><h1 class="number">' + data.StoreReceipts + '</h1><p class="title">Store # ' + data.StoreNumber + '</p><p>' + data.StoreName + ', ' + data.City + '</p></div>');

    });


}

$('#Export').click(function (event) {

    var storeNumber = $("#storeNum").val();
    var InitDate = $("#dtpIni").val();
    var EndDate = $("#dtpFnl").val();

    var values = {
        "dateFrom": InitDate,
        "dateTo": EndDate,
        "storeNumber": storeNumber
    }

    $.ajax({
        type: "POST",
        url: "Store.aspx/ExportStore",
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
