# Script de despliegue a GitHub para SOLMEC S.A.S. (Desarrollado por ECOZAN)
# Repositorio: https://github.com/jadecol/solmec.git

$ErrorActionPreference = "Stop"
$RepoUrl = "https://github.com/jadecol/solmec.git"

Write-Host "=== Preparando repositorio SOLMEC S.A.S. para GitHub ===" -ForegroundColor Cyan

# 1. Verificar si Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  $gitPaths = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
  )
  foreach ($p in $gitPaths) {
    if (Test-Path $p) {
      $env:Path += ";$(Split-Path $p)"
      break
    }
  }
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Git no está instalado en el sistema. Instalando Git mediante winget..." -ForegroundColor Yellow
  winget install --id Git.Git -e --source winget
  $env:Path += ";C:\Program Files\Git\cmd"
}

# 2. Compilar versión de producción para validar antes de subir
Write-Host "Compilando proyecto (npm run build)..." -ForegroundColor Cyan
npm.cmd run build

# 3. Inicializar repositorio Git si no existe
if (-not (Test-Path ".git")) {
  Write-Host "Inicializando repositorio Git..." -ForegroundColor Cyan
  git init
  git branch -M main
}

# 4. Configurar remote origin
$remotes = git remote
if ($remotes -contains "origin") {
  git remote set-url origin $RepoUrl
} else {
  git remote add origin $RepoUrl
}

# 5. Agregar archivos, crear commit y subir a la rama main
Write-Host "Agregando archivos y creando commit..." -ForegroundColor Cyan
git add .
git status -s

$commitMsg = "feat: portafolio corporativo SOLMEC S.A.S. (Desarrollado por ECOZAN)"
git commit -m $commitMsg

Write-Host "Subiendo cambios a $RepoUrl (rama main)..." -ForegroundColor Green
git push -u origin main

Write-Host "=== ¡Listo! Repositorio sincronizado con GitHub ===" -ForegroundColor Green

