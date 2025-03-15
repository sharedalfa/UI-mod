/**
 * UI-mod Plugin - Clickable Links Feature
 * 
 * This script finds IP:port combinations in the page and converts them to clickable links.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Run immediately on load
    makeLinksClickable();
    
    // Set up a MutationObserver to handle dynamically added content
    const observer = new MutationObserver(function(mutations) {
        makeLinksClickable();
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
});

function makeLinksClickable() {
    // Find all text nodes in the document
    const textNodes = [];
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    while (node = walker.nextNode()) {
        // Skip nodes that are children of links, scripts, or style elements
        let parent = node.parentNode;
        let skipNode = false;
        
        while (parent && parent !== document.body) {
            if (parent.nodeName === 'A' || 
                parent.nodeName === 'SCRIPT' || 
                parent.nodeName === 'STYLE' || 
                parent.nodeName === 'INPUT' || 
                parent.nodeName === 'TEXTAREA') {
                skipNode = true;
                break;
            }
            parent = parent.parentNode;
        }
        
        if (!skipNode && node.textContent.trim().length > 0) {
            textNodes.push(node);
        }
    }
    
    // Regular expression to match IP:port
    // This matches both IPv4 and IPv6 addresses with port numbers
    const ipPortRegex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):([0-9]{1,5})\b|\[([0-9a-fA-F:]+)\]:([0-9]{1,5})\b/g;
    
    // Process each text node
    textNodes.forEach(function(textNode) {
        const text = textNode.textContent;
        
        // Skip if no match
        if (!ipPortRegex.test(text)) {
            return;
        }
        
        // Reset regex
        ipPortRegex.lastIndex = 0;
        
        // Create a document fragment to hold the new content
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;
        
        // Process each match
        while ((match = ipPortRegex.exec(text)) !== null) {
            // Add the text before the match
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
            }
            
            // Create the link
            const link = document.createElement('a');
            const matchedText = match[0];
            
            // Determine whether it's IPv4 or IPv6
            let url;
            if (matchedText.includes('[')) {
                // IPv6 address
                url = 'http://' + matchedText;
            } else {
                // IPv4 address
                url = 'http://' + matchedText;
            }
            
            link.href = url;
            link.textContent = matchedText;
            link.target = '_blank'; // Open in new tab
            link.rel = 'noopener noreferrer'; // Security best practice
            link.classList.add('clickable-ip-link');
            
            fragment.appendChild(link);
            
            lastIndex = match.index + matchedText.length;
        }
        
        // Add any remaining text
        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }
        
        // Replace the text node with the fragment
        textNode.parentNode.replaceChild(fragment, textNode);
    });
} 