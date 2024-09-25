<?php

namespace BitApps\Utils;

final class UtilsConfig
{
    public static $freePluginVersion;

    public static $proPluginVersion;

    public static $freePluginSlug;

    public static $proPluginSlug;

    public static $freePluginPrefix;

    public static $proPluginPrefix;

    public static $freePluginTitle;

    public static $apiEndPoint;

    public static $pluginNamespace;

    public static function setFreePluginVersion(string $freePluginVersion)
    {
        self::$freePluginVersion = $freePluginVersion;
    }

    public static function setPluginNamespace(string $pluginNamespace)
    {
        self::$pluginNamespace = $pluginNamespace;
    }

    public static function setProPluginVersion(string $proPluginVersion)
    {
        self::$proPluginVersion = $proPluginVersion;
    }

    public static function setFreePluginSlug(string $freePluginSlug)
    {
        self::$freePluginSlug = $freePluginSlug;
    }

    public static function setProPluginSlug(string $proPluginSlug)
    {
        self::$proPluginSlug = $proPluginSlug;
    }

    public static function setFreePluginPrefix(string $freePluginPrefix)
    {
        self::$freePluginPrefix = $freePluginPrefix;
    }

    public static function setProPluginPrefix(string $proPluginPrefix)
    {
        self::$proPluginPrefix = $proPluginPrefix;
    }

    public static function setFreePluginTitle(string $freePluginTitle)
    {
        self::$freePluginTitle = $freePluginTitle;
    }

    public static function setApiEndPoint(string $apiEndPoint)
    {
        self::$apiEndPoint = $apiEndPoint;
    }

    public static function getFreePluginVersion()
    {
        return self::$freePluginVersion;
    }

    public static function getProPluginVersion()
    {
        return self::$proPluginVersion;
    }

    public static function getFreePluginSlug()
    {
        return self::$freePluginSlug;
    }

    public static function getProPluginSlug()
    {
        return self::$proPluginSlug;
    }

    public static function getFreePluginPrefix()
    {
        return self::$freePluginPrefix;
    }

    public static function getProPluginPrefix()
    {
        return self::$proPluginPrefix;
    }

    public static function getFreePluginTitle()
    {
        return self::$freePluginTitle;
    }

    public static function getApiEndPoint()
    {
        return self::$apiEndPoint;
    }

    public static function getClassPreFix()
    {
        return !empty(self::$pluginNamespace) ? self::$pluginNamespace : 'BitApps\\' . self::convertToCamelCase(self::$freePluginSlug) . '\\Deps\\BitApps\\';
    }

    private static function convertToCamelCase($slug)
    {
        $slugParts = \array_slice(explode('-', $slug), -2);

        return implode('', array_map('ucfirst', $slugParts));
    }
}
