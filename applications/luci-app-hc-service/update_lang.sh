#!/bin/bash

# 设置基本目录
POT_FILE="po/templates/hc-service.pot"
PO_DIR="po"
LOCALES=("zh_Hans")  # 根据需要修改其他语言


# 2. 合并现有的 .po 文件与 .pot 文件，更新翻译内容
for LOCALE in "${LOCALES[@]}"; do
    PO_FILE="$PO_DIR/$LOCALE/hc-service.po"
    
    if [ -f "$PO_FILE" ]; then
        echo "更新翻译文件: $PO_FILE"
        msgmerge -U $PO_FILE $POT_FILE
        if [ $? -ne 0 ]; then
            echo "msgmerge 失败！"
            exit 1
        fi
    else
        echo "未找到翻译文件: $PO_FILE, 请确保该文件存在！"
    fi
done

# 完成
echo "语言更新完成！"

