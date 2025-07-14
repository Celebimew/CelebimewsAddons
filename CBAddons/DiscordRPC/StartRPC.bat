@echo off
echo Running > running.lock
title Celebimew's Addons RPC Helper
cd /d "%~dp0"
venv\Scripts\python.exe RpcHelper.py
pause
del running.lock
