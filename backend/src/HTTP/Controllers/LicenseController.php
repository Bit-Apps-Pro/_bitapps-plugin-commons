<?php

namespace BitApps\Utils\HTTP\Controllers;

use BitApps\Utils\Services\LicenseService;
use BitApps\Utils\UtilsConfig;
use BitApps\WPKit\Http\Client\HttpClient;
use BitApps\WPKit\Http\Request\Request;

final class LicenseController
{
    private $httpClient;

    public function __construct()
    {
        $this->httpClient = (new HttpClient())->setBaseUri(UtilsConfig::getApiEndPoint());
    }

    public function activateLicense(Request $request)
    {
        $validated = $request->validate(
            [
                'licenseKey' => ['required', 'sanitize:text']
            ]
        );

        $data['licenseKey'] = $validated->licenseKey;

        $data['domain'] = site_url();

        $data['slug'] = UtilsConfig::getProPluginSlug();

        $this->httpClient->setHeaders([
            'content-type' => 'application/json',
        ]);

        $this->httpClient->setBody($data);

        $licenseActivationResponse = $this->httpClient->post('/activate');

        if (!is_wp_error($licenseActivationResponse) && $licenseActivationResponse->status === 'success') {
            LicenseService::setLicenseData($validated->licenseKey, $licenseActivationResponse);

            return true;
        }

        return empty($licenseActivationResponse->message) ? __('Unknown error occurred', 'bit-pi') : $licenseActivationResponse->message;
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

                return true;
            }

            return empty($licenseDeactivationResponse->message) ? 'Unknown error occurred' : $licenseDeactivationResponse->message;
        }

        return __('License data is missing', 'bit-pi');
    }
}
