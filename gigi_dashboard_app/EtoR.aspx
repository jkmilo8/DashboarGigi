<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EtoR.aspx.cs" Inherits="ggi_dashboard_app.EtoR" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <title>GGI EtoR</title>
    <link href="Content/ggiStyle.css" rel="stylesheet" />
    <link href="Content/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="Content/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="Content/dataTables.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="Content/glyphicons.css" rel="stylesheet" />
    <link href="Content/navbar.css" rel="stylesheet" />
    <link href="Content/select.dataTables.min.css" rel="stylesheet" />
    <link href="Content/typicons.min.css" rel="stylesheet" />
    <link href="Content/beyond.min.css" rel="stylesheet" />
    <link href="Content/animate.min.css" rel="stylesheet" />
    <link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css' />

    <script src="Scripts/jquery-3.3.1.js"></script>
    <script src="Scripts/jquery.dataTables.min.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
    <script src="Scripts/bootstrap.js"></script>
    <script src="Scripts/dataTables.bootstrap.min.js"></script>
    <script src="Scripts/bootstrap-datetimepicker.js"></script>
    <script src="Scripts/dataTables.select.min.js"></script>
    <script src="Scripts/dataTables.rowGroup.min.js"></script>
    <script src="Scripts/bootstrap-waitingfor.js"></script>

    <script src="Scripts/jquery.gauge.js"></script>

</head>
<body>
    <nav class="navbar greenBack">
        <div class="container-fluid">
            <ul class="nav navbar-nav bs-glyphicons-home">
                <li id="Home"><a class="navbar-brand" href="Default.aspx"><span class=" glyphicon glyphicon-home white" aria-hidden="true"></span></a></li>
                <li id="Title"><a class="navbar-brand"><span>
                    <p>GGI EtoR</p>
                </span></a></li>
            </ul>
            <a class="navbar-brand pull-right">
                <img src="Content/images/gg.jfif" height="102" width="102" /></a>
        </div>
    </nav>
    <form id="form1" runat="server">
        <div id="bg"></div>
        <div class="container-fluid">
            <div id="errormessage" class="alert alert-info alert-dismissible fade show" role="alert">
                <label id="message"></label>
                <button id="btnerrormessage" type="button" class="close">x</button>
            </div>
            <div id="panel" class="panel panel-default widget-body bordered-left bordered-green">
                <div class="row">
                    <div class="col-lg-2">
                        <div class="form-group">
                            <div class="control-label ">Date From</div>
                            <div class='input-group date form_date' id='datetimepickerIni'>
                                <input id="dtpIni" runat="server" class="form-control fontGoods" readonly="true" />
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            <div class="control-label ">Date To</div>
                            <div class='input-group date form_date' id='datetimepickerFin'>
                                <input id="dtpFnl" runat="server" class="form-control fontGoods" readonly="true" />
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            <div class="control-label  ">Store #</div>
                            <asp:TextBox ID="storeNum" runat="server" CssClass="form-control fontGoods input-Filter"></asp:TextBox>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            <div class="control-label  ">Region #</div>
                            <asp:TextBox ID="storeReg" runat="server" CssClass="form-control fontGoods input-Filter"></asp:TextBox>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="form-group">
                            <br />
                            <input id="btnSearch" type="button" value="Load" class="btn btn-primary btn-primary basic btn-success" onclick="GetEtoRInfo()" />
                        </div>
                    </div>
                    <div class="col-lg-2" style="text-align: left;">
                        <div class="bs-glyphicons">
                            <ul class="bs-glyphicons-list">
                                <li id="Export">
                                    <span class="glyphicon glyphicon-save-file" aria-hidden="true"></span>
                                    <span class="glyphicon-class">Export Data</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <asp:ScriptManager runat="server"></asp:ScriptManager>
                </div>
            </div>
            <div id="panel-table" class="panel panel-default widget-body bordered-left bordered-green">
                <table id="EtoRTable" class="table  table-bordered">
                    <thead>
                        <tr>                            
                            <th>Region</th>
                            <th>Store Number</th>
                            <th>Store Receipts</th>
                            <th>Total Pay</th>
                            <th>%E/R</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                     <tfoot>
                        <tr>
                            <th colspan="2" style="text-align: right" class="tfoot">Total:</th>
                            <th class="tfoot"></th>
                            <th class="tfoot"></th>
                            <th class="tfoot"></th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div id="container" width="500" height="500"></div>

        </div>
        <script src="Scripts/ggiEtoR.js"></script>
    </form>
</body>
</html>


