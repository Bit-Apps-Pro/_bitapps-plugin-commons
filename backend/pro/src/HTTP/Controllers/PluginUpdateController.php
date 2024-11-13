<?php

namespace BitApps\Utils\HTTP\Controllers;

use Automatic_Upgrader_Skin;
use BitApps\Utils\ProPluginUpdater;
use BitApps\Utils\UtilsConfig;
use Plugin_Upgrader;

final class PluginUpdateController
{
    public function updatePlugin()
    {
        include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

        include_once ABSPATH . 'wp-admin/includes/plugin-install.php';

        $updatePlugins = get_site_transient('update_plugins');

        $pluginSlug = $this->getPluginSlug();

        $upgrader = (new Plugin_Upgrader(new Automatic_Upgrader_Skin()));

        $updatePlugins = $this->checkAndUpdateProPluginInCache($pluginSlug, $updatePlugins);

        if (isset($updatePlugins->response[$pluginSlug])) {
            $pluginUpgraded = $upgrader->upgrade($pluginSlug);

            if (is_wp_error($pluginUpgraded)) {
                return 'Error updating plugin: ' . $pluginUpgraded->get_error_message();
            }

            $pluginActivated = activate_plugin($pluginSlug);

            if (is_wp_error($pluginActivated)) {
                return 'Plugin updated successfully! But failed to activate plugin.';
            }

            return 'Plugin updated and activated successfully!';
        }

        return 'No updates available for your plugin.';
    }

    private function getPluginSlug()
    {
        $freePluginSlug = UtilsConfig::getFreePluginSlug();

        $proPluginSlug = UtilsConfig::getProPluginSlug();

        $proPluginVersion = UtilsConfig::getProPluginVersion();

        $freePluginVersion = UtilsConfig::getFreePluginVersion();

        if ($proPluginVersion > $freePluginVersion) {
            $pluginSlug = $freePluginSlug . '/' . $freePluginSlug . '.php';
        } else {
            $pluginSlug = $proPluginSlug . '/' . $proPluginSlug . '.php';
        }

        return $pluginSlug;
    }

    private function checkAndUpdateProPluginInCache($pluginSlug, $updatePlugins)
    {
        if ($pluginSlug === UtilsConfig::getProPluginSlug() . '.php' && !isset($updatePlugins->response[$pluginSlug])) {
            $updatedPluginCache = (new ProPluginUpdater())->checkCacheData($updatePlugins);
            set_site_transient('update_plugins', $updatedPluginCache);

            return get_site_transient('update_plugins');
        }

        return $updatePlugins;
    }
}
