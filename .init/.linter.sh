#!/bin/bash
cd /home/kavia/workspace/code-generation/burning-man-camp-logistics-manager-121703-121712/burning_man_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

