param(
    [int]$Port = 3000,
    [string]$Url = "http://localhost:$Port"
)

Write-Host "=== SHATRA Development Server Health Check ==="
Write-Host "Checking port: $Port"
Write-Host "URL: $Url"
Write-Host ""

# Check if process is running
Write-Host "Checking for Node.js processes..."
Get-Process node -ErrorAction SilentlyContinue | Write-Host

# Check if port is listening
Write-Host ""
Write-Host "Checking port $Port connectivity..."
$tcp = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue
if ($tcp) {
    Write-Host "SUCCESS: Port $Port is LISTENING" -ForegroundColor Green
} else {
    Write-Host "WARNING: Port $Port is NOT listening" -ForegroundColor Yellow
    Write-Host "The development server may not be running."
}

# Try to connect
Write-Host ""
Write-Host "Testing HTTP connectivity..."
try {
    $result = Invoke-WebRequest $Url -UseBasicParsing -TimeoutSec 5
    Write-Host "SUCCESS: HTTP $($result.StatusCode) received from $Url" -ForegroundColor Green
} catch {
    Write-Host "WARNING: Could not connect to $Url" -ForegroundColor Yellow
    Write-Host "The server may be starting up or not running."
}

Write-Host ""
Write-Host "=== Health Check Complete ==="
Write-Host "If port is not listening, run: start-dev.cmd"