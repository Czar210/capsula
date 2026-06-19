# Cápsula — servidor local de desenvolvimento.
# O app usa <script type="text/babel" src="..."> e o Babel busca os .jsx via
# fetch, o que NÃO funciona abrindo o arquivo direto (file://). Precisa de HTTP.
#
# Uso:  ./serve.ps1            (porta 8000)
#       ./serve.ps1 -Port 5500
param([int]$Port = 8000)

$root = $PSScriptRoot
$url  = "http://localhost:$Port/"

Write-Host ""
Write-Host "  Cápsula rodando em:" -ForegroundColor Green
Write-Host "  $url" -ForegroundColor Cyan
Write-Host "  (Ctrl+C para parar)"
Write-Host ""

Start-Process $url
py -m http.server $Port --directory $root
