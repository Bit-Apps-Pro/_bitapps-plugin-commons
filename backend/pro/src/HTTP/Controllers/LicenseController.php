<?php

namespace BitApps\Utils\HTTP\Controllers;

use BitApps\Utils\PluginCommonConfig;
use BitApps\Utils\Services\LicenseService;

final class LicenseController
{
    private $httpClient;

    public function __construct()
    {
        $httpClass = PluginCommonConfig::getClassPreFix() . 'WPKit\Http\Client\HttpClient';

        if (class_exists($httpClass)) {
            $this->httpClient = (new $httpClass())->setBaseUri(PluginCommonConfig::getApiEndPoint());
        }
    }

    public function activateLicense()
    {
        $json_payload = file_get_contents('php://input');

        $req_data = json_decode($json_payload, true);

        $licenseKey = isset($req_data['licenseKey']) ? sanitize_text_field($req_data['licenseKey']) : '';

        if (empty($licenseKey)) {
            return wp_send_json_error(
                ['message' => 'License key is required']
            );
        }

        $data['licenseKey'] = $licenseKey;

        $data['domain'] = site_url();

        $data['slug'] = PluginCommonConfig::getProPluginSlug();

        $this->httpClient->setHeaders([
            'content-type' => 'application/json',
        ]);

        $this->httpClient->setBody($data);

        $licenseActivationResponse = $this->httpClient->post('/activate');

        if (!is_wp_error($licenseActivationResponse) && $licenseActivationResponse->status === 'success') {
            LicenseService::setLicenseData($licenseKey, $licenseActivationResponse);

            return wp_send_json_success(
                ['message' => 'License activated successfully']
            );
        }

        return wp_send_json_error(
            ['message' => empty($licenseActivationResponse->message) ? 'Unknown error occurred' : $licenseActivationResponse->message]
        );
    }

    public function deactivateLicense()
    {
        $licenseData = get_option(PluginCommonConfig::getProPluginPrefix() . 'license_data');

        if (empty($licenseData) || !\is_array($licenseData) || $licenseData['status'] !== 'success') {
            return wp_send_json_error(
                ['message' => 'License data is missing']
            );
        }

        $data['licenseKey'] = $licenseData['key'];

        $data['domain'] = site_url();

        $this->httpClient->setHeaders([
            'content-type' => 'application/json',
        ]);

        $this->httpClient->setBody($data);

        $licenseDeactivationResponse = $this->httpClient->post('/deactivate');

        if (!is_wp_error($licenseDeactivationResponse) && $licenseDeactivationResponse->status === 'success' || $licenseDeactivationResponse->code === 'INVALID_LICENSE') {
            LicenseService::removeLicenseData();

            return wp_send_json_success(
                ['message' => 'License deactivated successfully']
            );
        }

        return wp_send_json_error(
            ['message' => empty($licenseDeactivationResponse->message) ? 'Unknown error occurred' : $licenseDeactivationResponse->message]
        );
    }

    public function checkLicenseStatus()
    {
        $licenseData = get_option(PluginCommonConfig::getProPluginPrefix() . 'license_data');

        $status = (bool) (!empty($licenseData) && \is_array($licenseData) && $licenseData['status'] === 'success');

        return wp_send_json_success(
            ['status' => $status, 'message' => $status ? 'License is active' : 'License is not active']
        );
    }
}
