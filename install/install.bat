@echo off
set PROJECT_NAME=%1
if "%1"=="" set PROJECT_NAME=project-vape

git clone -b V-1.1.0 https://github.com/jviatge/vape.git .vape
node .\.vape\install\initFromSH.js %PROJECT_NAME%
cd %PROJECT_NAME%
pnpm install
pnpm generate
pnpm migrate
cd ..

if exist tmp.bat (
    del tmp.bat
)