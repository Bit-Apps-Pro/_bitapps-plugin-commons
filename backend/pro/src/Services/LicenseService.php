<?php

namespace BitApps\Utils\Services;

use BitApps\Utils\PluginCommonConfig;
use WP_Error;

class LicenseService
{
    public static function isLicenseActive()
    {
        $licenseData = get_option(PluginCommonConfig::getProPluginPrefix() . 'license_data');

        return (bool) (!empty($licenseData) && \is_array($licenseData) && $licenseData['status'] === 'success');
    }

    public static function removeLicenseData()
    {
        return delete_option(PluginCommonConfig::getProPluginPrefix() . 'license_data');
    }

    public static function setLicenseData($licenseKey, $licData)
    {
        $data['key'] = $licenseKey;

        $data['status'] = $licData->status;

        $data['expireIn'] = $licData->expireIn;

        if (is_multisite()) {
            $networkSites = get_sites();

            foreach ($networkSites as $site) {
                switch_to_blog($site->blog_id);

                update_option(PluginCommonConfig::getProPluginPrefix() . 'license_data', $data, null);

                restore_current_blog();
            }
        } else {
            update_option(PluginCommonConfig::getProPluginPrefix() . 'license_data', $data, null);
        }
    }

    public static function getUpdatedInfo()
    {
        $licenseData = get_option(PluginCommonConfig::getProPluginPrefix() . 'license_data');
        $licenseKey = '';

        if (!empty($licenseData) && \is_array($licenseData) && $licenseData['status'] === 'success') {
            $licenseKey = $licenseData['key'];
        }
        $httpClass = PluginCommonConfig::getVendorClassPrefix() . 'WPKit\Http\Client\HttpClient';

        $client = (new $httpClass())->setBaseUri(PluginCommonConfig::getApiEndPoint());

        $pluginInfoResponse = $client->get('/update/' . PluginCommonConfig::getProPluginSlug());

        if (is_wp_error($pluginInfoResponse)) {
            return $pluginInfoResponse;
        }

        if (!empty($pluginInfoResponse->status) && $pluginInfoResponse->status == 'expired') {
            self::removeLicenseData();

            return new WP_Error('API_ERROR', $pluginInfoResponse->message);
        }

        if (empty($pluginInfoResponse->data)) {
            return new WP_Error('API_ERROR', $pluginInfoResponse->message);
        }

        $pluginData = $pluginInfoResponse->data;

        $dateTimeClass = PluginCommonConfig::getVendorClassPrefix() . 'WPKit\Helpers\DateTimeHelper';

        $dateTimeHelper = new $dateTimeClass();

        $pluginData->updatedAt = $dateTimeHelper->getFormated($pluginData->updatedAt, 'Y-m-d\TH:i:s.u\Z', $dateTimeClass::wp_timezone(), 'Y-m-d H:i:s', null);

        if (!empty($pluginData->details)) {
            $pluginData->sections['description'] = $pluginData->details;
        } else {
            $pluginData->sections['description'] = '';
        }

        if (!empty($pluginData->changelog)) {
            $pluginData->sections['changelog'] = $pluginData->changelog;
        } else {
            $pluginData->sections['changelog'] = '';
        }

        if ($licenseKey) {
            $pluginData->downloadLink = PluginCommonConfig::getApiEndPoint() . '/download/' . $licenseKey;
        } else {
            $pluginData->downloadLink = '';
        }

        return $pluginData;
    }
}
