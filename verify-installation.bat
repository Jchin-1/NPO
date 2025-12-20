@echo off
REM NPO Website Installation Verification Script (Windows)
REM This script checks that all necessary files and configurations are in place

setlocal enabledelayedexpansion
color 0A

echo.
echo 0D Installation Verification
echo ==========================================
echo.

set ERRORS=0
set WARNINGS=0
set SUCCESS=0

REM Function to check file exists
:check_file
if exist "%~1" (
    echo [OK] Found: %~1
    set /a SUCCESS+=1
) else (
    echo [ERROR] Missing: %~1
    set /a ERRORS+=1
)
exit /b

REM Function to check directory exists
:check_dir
if exist "%~1\" (
    echo [OK] Found: %~1\
    set /a SUCCESS+=1
) else (
    echo [ERROR] Missing: %~1\
    set /a ERRORS+=1
)
exit /b

echo Checking directory structure...
for %%d in (src, src\app, src\components, supabase, supabase\migrations) do (
    if exist "%%d\" (
        echo [OK] Found: %%d\
        set /a SUCCESS+=1
    ) else (
        echo [ERROR] Missing: %%d\
        set /a ERRORS+=1
    )
)
echo.

echo Checking configuration files...
for %%f in (package.json, tsconfig.json, next.config.js, tailwind.config.ts, postcss.config.js, .eslintrc.json) do (
    if exist "%%f" (
        echo [OK] Found: %%f
        set /a SUCCESS+=1
    ) else (
        echo [ERROR] Missing: %%f
        set /a ERRORS+=1
    )
)
echo.

echo Checking page files...
for %%f in (src\app\layout.tsx, src\app\page.tsx, src\app\globals.css, src\app\activities\page.tsx, src\app\contact\page.tsx, src\app\snow-pickup\page.tsx) do (
    if exist "%%f" (
        echo [OK] Found: %%f
        set /a SUCCESS+=1
    ) else (
        echo [ERROR] Missing: %%f
        set /a ERRORS+=1
    )
)
echo.

echo Checking component files...
for %%f in (src\components\Navbar.tsx, src\components\Footer.tsx) do (
    if exist "%%f" (
        echo [OK] Found: %%f
        set /a SUCCESS+=1
    ) else (
        echo [ERROR] Missing: %%f
        set /a ERRORS+=1
    )
)
echo.

echo Checking API and server actions...
for %%f in (src\app\api\snow-requests\route.ts, src\app\actions\snow-requests.ts) do (
    if exist "%%f" (
        echo [OK] Found: %%f
        set /a SUCCESS+=1
    ) else (
        echo [ERROR] Missing: %%f
        set /a ERRORS+=1
    )
)
echo.

echo Checking database files...
if exist "supabase\migrations\001_init_schema.sql" (
    echo [OK] Found: supabase\migrations\001_init_schema.sql
    set /a SUCCESS+=1
) else (
    echo [ERROR] Missing: supabase\migrations\001_init_schema.sql
    set /a ERRORS+=1
)
echo.

echo Checking documentation...
for %%f in (README.md, SETUP_GUIDE.md, SUPABASE_SETUP.md, DEPLOYMENT_CHECKLIST.md, TESTING_GUIDE.md, QUICK_REFERENCE.md, BUILD_SUMMARY.md) do (
    if exist "%%f" (
        echo [OK] Found: %%f
        set /a SUCCESS+=1
    ) else (
        echo [WARNING] Missing: %%f
        set /a WARNINGS+=1
    )
)
echo.

echo Checking environment files...
for %%f in (.env.example, .env.local) do (
    if exist "%%f" (
        echo [OK] Found: %%f
        set /a SUCCESS+=1
    ) else (
        echo [WARNING] Missing: %%f
        set /a WARNINGS+=1
    )
)
echo.

echo ==========================================
echo Verification Summary
echo ==========================================
echo Passed: !SUCCESS!
echo Warnings: !WARNINGS!
echo Errors: !ERRORS!
echo.

if !ERRORS! equ 0 (
    echo [SUCCESS] All checks passed! Your installation is complete.
    echo.
    echo Next steps:
    echo 1. npm install              # Install dependencies
    echo 2. Set up Supabase account (supabase.com)
    echo 3. Run SQL schema in Supabase
    echo 4. Update .env.local with Supabase credentials
    echo 5. npm run dev              # Start development server
    echo.
    pause
    exit /b 0
) else (
    echo [ERROR] Installation incomplete. Please fix the errors above.
    echo.
    echo Check BUILD_SUMMARY.md or SETUP_GUIDE.md for more information.
    echo.
    pause
    exit /b 1
)
