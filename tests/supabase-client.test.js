const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

// Read the script
const code = fs.readFileSync('./supabase-client.js', 'utf8');

function runTests() {
  console.log('Running tests for supabase-client.js...\n');

  // Set up mock browser environment context
  const context = {
    window: { location: { reload: () => {} } },
    document: {
      addEventListener: () => {},
      querySelectorAll: () => []
    },
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    },
    console: console,
    Math: Math,
    Date: Date,
    JSON: JSON
  };

  vm.createContext(context);
  vm.runInContext(code, context);

  // 1. Test behavior when window.supabase is undefined
  let client0 = context.getSupabase();
  assert.strictEqual(client0, null, 'getSupabase should return null if window.supabase is undefined');
  console.log('✓ getSupabase returns null when window.supabase is undefined');

  // 2. Test singleton pattern and createClient call count
  let createClientCallCount = 0;
  const mockClientInstance = { mock: true };

  context.window.supabase = {
    createClient: (url, key, options) => {
      createClientCallCount++;
      // Basic validation of passed arguments
      assert.ok(url, 'URL should be passed');
      assert.ok(key, 'Key should be passed');
      assert.strictEqual(options.auth.persistSession, true, 'persistSession should be true');
      return mockClientInstance;
    }
  };

  // First call
  const client1 = context.getSupabase();
  assert.strictEqual(client1, mockClientInstance, 'First call should return the newly created mock client');
  assert.strictEqual(createClientCallCount, 1, 'createClient should be called exactly once');
  console.log('✓ getSupabase correctly initializes the client');

  // Second call
  const client2 = context.getSupabase();
  assert.strictEqual(client2, mockClientInstance, 'Second call should return the exact same mock client reference');
  assert.strictEqual(createClientCallCount, 1, 'createClient should NOT be called again on subsequent calls');
  console.log('✓ getSupabase correctly implements singleton pattern');

  console.log('\nAll tests passed successfully! 🚀');
}

runTests();
