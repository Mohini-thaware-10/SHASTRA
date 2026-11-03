param($Port = 3000)
Write-Host "Starting SHATRA development server on port $Port..."
Set-Location "C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA"
# Start dev server - will block
cmd /c npm run dev 2>&1 | Write-Host