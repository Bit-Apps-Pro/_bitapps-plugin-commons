<?php

namespace BitApps\Utils\HTTP\Controllers;

use BitApps\Utils\Services\LicenseService;

use BitApps\Utils\UtilsConfig;

final class LicenseController
{
    private $httpClient;

    public function __construct()
    {
        $httpClass = UtilsConfig::getClassPreFix() . 'WPKit\Http\Client\HttpClient';

        if (class_exists($httpClass)) {
            $this->httpClient = (new $httpClass())->setBaseUri(UtilsConfig::getApiEndPoint());
        }
    }

    public function activateLicense()
    {
        // TODO:: IMPLEMENT REQUEST VALIDATION
        // $validated = $request->validate(
        //     [
        //         'licenseKey' => ['required', 'sanitize:text']
        //     ]
        // );
        $licenseKey = $_POST['licenseKey'];

        $data['licenseKey'] = $licenseKey;

        $data['domain'] = site_url();

        $data['slug'] = UtilsConfig::getProPluginSlug();

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

            return true;
        }

        return wp_send_json_error(
            ['message' => empty($licenseActivationResponse->message) ? 'Unknown error occurred' : $licenseActivationResponse->message]
        );
    }

    public function deactivateLicense()
    {
        $licenseData = get_option(UtilsConfig::getProPluginPrefix() . 'license_data');

        if (!empty($licenseData) && \is_array($licenseData) && $licenseData['status'] === 'success') {
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

        return wp_send_json_error(
            ['message' => 'License data is missing']
        );
    }

    public function checkLicenseStatus()
    {
        $licenseData = get_option(UtilsConfig::getProPluginPrefix() . 'license_data');

        $status = (bool) (!empty($licenseData) && \is_array($licenseData) && $licenseData['status'] === 'success');

        return wp_send_json_success(
            ['status' => $status, 'message' => $status ? 'License is active' : 'License is not active']
        );
    }
}
