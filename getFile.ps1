# Configure the folder to scan
$scanFolder = "C:\CloudFlare\ragan-dynamics\src"

if ([string]::IsNullOrWhiteSpace($scanFolder)) {
    $root = Get-Location
} else {
    $root = Get-Item $scanFolder
}

# Dump file will always be created in the folder where the script is executed
$outputFile = Join-Path (Get-Location) "getFile_Dump.txt"

# Recursively find .astro and .ts files (safe handling for [ ] filenames)
$files = Get-ChildItem -Path $root.FullName -Recurse -File |
         Where-Object { $_.Extension -in ".astro", ".ts" }

# Initialize counters
$totalFiles = $files.Count
$totalLines = 0

foreach ($file in $files) {
    $lines = Get-Content -LiteralPath $file.FullName
    $totalLines += $lines.Count
}

# Show statistics first
Write-Host "Statistics:" -ForegroundColor Cyan
Write-Host " Total files found: $totalFiles" -ForegroundColor Yellow
Write-Host " Total lines across all files: $totalLines" -ForegroundColor Yellow

# Ask for confirmation
$confirmation = Read-Host "Do you want to proceed with creating the dump file? (Y/N)"

if ($confirmation -match '^[Yy]$') {
    # Clear file if it already exists
    if (Test-Path $outputFile) {
        Clear-Content $outputFile
    }

    # Process each file with progress counter
    $index = 0
    foreach ($file in $files) {
        $index++
        $relativePath = $file.FullName.Substring($root.FullName.Length).TrimStart('\')

        Write-Host "Processing file ${index} of ${totalFiles}: $relativePath" -ForegroundColor Green

        # Write header
        Add-Content -Path $outputFile -Value ">>$relativePath"

        # Write content
        Get-Content -LiteralPath $file.FullName | ForEach-Object {
            Add-Content -Path $outputFile -Value $_
        }

        # Add blank line
        Add-Content -Path $outputFile -Value ""
    }

    Write-Host "`nAll contents written to: $outputFile" -ForegroundColor Green
}
else {
    Write-Host "`nOperation cancelled. No dump file created." -ForegroundColor Red
}
