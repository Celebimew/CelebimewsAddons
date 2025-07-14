@echo off
echo Running > running.lock
title Celebimew's Addons RPC Helper
cd /d "%~dp0"
echo Installing dependencies...
pip install pypresence toml
echo Running script...
python RpcHelper.py
pause
del running.lock
