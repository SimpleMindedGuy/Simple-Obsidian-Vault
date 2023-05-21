---

database-plugin: basic

---

```yaml:dbfolder
name: DailyDB
description: Display data about dialy notes
columns:
  __file__:
    key: __file__
    id: __file__
    input: markdown
    label: File
    accessorKey: __file__
    isMetadata: true
    skipPersist: false
    isDragDisabled: false
    csvCandidate: true
    position: 1
    isHidden: false
    sortIndex: 1
    width: 284
    isSorted: true
    isSortedDesc: true
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  ⚖️:
    input: number
    accessorKey: ⚖️
    key: ⚖️
    id: ⚖️
    label: ⚖️
    position: 7
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 35
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  ⛔:
    input: number
    accessorKey: ⛔
    key: ⛔
    id: ⛔
    label: ⛔
    position: 6
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 47
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  🏋️‍♂️:
    input: checkbox
    accessorKey: 🏋️‍♂️
    key: 🏋️‍♂️
    id: 🏋️‍♂️
    label: 🏋️‍♂️
    position: 4
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 37
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  📕:
    input: number
    accessorKey: 📕
    key: 📕
    id: 📕
    label: 📕
    position: 8
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 48
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      wrap_content: true
  📖:
    input: checkbox
    accessorKey: 📖
    key: 📖
    id: 📖
    label: 📖
    position: 3
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 54
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  🕌:
    input: number
    accessorKey: 🕌
    key: 🕌
    id: 🕌
    label: 🕌
    position: 5
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 21
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  😶:
    input: select
    accessorKey: 😶
    key: 😶
    id: 😶
    label: 😶
    position: 2
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 160
    options:
      - { label: "😡 rage", value: "😡 rage", color: "#FF6969"}
      - { label: "😒 bitter", value: "😒 bitter", color: "#FF6969"}
      - { label: "😭 sad", value: "😭 sad", color: "#FF6969"}
      - { label: "😫 frustrated", value: "😫 frustrated", color: "#FF6969"}
      - { label: "😨 scared", value: "😨 scared", color: "#FF6969"}
      - { label: "😶 lonely", value: "😶 lonely", color: "#E8AA42"}
      - { label: "😖 Guilty", value: "😖 Guilty", color: "#E8AA42"}
      - { label: "😞 disappointed", value: "😞 disappointed", color: "#E8AA42"}
      - { label: "😓 hopeless", value: "😓 hopeless", color: "#E8AA42"}
      - { label: "😟 worried", value: "😟 worried", color: "#3CCF4E"}
      - { label: "😮‍💨 exhausted", value: "😮‍💨 exhausted", color: "#3CCF4E"}
      - { label: "😖 anxious", value: "😖 anxious", color: "#3CCF4E"}
      - { label: "🤢 sick", value: "🤢 sick", color: "#3CCF4E"}
      - { label: "😄 happy", value: "😄 happy", color: "#6D67E4"}
      - { label: "😆 satisfied", value: "😆 satisfied", color: "#6D67E4"}
      - { label: "😲 surprised", value: "😲 surprised", color: "#6D67E4"}
      - { label: "😂 joyful", value: "😂 joyful", color: "#6D67E4"}
      - { label: "😐 ok", value: "😐 ok", color: "#6D67E4"}
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      wrap_content: true
      option_source: formula
      formula_option_source: "[{label:'😡 rage',value:'😡 rage',color:'#FF6969'},{label:'😒 bitter',value:'😒 bitter',color:'#FF6969'},{label:'😭 sad',value:'😭 sad',color:'#FF6969'},{label:'😫 frustrated',value:'😫 frustrated',color:'#FF6969'},{label:'😨 scared',value:'😨 scared',color:'#FF6969'},{label:'😶 lonely',value:'😶 lonely',color:'#E8AA42'},{label:'😖 Guilty',value:'😖 Guilty',color:'#E8AA42'},{label:'😞 disappointed',value:'😞 disappointed',color:'#E8AA42'},{label:'😓 hopeless',value:'😓 hopeless',color:'#E8AA42'},{label:'😟 worried',value:'😟 worried',color:'#3CCF4E'},{label:'😮‍💨 exhausted',value:'😮‍💨 exhausted',color:'#3CCF4E'},{label:'😖 anxious',value:'😖 anxious',color:'#3CCF4E'},{label:'🤢 sick',value:'🤢 sick',color:'#3CCF4E'},{label:'😄 happy',value:'😄 happy',color:'#6D67E4'},{label:'😆 satisfied',value:'😆 satisfied',color:'#6D67E4'},{label:'😲 surprised',value:'😲 surprised',color:'#6D67E4'},{label:'😂 joyful',value:'😂 joyful',color:'#6D67E4'},{label:'😐 ok',value:'😐 ok',color:'#6D67E4'}]"
      content_alignment: text-align-center
      content_vertical_alignment: align-middle
  💻:
    input: number
    accessorKey: 💻
    key: 💻
    id: 💻
    label: 💻
    position: 9
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 55
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  🍱:
    input: number
    accessorKey: 🍱
    key: 🍱
    id: 🍱
    label: 🍱
    position: 13
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 18
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  🍵:
    input: number
    accessorKey: 🍵
    key: 🍵
    id: 🍵
    label: 🍵
    position: 11
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 14
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  💼:
    input: number
    accessorKey: 💼
    key: 💼
    id: 💼
    label: 💼
    position: 10
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 57
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  🍩:
    input: number
    accessorKey: 🍩
    key: 🍩
    id: 🍩
    label: 🍩
    position: 12
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 29
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  💰:
    input: number
    accessorKey: 💰
    key: 💰
    id: 💰
    label: 💰
    position: 15
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 2
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  💳:
    input: number
    accessorKey: 💳
    key: 💳
    id: 💳
    label: 💳
    position: 14
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: -72
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  💵:
    input: number
    accessorKey: 💵
    key: 💵
    id: 💵
    label: 💵
    position: 16
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: -19
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
config:
  remove_field_when_delete_column: false
  cell_size: normal
  sticky_first_column: true
  group_folder_column: 
  remove_empty_folders: false
  automatically_group_files: false
  hoist_files_with_empty_attributes: true
  show_metadata_created: false
  show_metadata_modified: false
  show_metadata_tasks: false
  show_metadata_inlinks: false
  show_metadata_outlinks: false
  source_data: tag
  source_form_result: "#diary"
  source_destination_path: 92-FolderDB
  row_templates_folder: Journal/Daily
  current_row_template: 
  pagination_size: 30
  font_size: 16
  enable_js_formulas: false
  formula_folder_path: /
  inline_default: false
  inline_new_position: last_field
  date_format: yyyy-MM-dd
  datetime_format: "yyyy-MM-dd HH:mm:ss"
  metadata_date_format: "yyyy-MM-dd HH:mm:ss"
  enable_footer: true
  implementation: default
  show_metadata_tags: false
filters:
  enabled: false
  conditions:
```