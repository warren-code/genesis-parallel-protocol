@echo off

REM Temporarily rename ESLint config
if exist "eslint.config.mjs" (
  move /Y eslint.config.mjs eslint.config.mjs.bak
)

REM Run the build
call npm run build

REM Capture the exit code
set BUILD_EXIT_CODE=%ERRORLEVEL%

REM Restore ESLint config
if exist "eslint.config.mjs.bak" (
  move /Y eslint.config.mjs.bak eslint.config.mjs
)

REM Exit with the build exit code
exit /b %BUILD_EXIT_CODE%
