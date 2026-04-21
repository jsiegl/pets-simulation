# deploy.ps1
# Uploads all project files to privacyishard.net via SCP.
# Usage: .\deploy.ps1

$user   = "privacy1"
$server = "privacyishard.net"
$port   = 22
$remote = "public_html/pets/"

$files = @(
    "index.html",
    "styles.css",
    "app.js",
    "content.js",
    "d3.min.js",
    "README.md"
)

foreach ($file in $files) {
    Write-Host "Uploading $file..."
    scp -P $port $file "${user}@${server}:${remote}"
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to upload $file. Aborting."
        exit 1
    }
}

Write-Host "Deploy complete."
