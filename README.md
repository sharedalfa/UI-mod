# UI-mod Plugin for UNRAID

This plugin provides various UI enhancements for the UNRAID web interface.

## Features

### Current Features
- **Clickable Links**: Automatically converts IP:port combinations into clickable links that open in a new tab.
  - Works with both IPv4 and IPv6 addresses
  - Links open in a new tab with `target="_blank"`
  - Adds a subtle visual indicator to links
  - Works on dynamically loaded content

### Planned Features
- More UI enhancements to be added in future updates

## Examples

The Clickable Links feature will convert text like:
- `192.168.1.100:8080` → [192.168.1.100:8080](http://192.168.1.100:8080)
- `[fe80::1]:8080` → [[fe80::1]:8080](http://[fe80::1]:8080)

## Manual Installation

If you prefer to install manually:

1. Download the plugin .plg file
2. Navigate to your UNRAID server's Plugins page
3. Click on "Install Plugin" and select the downloaded .plg file
4. The plugin will be installed and activated automatically

## Compatibility

- Requires UNRAID 6.9.0 or later
- Tested on UNRAID 6.9.x and 6.10.x

## License

This plugin is released under the MIT License.

## Author

Created by Akash

## Support

For support, please visit the plugin's support thread on the UNRAID forums. 