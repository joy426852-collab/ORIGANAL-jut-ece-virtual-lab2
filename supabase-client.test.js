const assert = require('assert');
const fs = require('fs');

// Simple DOM/Browser mocks
let storage = {};
global.localStorage = {
  getItem: (key) => (key in storage) ? storage[key] : null,
  setItem: (key, value) => { storage[key] = value.toString(); },
  removeItem: (key) => { delete storage[key]; }
};

global.window = {
  location: { reload: () => {} },
  supabase: null
};

global.document = {
  addEventListener: () => {},
  querySelectorAll: () => []
};

// Load and evaluate the script
const code = fs.readFileSync('./supabase-client.js', 'utf8');
eval(code);

// Get the exposed module
const StudentAuth = window.StudentAuth;

console.log("Running StudentAuth tests...");

try {
  // Test 1: No user in localStorage (Missing)
  storage = {}; // Reset
  assert.strictEqual(StudentAuth.getUser(), null, "Should return null when there is no user in localStorage");
  console.log("✅ Missing user test passed");

  // Test 2: Valid JSON in localStorage
  const testUser = { name: "Test Student", roll: "123" };
  storage['jut_student_user'] = JSON.stringify(testUser);
  assert.deepStrictEqual(StudentAuth.getUser(), testUser, "Should return parsed user object when valid JSON exists");
  console.log("✅ Valid JSON user test passed");

  // Test 3: Invalid JSON in localStorage (The missing error test)
  storage['jut_student_user'] = "INVALID_JSON_{";
  assert.doesNotThrow(() => {
    const user = StudentAuth.getUser();
    assert.strictEqual(user, null, "Should return null when JSON is invalid");
  }, "Should not throw an error when parsing fails");
  console.log("✅ Invalid JSON user test passed (Error caught & handled)");

  console.log("🎉 All tests passed successfully.");
} catch (error) {
  console.error("❌ Test failed:", error.message);
  process.exit(1);
}
