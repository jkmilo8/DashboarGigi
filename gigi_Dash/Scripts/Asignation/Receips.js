
function loadReceips(WOid, SentWorkOrderQuantity, action, action2, action3, woNotes, hHidratacion, orderId, packages, name, dry, dryHour) {
    $('#loading').show();

    $.ajax({
        type: 'POST',
        url: action,
        dataType: 'json',
        data: { id: WOid, total: SentWorkOrderQuantity},
        success: function (mems) {
            var flo = 0;
            var stems = 0;
            var dryStems = 0;
            var contentPage = "";
            var contentTable = "";
            $("#receipsDetails").empty();

            $.each(mems, function (i, member) {
                contentTable = "";
                dryStems = 0;
                var totalBunches = member[0].Pack * member[0].Total
                $.each(member, function (i, memberReceip) {
                    if (memberReceip.ProductType == "FLO") {
                        flo = parseInt(memberReceip.Quantity.split('.')[0]) + flo;

                    } else {
                        dryStems = parseInt(memberReceip.Quantity.split('.')[0]) + dryStems;
                        if (flo > 0) {
                            contentTable +=
                                " <div class='row'>" +
                                "<div class='col-lg-10 col-sm-10 col-xs-10'>" +
                                "<p><strong>Stems: " + flo + "</strong></p>" +
                                "</div>" +
                                "<div class='col-lg-2 col-sm-2 col-xs-2'>" +
                                "<p><strong>Total Stems: " + flo * totalBunches + "</strong></p>" +
                                "</div>" +
                                "</div>";
                            stems = flo;
                            flo = 0;
                        }
                    }

                    var total = memberReceip.Total * memberReceip.Quantity.split('.')[0] * memberReceip.Pack;

                    contentTable +=
                        "<div class='row'>" +
                        "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                        "<p><strong>" + memberReceip.Quantity.split('.')[0] + "</strong></p>" +
                        "</div>" +
                        "<div class='col-lg-2 col-sm-2 col-xs-2'>" +
                        "<p >" + memberReceip.Description + "</p>" +
                        "</div>" +
                        "<div class='col-lg-2 col-sm-2 col-xs-2'>" +
                        "<p>" + memberReceip.ColorName + "</p>" +
                        "</div>" +
                        "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                        "<p>" + memberReceip.ColorDescription + "</p>" +
                        "</div>" +
                        "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                        "<p>" + memberReceip.VarietyName + "</p>" +
                        "</div>" +
                        "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                        "<p>" + (memberReceip.RFA ? memberReceip.RFA = "X" : memberReceip.RFA = "") + "</p>" +
                        "</div>" +
                        "<div class='col-lg-3 col-sm-3 col-xs-3'>" +
                        "<p>" + memberReceip.Notes + "</p>" +
                        "</div>" +
                        "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                        "<p>" + total + "</p>" +
                        "</div>" +
                        "</div>";
                });
                contentPage +=
                        
                    "<a  onclick=\"chargeTables('" + WOid + "','" + member[0].RecipeNumber + "','" + totalBunches + "','" + orderId + "','" + packages + "','" + action3 + "','" + stems + "','" + name + "','" + dry + "','" + dryHour + "','" + dryStems + "');\">" +
                "<div class='widget'>" +
                        "<div class='widget-header bordered-top bordered-blue'>" +
                            "<span class='widget-caption'><strong>Recipe #: </strong>" + member[0].RecipeNumber + " of " + member[0].Mayor + "<strong>  Pack: </strong>" + member[0].Pack + "<strong> Total Bunches: </strong>" + totalBunches + "</span>" +

                            "<div class='widget-buttons'>" +
                                "<span class='widget-caption'><strong></strong></span>" +
                            "</div>" +
                        "</div><!--Widget Header-->" +
                        "<div class='widget-body'>" +
                            "<div class='row'>" +
                                "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                                    "<p><strong>Stems</strong></p>" +
                                "</div>"+
                                "<div class='col-lg-2 col-sm-2 col-xs-2'>" +
                                    "<p><strong>Description</strong></p>" +
                                "</div>"+
                                "<div class='col-lg-2 col-sm-2 col-xs-2'>" +
                                    "<p><strong>Color</strong></p>" +
                                "</div>"+
                                "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                                    "<p><strong>Grade</strong></p>" +
                                "</div>"+
                                "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                                    "<p><strong>Variety</strong></p>" +
                                "</div>"+
                                "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                                    "<p><strong>RFA</strong></p>" +
                                "</div>"+
                                "<div class='col-lg-3 col-sm-3 col-xs-3'>" +
                                    "<p><strong>Notes</strong></p>" +
                                "</div>"+
                                "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                                    "<p><strong>Total</strong></p>" +
                                "</div>"+
                            "</div>"+
                            contentTable+
                        "</div><!--Widget Body-->"+
                    "</div>"+
                "</a>";
            });
            $("#receipsDetails").append(contentPage);
            $("#page_footer").hide();
        },

        error: function (ex) {                    
            $("#receipsDetails").empty();
            $('#loading').hide();
            javascript: Notify('Error ' + ex, 'top-right', '15000', 'danger', 'fa-check', true);
        }
    });

    $.ajax({
        type: 'POST',
        url: action2,
        dataType: 'json',
        data: { id: WOid},
        success: function (mems) {
            $("#receipsNotes").empty();
            var contentPage = "";
            $("#info_butom").show();

            contentPage +=
                "<a onclick='$(\"#page_footer\").hide();'>"+
                 "<div class='well bordered-top bordered-bottom bordered-palegreen'>" +
                    "<div class='row'>" +
                        "<div class='col-lg-2 col-sm-2 col-xs-2'>" +
                            "<p><strong>Production Notes: </strong></p>" +
                        "</div>" +
                         "<div class='col-lg-4 col-sm-4 col-xs-4 text-align-left'>" +
                            "<p>"+ woNotes +"</p>" +
                        "</div>" +
                        "<div class='col-lg-2 col-sm-2 col-xs-2 text-align-right'>" +
                            "<p><strong>Sales Notes: </strong></p>" +
                        "</div>" +
                         "<div class='col-lg-4 col-sm-4 col-xs-4 text-align-left'>" +
                            "<p>" + mems.OrderNotes + "</p>" +
                        "</div>" +
                    "</div>" +
                    
                    "<div class='row'>" +
                        "<div class='col-lg-1 col-sm-1 col-xs-1'>" +
                            "<p><strong>Sales Recipe</strong></p>" +
                        "</div>" +
                         "<div class='col-lg-11 col-sm-11 col-xs-11'>" +
                            "<p>"+ mems.Recipe + "</p>" +
                        "</div>" +
                    "</div>" +
                    "<div class='row'>" +
                        "<div class='col-lg-2 col-sm-2 col-xs-2'>" +
                            "<p><strong>Sales Type: </strong>" + mems.SaleTypeCode + "</p>" +
                        "</div>" +
                        "<div class='col-lg-2 col-sm-2 col-xs-2'>" +
                            "<p><strong>Food: </strong>" + mems.Food + "</p>" +
                        "</div>" +
                        "<div class='col-lg-2 col-sm-2 col-xs-2'>" +
                            "<p><strong>Carro: </strong>" + mems.Carro + "</p>" +
                        "</div>" +
                        "<div class='col-lg-3 col-sm-3 col-xs-3'>" +
                            "<p><strong>UPC: </strong>" + mems.UPC + "</p>" +
                        "</div>" +
                        "<div class='col-lg-2 col-sm-2 col-xs-2'>" +
                            "<p><strong>Retail: </strong>" + mems.Retail + "</p>" +
                        "</div>" +
                    "</div>" +
                    "<div class='row'>" +
                        "<div class='col-lg-4 col-sm-4 col-xs-4'>" +
                            "<p>" + mems.ConUPC + "</p>" +
                        "</div>" +
                        "<div class='col-lg-4 col-sm-4 col-xs-4'>" +
                            "<p><strong>Description: </strong>" + mems.LabelDescription + "</p>" +
                        "</div>" +
                        "<div class='col-lg-4 col-sm-4 col-xs-4'>" +
                            "<p><strong>Pull Date: </strong>" + mems.PullDate.split(' ')[0] + "</p>" +
                        "</div>" +
                    "</div>" +
                     "<div class='row'>" +
                        "<div class='col-lg-4 col-sm-4 col-xs-4'>" +
                            "<p><strong>Horas de hidratación y frio: </strong>" + hHidratacion + "</p>" +
                        "</div>" +
                        "<div class='col-lg-4 col-sm-4 col-xs-4'>" +
                            "<p><strong>Tallos por caja: </strong>por definir</p>" +
                        "</div>" +
                        "<div class='col-lg-4 col-sm-4 col-xs-4'>" +
                            "<p><strong>Case UPC: </strong>" + mems.CaseUPC + "</p>" +
                        "</div>" +
                    "</div>" +
                    "<div class='row'>" +
                        "<div class='col-lg-3 col-sm-3 col-xs-3'>" +
                            "<p><strong>Slot #: </strong>" + mems.SlotNumber + "</p>" +
                        "</div>" +
                        "<div class='col-lg-3 col-sm-3 col-xs-3'>" +
                            "<p><strong>Final Box Size: </strong>" + mems.Box + "</p>" +
                        "</div>" +
                        "<div class='col-lg-3 col-sm-3 col-xs-3'>" +
                            "<p><strong>Dry Std: </strong>" + mems.DryStandard + "</p>" +
                        "</div>" +
                        "<div class='col-lg-3 col-sm-3 col-xs-3'>" +
                            "<p><strong>Dry Hrs: </strong>" + mems.DryHrs + "</p>" +
                        "</div>" +
                    "</div>" +
                     "<div class='row'>" +
                        "<div class='col-lg-6 col-sm-6 col-xs-6'>" +
                            "<p><strong>PD: </strong>" + mems.PD + "</p>" +
                        "</div>" +
                        "<div class='col-lg-6 col-sm-6 col-xs-6'>" +
                            "<p><strong>Packaging Notes: </strong>" + mems.Box + "</p>" +
                        "</div>" +
                    "</div>" +
                "</div>"+
                "</a>"     ;

            $("#receipsNotes").append(contentPage);
            $('#loading').hide();
        },
        error: function (ex) {                    
        $("#receipsDetails").empty();
        $('#loading').hide();
        javascript: Notify('Error ' + ex, 'top-right', '15000', 'danger', 'fa-check', true);
    }
    });
}

function chargeTables(WOid, recipeNumber, total, orderId, packages, action, stems, name, dry, dryHour, dryStems) {
    $('#loading').show();

    $.ajax({
        type: 'POST',
        url: action,
        dataType: 'json',
        data: { woId: WOid, recipe:recipeNumber, total: total },
        success: function (mems) {
            if (mems > 0) {
                $("#selectTable").modal();
                $("#myLargeModalLabel").empty();
                $("#myLargeModalLabel").append("<strong>WOID: </strong>" + WOid + " <strong>Recipe # </strong>" + recipeNumber);
                $("#cantidad").empty();
                $("#cantidad").append("<input type='text' value='1' id='dial' data-orderId='" + orderId +
                    "' data-recipenumber='" + recipeNumber + "' data-woid='" + WOid + "' data-packages='" + packages +
                    "' data-stems='" + stems + "' data-recipename='" + name + "' data-dry='" + dry + "' data-dry-hour='" + dryHour +
                    "' data-dry-stems='" + dryStems +"'/>");
                $("#dial").knob(
                    {
                        'min': 1,
                        'max': mems,
                        'angleArc': 270
                    }
                );
                $("#divTables").append(WOid);
                $('#loading').hide();
            } else {
                $('#loading').hide();
                javascript: Notify('Asignaciones Completas', 'top-right', '5000', 'warning', 'fa-check', true);
            }
            
        },
        error: function (ex) {
            $("#receipsDetails").empty();
            $('#loading').hide();
            javascript: Notify('Error '+ex, 'top-right', '15000', 'danger', 'fa-check', true);
        }
    });
    
}

function saveTable(table, url) {

    $.ajax({
        type: 'POST',
        url: url,
        dataType: 'json',
        data: {
            orderId: $("#dial").data('orderid'), auxiliar: $('#auxiliar').val(), packages: $("#dial").data('packages'),
            WOID: $("#dial").data('woid'), farmID: $('#farmId').val(), recipeNumber: $("#dial").data('recipenumber'),
            identification: $('#identification').val(), tableId: table, quantity: $("#dial").val(), typeOperationId: 1,
            stems: $("#dial").data('stems'), name: $("#dial").data('recipename'), dry: $("#dial").data('dry'),
            dryHour: $("#dial").data('dry-hour'), dryStems: $("#dial").data('dry-stems')
        },
        success: function (mems) {
            $("#selectTable").modal('hide');
            $('#loading').hide();
            javascript: Notify('Asignado correctamente', 'top-right', '5000', 'success', 'fa-check', true);
        },
        error: function (ex) {
            
            $('#loading').hide();
            javascript: Notify('Error ' + ex, 'top-right', '15000', 'danger', 'fa-check', true);
        }
    });
}

$(document).ready(function () {
    $("#info_butom").hide();
    $("#page_footer").hide();
}); 