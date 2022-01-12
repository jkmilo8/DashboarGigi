<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ViewSwitcher.ascx.cs" Inherits="ggi_dashboard_app.ViewSwitcher" %>
<div id="viewSwitcher">
    <script>
   window.location.href = '<%: SwitchUrl %>';
    </script>
    <%: CurrentView %> view | <a href="<%: SwitchUrl %>" data-ajax="false">Switch to <%: AlternateView %></a>
</div>