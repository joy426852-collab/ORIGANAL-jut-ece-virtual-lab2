const fs = require('fs');
const assert = require('assert');

// Read the modified html file
const html = fs.readFileSync('community.html', 'utf-8');

// Find the function loadMessages body
const match = html.match(/async function loadMessages\(\) \{([\s\S]+?)\n        \}/);

if (!match) {
    console.error("Could not find loadMessages()");
    process.exit(1);
}

const loadMessagesBody = match[1];
// Check if the escapeHtml is used for the relevant fields
assert.ok(loadMessagesBody.includes("${escapeHtml(m.avatar || '⚡')}"), "Avatar should be escaped");
assert.ok(loadMessagesBody.includes("${escapeHtml(m.sender)}"), "Sender should be escaped");
assert.ok(loadMessagesBody.includes("${escapeHtml(m.roll || 'ECE')}"), "Roll should be escaped");
assert.ok(loadMessagesBody.includes("${escapeHtml(m.semester || 'Sem 4')}"), "Semester should be escaped");
assert.ok(loadMessagesBody.includes("${escapeHtml(m.text)}"), "Text should be escaped");

console.log("XSS fix validation passed! ✅");
