<?php
/**
 * UI-mod Plugin Legacy functions
 * Provides compatibility with different UNRAID versions
 */

// Create mk_option function if it doesn't exist (for older UNRAID versions)
if (!function_exists('mk_option')) {
    function mk_option($selected, $value, $text) {
        return '<option value="'.$value.'"'.($selected == $value ? ' selected' : '').'>'.$text.'</option>';
    }
}

// Hook into the UNRAID web interface by including our script in page_head
$docroot = $docroot ?? $_SERVER['DOCUMENT_ROOT'] ?: '/usr/local/emhttp';
$plugin = 'UI-mod';

// Enable automatic inclusion in all UNRAID pages
if (!file_exists("$docroot/plugins/dynamix/include/PageBuilder.php")) {
    // For older UNRAID versions
    if (file_exists("$docroot/plugins/dynamix/include/addons.php")) {
        $script = "/plugins/$plugin/UI-mod.php";
        if (!in_array($script, $_SERVER['addons'])) {
            $_SERVER['addons'][] = $script;
        }
    }
} else {
    // For newer UNRAID versions - inject our script into page_head
    $hookFile = "$docroot/plugins/dynamix/include/addons.php";
    $hookScript = "\n<?php\n// Added by $plugin plugin\nrequire_once('/usr/local/emhttp/plugins/$plugin/UI-mod.php');\n?>\n";
    
    if (file_exists($hookFile)) {
        $currentHook = file_get_contents($hookFile);
        if (strpos($currentHook, "// Added by $plugin plugin") === false) {
            file_put_contents($hookFile, $hookScript, FILE_APPEND);
        }
    }
} 