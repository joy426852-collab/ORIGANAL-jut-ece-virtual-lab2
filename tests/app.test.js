const fs = require('fs');
const vm = require('vm');
const test = require('node:test');
const assert = require('node:assert');

const appJsCode = fs.readFileSync('app.js', 'utf8');

test('showSearchDropdown securely sets search results when empty', (t) => {
  // Create a mock DOM environment
  const mockDocument = {
    getElementById: (id) => {
      if (id === 'searchInput') {
        return { value: '<script>alert(1)</script>' };
      }
      if (id === 'searchDropdown') {
        return dropdownMock;
      }
      return null;
    },
    createElement: (tag) => {
      return {
        tagName: tag,
        style: {},
        appendChild: function(node) {
          if (!this.childNodes) this.childNodes = [];
          this.childNodes.push(node);
        }
      };
    },
    createTextNode: (text) => {
      return { textContent: text, type: 'textNode' };
    }
  };

  const dropdownMock = {
    classList: {
      add: () => {},
      remove: () => {}
    },
    innerHTML: '',
    appendChild: function(node) {
      if (!this.childNodes) this.childNodes = [];
      this.childNodes.push(node);
    },
    childNodes: []
  };

  // Create mock globals
  const sandbox = {
    document: mockDocument,
    window: {},
    PRODUCTS_DATA: [],
    console: console,
    Math: Math
  };

  vm.createContext(sandbox);

  // We only need the showSearchDropdown function, so let's extract it or run the whole script with some mocks
  // Running the whole script might fail because of other missing DOM elements like THREE, AudioContext, etc.
  // Instead, let's just extract the function
  const functionMatch = appJsCode.match(/function showSearchDropdown\(\) \{([\s\S]*?)^\}/m);

  if (functionMatch) {
    const fnBody = functionMatch[0];
    vm.runInContext(fnBody + '\nshowSearchDropdown();', sandbox);

    // Check if dropdownMock.innerHTML is empty, meaning it was reset and not assigned string with script
    assert.strictEqual(dropdownMock.innerHTML, '');

    // Check if childNodes were added (the emptyDiv)
    assert.strictEqual(dropdownMock.childNodes.length, 1);
    const emptyDiv = dropdownMock.childNodes[0];

    // Verify properties of emptyDiv
    assert.strictEqual(emptyDiv.tagName, 'div');
    assert.strictEqual(emptyDiv.childNodes.length, 3);
    assert.strictEqual(emptyDiv.childNodes[0].type, 'textNode');
    assert.strictEqual(emptyDiv.childNodes[0].textContent, 'No items found for "');
    assert.strictEqual(emptyDiv.childNodes[1].tagName, 'strong');
    assert.strictEqual(emptyDiv.childNodes[1].textContent, '<script>alert(1)</script>');
    assert.strictEqual(emptyDiv.childNodes[2].type, 'textNode');
    assert.strictEqual(emptyDiv.childNodes[2].textContent, '"');
  } else {
    assert.fail('Could not extract showSearchDropdown');
  }
});
