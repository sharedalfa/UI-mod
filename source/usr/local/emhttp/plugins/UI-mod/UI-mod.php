<?php
/**
 * UI-mod Plugin
 * Modifies the UNRAID UI with various enhancements
 */

// Get plugin directory path
$plugin = 'UI-mod';
$pluginPath = '/plugins/'.$plugin;
$docroot = $docroot ?? $_SERVER['DOCUMENT_ROOT'] ?: '/usr/local/emhttp';

// Check if plugin is enabled
$cfg = parse_plugin_cfg($plugin);
$enabled = $cfg['ENABLED'] ?? 'yes';

if ($enabled === 'yes') {
    // Add Clickable Links feature
    if (($cfg['CLICKABLE_LINKS'] ?? 'yes') === 'yes') {
        echo '<link type="text/css" rel="stylesheet" href="'.$pluginPath.'/include/clickable-links.css">'."\n";
        echo '<script type="text/javascript" src="'.$pluginPath.'/include/clickable-links.js"></script>'."\n";
    }
    
    // Future features can be added here
    // ...
}

/**
 * Helper function to parse plugin configuration
 */
function parse_plugin_cfg($plugin) {
    $plugincfg = [];
    $cfgFile = "/boot/config/plugins/$plugin/$plugin.cfg";
    
    if (file_exists($cfgFile)) {
        $cfg = file($cfgFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($cfg as $line) {
            // Skip comments
            if (preg_match('/^#/', $line)) continue;
            
            // Parse key-value pairs
            if (preg_match('/^(.+?)="(.+?)"$/', $line, $matches)) {
                $plugincfg[$matches[1]] = $matches[2];
            }
        }
    }
    
    return $plugincfg;
} 