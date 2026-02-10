# Delayed.js Extensions

This folder contains optional extension modules for delayed.js. Extensions are used for less common use cases and are loaded only when explicitly enabled.

## How to Use Extensions

### 1. Enable an Extension

In the main `delayed.js` file, locate the `extensions` configuration object and set the extension to `true`:

```javascript
const extensions = {
  advancedTracking: true,  // Enable this extension
  customChat: false,       // Disabled
};
```

### 2. Extension File Naming

- Extension files must be named exactly as the key in the `extensions` object
- Example: `advancedTracking: true` → `advancedTracking.js`

### 3. Creating an Extension

Each extension file must follow this structure:

```javascript
/**
 * Extension: Advanced Tracking
 * Description: Adds advanced tracking features beyond standard analytics
 */

// Define initialization function with the pattern: init + ExtensionName
function initAdvancedTracking() {
  console.log('Advanced Tracking extension initialized');

  // Your extension code here
  setupCustomTracking();
}

// Extension-specific functions
function setupCustomTracking() {
  // Implementation here
}

// Additional helper functions
// ...
```

**Important:** The initialization function must be named `init` followed by the extension name with the first letter capitalized:
- `advancedTracking` → `initAdvancedTracking()`
- `customChat` → `initCustomChat()`
- `ecommerce` → `initEcommerce()`

## Example Extension

See `advancedTracking.example.js` for a complete example.

## Extension Loading Behavior

- Extensions are loaded asynchronously after the main delayed.js features
- Extensions load in the order they appear in the `extensions` object
- If an extension file fails to load, an error is logged but doesn't stop other extensions
- Extensions have access to all functions and variables defined in the main delayed.js file

## Best Practices

1. **Keep extensions focused**: Each extension should handle one specific use case
2. **Use descriptive names**: Name extensions based on their functionality
3. **Document dependencies**: If your extension requires specific HTML elements or other scripts, document this at the top of the file
4. **Test independently**: Ensure your extension works with and without other extensions enabled
5. **Handle errors gracefully**: Add error handling to prevent extension failures from breaking the main site

## Common Extension Use Cases

- Advanced analytics tracking (scroll depth, time on page, etc.)
- Custom chat integrations not included in the main file
- E-commerce tracking (add to cart, checkout events)
- A/B testing implementations
- Custom form tracking
- Video tracking (play, pause, complete)
- Custom lead capture mechanisms
