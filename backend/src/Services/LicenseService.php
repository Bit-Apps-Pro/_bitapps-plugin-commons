<?php

namespace BitApps\Utils\Services;

use BitApps\Utils\UtilsConfig;
use WP_Error;

class LicenseService
{
    public static function isLicenseActive()
    {
        $licenseData = get_option(UtilsConfig::getProPluginPrefix() . 'license_data');

        return (bool) (!empty($licenseData) && \is_array($licenseData) && $licenseData['status'] === 'success');
    }

    public static function removeLicenseData()
    {
        return delete_option(UtilsConfig::getProPluginPrefix() . 'license_data');
    }

    public static function setLicenseData($licenseKey, $licData)
    {
        $data['key'] = $licenseKey;

        $data['status'] = $licData->status;

        $data['expireIn'] = $licData->expireIn;

        return update_option(UtilsConfig::getProPluginPrefix() . 'license_data', $data, null);
    }

    public static function getUpdatedInfo()
    {
        $licenseData = get_option(UtilsConfig::getProPluginPrefix() . 'license_data');
        $licenseKey = '';

        if (!empty($licenseData) && \is_array($licenseData) && $licenseData['status'] === 'success') {
            $licenseKey = $licenseData['key'];
        }
        $httpClass = UtilsConfig::getClassPreFix() . 'WPKit\Http\Client\HttpClient';

        $client = (new $httpClass())->setBaseUri(UtilsConfig::getApiEndPoint());

        $pluginInfoResponse = $client->get('/update/' . UtilsConfig::getProPluginSlug());

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

        $dateTimeClass = UtilsConfig::getClassPreFix() . 'WPKit\Helpers\DateTimeHelper';

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
            $pluginData->downloadLink = UtilsConfig::getApiEndPoint() . '/download/' . $licenseKey;
        } else {
            $pluginData->downloadLink = '';
        }

        return $pluginData;
    }
}
