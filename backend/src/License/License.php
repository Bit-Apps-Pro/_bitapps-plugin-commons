<?php

namespace BitApps\PiPro\License;

use BitApps\PiPro\Config;

final class License
{
    public function handleLicense()
    {
        $licenseData = Config::getOption('license_data', null);

        $args = [
            'currentAdminUrl' => admin_url(basename($_SERVER['REQUEST_URI'])),
            'appDirPath'      => Config::get('BACKEND_APP_DIR'),
            'pluginTitle'     => Config::FREE_PLUGIN_TITLE
        ];

        if (!empty($licenseData) && $licenseData['status'] === 'success') {
            if (isset($_POST['disconnect'])) {
                $args['licenseDisconnectStatus'] = API::disconnectLicense();
                $args['disconnect'] = sanitize_text_field($_POST['disconnect']);
            }

            return load_template(Config::get('BACKEND_APP_DIR') . '/' . 'Views/license/status.php', true, $args);
        }

        if (isset($_REQUEST['licenseKey'])) {
            $licenseKey = sanitize_text_field($_REQUEST['licenseKey']);

            $response = API::activateLicense($licenseKey);

            if ($response === true) {
                $args['success'] = true;
                $args['errorMessage'] = '';
            } else {
                $args['success'] = false;
                $args['errorMessage'] = $response;
            }
        } else {
            $args['success'] = false;
        }

        return load_template(Config::get('BACKEND_APP_DIR') . '/' . 'Views/license/add.php', true, $args);
    }
}
