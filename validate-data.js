// Validate all JSON files
async function validateData() {
  const files = [
    'content-library.json',
    'devices.json',
    'layout.json',
    'playlist.json',
    'schedules.json',
    'zones.json'
  ];
  
  for (const file of files) {
    try {
      const response = await fetch(file);
      const data = await response.json();
      console.log(`✓ ${file} is valid`);
    } catch (error) {
      console.error(`✗ ${file} validation failed:`, error);
    }
  }
}

// Run on page load
window.onload = validateData;
