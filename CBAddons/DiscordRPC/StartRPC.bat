@echo off
echo Running > running.lock
title Celebimew's Addons RPC Helper
cd /d "%~dp0"
RpcHelper.py
pause
del running.lock
