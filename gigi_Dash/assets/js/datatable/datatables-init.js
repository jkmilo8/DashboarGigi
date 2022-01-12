var InitiateSimpleDataTable = function() {
    return {
        init: function() {
            //Datatable Initiating
            var oTable = $('#simpledatatable').dataTable({
                "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "iDisplayLength": 5,
                "oTableTools": {
                    "aButtons": [
                        "copy", "csv", "xls", "pdf", "print"
                    ],
                    "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf"
                },
                "language": {
                    "search": "",
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumns": [
                    {
                        "bSortable": false,
                        "width": '45px'
                    },
                    null,
                    { "bSortable": false },
                    null,
                    { "bSortable": false }
                ],
                
                "aaSorting": []
            });

            //Check All Functionality
            $('#simpledatatable thead th input[type=checkbox]').change(function() {
                var set = $("#simpledatatable tbody tr input[type=checkbox]");
                var checked = $(this).is(":checked");
                $(set).each(function() {
                    if (checked) {
                        $(this).prop("checked", true);
                        $(this).parents('tr').addClass("active");
                    } else {
                        $(this).prop("checked", false);
                        $(this).parents('tr').removeClass("active");
                    }
                });

            });
            $('#simpledatatable tbody tr input[type=checkbox]').change(function() {
                $(this).parents('tr').toggleClass("active");
            });

        }

    };

}();
var InitiateEditableDataTable = function() {
    return {
        init: function() {
            //Datatable Initiating
            var oTable = $('#editabledatatable').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, 100, -1],
                    [5, 15, 20, 100, "All"]
                ],
                "iDisplayLength": 5,
                "sPaginationType": "bootstrap",
                "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "oTableTools": {
                    "aButtons": [
                        "copy",
                        "print",
                        {
                            "sExtends": "collection",
                            "sButtonText": "Save <i class=\"fa fa-angle-down\"></i>",
                            "aButtons": ["csv", "xls", "pdf"]
                        }
                    ],
                    "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf"
                },
                "language": {
                    "search": "",
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumns": [
                    null,
                    null,
                    null,
                    null,
                    { "bSortable": false }
                ]
            });

            var isEditing = null;

            //Add New Row
            $('#editabledatatable_new').click(function(e) {
                e.preventDefault();
                var aiNew = oTable.fnAddData([
                    '', '', '', '',
                    '<a href="#" class="btn btn-success btn-xs save"><i class="fa fa-edit"></i> Save</a> <a href="#" class="btn btn-warning btn-xs cancel" data-mode="new"><i class="fa fa-times"></i> Cancel</a>'
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editAddedRow(oTable, nRow);
                isEditing = nRow;
            });

            //Delete an Existing Row
            $('#editabledatatable').on("click", 'a.delete', function(e) {
                e.preventDefault();

                if (confirm("Are You Sure To Delete This Row?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
                alert("Row Has Been Deleted!");
            });

            //Cancel Editing or Adding a Row
            $('#editabledatatable').on("click", 'a.cancel', function(e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                    isEditing = null;
                } else {
                    restoreRow(oTable, isEditing);
                    isEditing = null;
                }
            });

            //Edit A Row
            $('#editabledatatable').on("click", 'a.edit', function(e) {
                e.preventDefault();

                var nRow = $(this).parents('tr')[0];

                if (isEditing !== null && isEditing != nRow) {
                    restoreRow(oTable, isEditing);
                    editRow(oTable, nRow);
                    isEditing = nRow;
                } else {
                    editRow(oTable, nRow);
                    isEditing = nRow;
                }
            });

            //Save an Editing Row
            $('#editabledatatable').on("click", 'a.save', function(e) {
                e.preventDefault();
                if (this.innerHTML.indexOf("Save") >= 0) {
                    saveRow(oTable, isEditing);
                    isEditing = null;
                    //Some Code to Highlight Updated Row
                }
            });


            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<a href="#" class="btn btn-success btn-xs save"><i class="fa fa-save"></i> Save</a> <a href="#" class="btn btn-warning btn-xs cancel"><i class="fa fa-times"></i> Cancel</a>';
            }

            function editAddedRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = aData[4];
            }

            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate('<a href="#" class="btn btn-info btn-xs edit"><i class="fa fa-edit"></i> Edit</a> <a href="#" class="btn btn-danger btn-xs delete"><i class="fa fa-trash-o"></i> Delete</a>', nRow, 4, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate('<a href="#" class="btn btn-info btn-xs edit"><i class="fa fa-edit"></i> Edit</a> <a href="#" class="btn btn-danger btn-xs delete"><i class="fa fa-trash-o"></i> Delete</a>', nRow, 4, false);
                oTable.fnDraw();
            }
        }

    };
}();
var InitiateExpandableDataTable = function() {
    return {
        init: function() {
            /* Formatting function for row details */
            function fnFormatDetails(oTable, nTr) {
                var aData = oTable.fnGetData(nTr);
                var sOut = '<table>';
                sOut += '<tr><td rowspan="5" style="padding:0 10px 0 0;"><img src="assets/img/avatars/' + aData[6] + '"/></td><td>Name:</td><td>' + aData[1] + '</td></tr>';
                sOut += '<tr><td>Family:</td><td>' + aData[2] + '</td></tr>';
                sOut += '<tr><td>Age:</td><td>' + aData[3] + '</td></tr>';
                sOut += '<tr><td>Positon:</td><td>' + aData[4] + '</td></tr>';
                sOut += '<tr><td>Others:</td><td><a href="">Personal WebSite</a></td></tr>';
                sOut += '</table>';
                return sOut;
            }

            /*
             * Insert a 'details' column to the table
             */
            var nCloneTh = document.createElement('th');
            var nCloneTd = document.createElement('td');
            nCloneTd.innerHTML = '<i class="fa fa-plus-square-o row-details"></i>';

            $('#expandabledatatable thead tr').each(function() {
                this.insertBefore(nCloneTh, this.childNodes[0]);
            });

            $('#expandabledatatable tbody tr').each(function() {
                this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
            });

            /*
             * Initialize DataTables, with no sorting on the 'details' column
             */
            var oTable = $('#expandabledatatable').dataTable({
                "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "aoColumnDefs": [
                    { "bSortable": false, "aTargets": [0] },
                    { "bVisible": false, "aTargets": [6] }
                ],
                "aaSorting": [[1, 'asc']],
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"]
                ],
                "iDisplayLength": 5,
                "oTableTools": {
                    "aButtons": [
                        "copy",
                        "print",
                        {
                            "sExtends": "collection",
                            "sButtonText": "Save <i class=\"fa fa-angle-down\"></i>",
                            "aButtons": ["csv", "xls", "pdf"]
                        }
                    ],
                    "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf"
                },
                "language": {
                    "search": "",
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                }
            });


            $('#expandabledatatable').on('click', ' tbody td .row-details', function() {
                var nTr = $(this).parents('tr')[0];
                if (oTable.fnIsOpen(nTr)) {
                    /* This row is already open - close it */
                    $(this).addClass("fa-plus-square-o").removeClass("fa-minus-square-o");
                    oTable.fnClose(nTr);
                } else {
                    /* Open this row */
                    $(this).addClass("fa-minus-square-o").removeClass("fa-plus-square-o");;
                    oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
                }
            });

            $('#expandabledatatable_column_toggler input[type="checkbox"]').change(function() {
                var iCol = parseInt($(this).attr("data-column"));
                var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
                oTable.fnSetColumnVis(iCol, (bVis ? false : true));
            });

            $('body').on('click', '.dropdown-menu.hold-on-click', function(e) {
                e.stopPropagation();
            });
        }
    };
}();
var InitiateSearchableDataTable = function () {
    return {
        init: function () {
            var oTable = $('#searchable').dataTable({
                "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "aaSorting": [[1, 'asc']],
                "aLengthMenu": [
                    [5, 10, 20, -1],
                    [5, 10, 20, "ALL"]
                ],
                "iDisplayLength": -1,
                "oTableTools": {
                    "aButtons": [
                        "copy",
                    ],
                    "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf"
                },
                "language": {
                    "search": "",
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Ant.",
                        "sNext": "Sig."
                    }
                }
            });


            //Check All Functionality
            $('#searchable thead th input[type=checkbox]').change(function () {
                var set = oTable.fnGetNodes();

                $(set).each(function () {
                    var checked = $('[type="checkbox"]', this);

                    if (!checked.is(":checked")) {
                        checked.prop("checked", true);
                        checked.parents('tr').addClass("active");
                        selectList.push(checked.prop("id"));
                    } else {
                        $(checked).prop("checked", false);
                        $(checked).parents('tr').removeClass("active");
                        var index = selectList.indexOf(checked.prop("id"));
                        selectList.splice(index, 1);
                    }
                });

            });

            $('#searchable tbody tr input[type=checkbox]').change(function () {
                $(this).parents('tr').toggleClass("active");
            });

            $("tfoot input").keyup(function () {
                /* Filter on the column (the index) of this element */
                oTable.fnFilter(this.value, $("tfoot input").index(this));
            });
        }
    };
}();

var InitiateSearchableDataTableTickets = function () {
    return {
        init: function () {
            var oTable = $('#searchable').dataTable({
                "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "aaSorting": [[1, 'asc']],
                "aLengthMenu": [
                    [5, 10, 20, -1],
                    [5, 10, 20, "ALL"]
                ],
                "iDisplayLength": 5,
                "oTableTools": {
                    "aButtons": [
                        "copy",
                    ],
                    "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf"
                },
                "language": {
                    "search": "",
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Ant.",
                        "sNext": "Sig."
                    }
                }
            });


            //Check All Functionality
            $('#searchable thead th input[type=checkbox]').change(function () {
                var set = oTable.fnGetNodes();

                $(set).each(function () {
                    var checked = $('[type="checkbox"]', this);

                    if (!checked.is(":checked")) {
                        checked.prop("checked", true);
                        checked.parents('tr').addClass("active");
                        selectList.push(checked.prop("id"));
                    } else {
                        $(checked).prop("checked", false);
                        $(checked).parents('tr').removeClass("active");
                        var index = selectList.indexOf(checked.prop("id"));
                        selectList.splice(index, 1);
                    }
                });

            });

            $('#searchable tbody tr input[type=checkbox]').change(function () {
                $(this).parents('tr').toggleClass("active");
            });

            $("#headFilter input").keyup(function () {
            /* Filter on the column (the index) of this element */
                if ($("#headFilter input").index(this) === 0 || $("#headFilter input").index(this) === 5) {
                    if (this.value == "") {
                        oTable.fnFilter(this.value, $("#headFilter input").index(this));
                    } else {
                        oTable.fnFilter("^" + this.value + "$", $("#headFilter input").index(this), true, false);
                    }
                } else {
                    oTable.fnFilter(this.value, $("#headFilter input").index(this));
                }

                //calculamos totales de la tabla
                let table = $('#searchable').DataTable();
                let movidos = table.column(11, { search: 'applied' }).data().sum();
                let totales = table.column(10, { search: 'applied' }).data().sum();
                let porcentaje = (movidos * 100) / totales;
                let pendientes = totales - movidos;
                let porcentajePen = (porcentaje * -1) + 100;
                
                $('#movidos').html("<strong>" + addCommas(movidos) + "</strong>")
                $('#porc_movidos').html("<strong>" + porcentaje.toFixed(1) + " %</strong>")

                $('#graph_movidos').html('<div data-toggle="easypiechart" class="easyPieChart block-center" style="margin: 0px auto; width: 100px; height: 100px; line-height: 100px;" data-barcolor="#5db2ff" data-linecap="butt" data-percent="' + porcentaje.toFixed(1) +
                    '" data-animate="2500" data-linewidth="5" data-size="100" data-trackcolor="#fff"><span class="white font-180"><i class="glyphicon glyphicon-thumbs-up blue"></i></span><canvas width="100" height="100"></canvas></div >');

                if ($("#typeOperation").children("option:selected").val() === "P") {

                    let total_fulls = table.column(13, { search: 'applied' }).data().sum();
                    let total_fulls_empacados = table.column(14, { search: 'applied' }).data().sum();
                    let porcentaje_fulls = (total_fulls_empacados * 100) / total_fulls;

                    totales = total_fulls;
                    pendientes = total_fulls - total_fulls_empacados;
                    porcentajePen = (porcentaje_fulls * -1) + 100;

                    $('#empacados').html("<strong>" + addCommas(total_fulls_empacados) + "</strong>")
                    $('#porc_empacados').html("<strong>" + porcentaje_fulls.toFixed(1) + " %</strong>")

                    $('#graph_empacados').html('<div data-toggle="easypiechart" class="easyPieChart block-center" style="margin: 0px auto; width: 100px; height: 100px; line-height: 100px;" data-barcolor="#A0D468" data-linecap="butt" data-percent="' + porcentaje_fulls.toFixed(1) +
                        '" data-animate="2500" data-linewidth="5" data-size="100" data-trackcolor="#fff"><span class="white font-180"><i class="glyphicon glyphicon-folder-close palegreen"></i></span><canvas width="100" height="100"></canvas></div >');
                }

                $('#totales').html("<strong>" + addCommas(totales) + "</strong>")
                $('#pendientes').html("<strong>" + addCommas(pendientes) + "</strong>")
                $('#porc_pendientes').html("<strong>" + porcentajePen.toFixed(1) + " %</strong>")
                $('#graph_pendientes').html('<div data-toggle="easypiechart" class="easyPieChart block-center" style="margin: 0px auto; width: 100px; height: 100px; line-height: 100px;" data-barcolor="#C72700" data-linecap="butt" data-percent="' + porcentajePen.toFixed(1) +
                    '" data-animate="2500" data-linewidth="5" data-size="100" data-trackcolor="#fff" ><span class="white font-180"><i class="glyphicon glyphicon-hand-left red"></i></span> <canvas width="100" height="100"></canvas></div >'); 

                InitiateEasyPieChart.init();
            });
        }
    };
}();

var InitiateSearchableDataTable2 = function () {
    return {
        init: function () {
            var oTable = $('#searchable2').dataTable({
                "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "aaSorting": [[1, 'asc']],
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "ALL"]
                ],
                "iDisplayLength": 5,
                "oTableTools": {
                    "aButtons": [
                        "copy",
                    ],
                    "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf"
                },
                "language": {
                    "search": "",
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Ant.",
                        "sNext": "Sig."
                    }
                }
            });


            //Check All Functionality
            $('#searchable2 thead th input[type=checkbox]').change(function () {
                var set = oTable.fnGetNodes();

                $(set).each(function () {
                    var checked = $('[type="checkbox"]', this);

                    if (!checked.is(":checked")) {
                        checked.prop("checked", true);
                        checked.parents('tr').addClass("active");
                        selectList.push(checked.prop("id"));
                    } else {
                        $(checked).prop("checked", false);
                        $(checked).parents('tr').removeClass("active");
                        var index = selectList.indexOf(checked.prop("id"));
                        selectList.splice(index, 1);
                    }
                });

            });
            $('#searchable2 tbody tr input[type=checkbox]').change(function () {
                $(this).parents('tr').toggleClass("active");
            });

        }
    };
}();

var InitiateSearchableDataTable3 = function () {
    return {
        init: function () {
            var oTable = $('#searchable3').dataTable({
                "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "aaSorting": [[1, 'asc']],
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "ALL"]
                ],
                "iDisplayLength": 5,
                "oTableTools": {
                    "aButtons": [
                        "copy",
                    ],
                    "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf"
                },
                "language": {
                    "search": "",
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "Ant.",
                        "sNext": "Sig."
                    }
                }
            });


            //Check All Functionality
            $('#searchable3 thead th input[type=checkbox]').change(function () {
                var set = oTable.fnGetNodes();

                $(set).each(function () {
                    var checked = $('[type="checkbox"]', this);

                    if (!checked.is(":checked")) {
                        checked.prop("checked", true);
                        checked.parents('tr').addClass("active");
                        selectList.push(checked.prop("id"));
                    } else {
                        $(checked).prop("checked", false);
                        $(checked).parents('tr').removeClass("active");
                        var index = selectList.indexOf(checked.prop("id"));
                        selectList.splice(index, 1);
                    }
                });

            });
            $('#searchable3 tbody tr input[type=checkbox]').change(function () {
                $(this).parents('tr').toggleClass("active");
            });

        }
    };
}();

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}