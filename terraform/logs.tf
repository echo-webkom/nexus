resource "azurerm_log_analytics_workspace" "vertex_log_ws" {
  name                = "echo-vertex-log-ws"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_application_insights" "vertex_ai" {
  name                = "ai-echo-vertex"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "Node.JS"
  workspace_id        = azurerm_log_analytics_workspace.vertex_log_ws.id
}

resource "azurerm_log_analytics_workspace" "axis_log_ws" {
  name                = "echo-axis-log-ws"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}


resource "azurerm_application_insights" "axis_ai" {
  name                = "ai-echo-axis"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "other"
  workspace_id        = azurerm_log_analytics_workspace.axis_log_ws.id
}

resource "azurerm_monitor_diagnostic_setting" "vertex_diagnostics" {
  name                       = "vertex-diagnostics"
  target_resource_id         = azurerm_linux_web_app.echo_vertex.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.vertex_log_ws.id

  enabled_log {
    category = "AppServiceAppLogs"
  }

  enabled_log {
    category = "AppServiceConsoleLogs"
  }

  enabled_log {
    category = "AppServiceHTTPLogs"
  }

  enabled_log {
    category = "AppServicePlatformLogs"
  }

  metric {
    category = "AllMetrics"
    enabled  = true
  }
}

resource "azurerm_monitor_diagnostic_setting" "axis_diagnostics" {
  name                       = "axis-diagnostics"
  target_resource_id         = azurerm_linux_web_app.echo_axis.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.axis_log_ws.id

  enabled_log {
    category = "AppServiceAppLogs"
  }

  enabled_log {
    category = "AppServiceConsoleLogs"
  }

  enabled_log {
    category = "AppServiceHTTPLogs"
  }

  enabled_log {
    category = "AppServicePlatformLogs"
  }

  metric {
    category = "AllMetrics"
    enabled  = true
  }
}
