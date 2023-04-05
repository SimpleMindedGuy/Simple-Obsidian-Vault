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
    sortIndex: -1
    width: 162
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
    position: 9
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
    position: 11
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
    position: 8
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
    position: 12
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
    position: 7
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
    input: select
    accessorKey: 🕌
    key: 🕌
    id: 🕌
    label: 🕌
    position: 6
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 49
    options:
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      option_source: formula
  😶:
    input: select
    accessorKey: 😶
    key: 😶
    id: 😶
    label: 😶
    position: 13
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 226
    options:
      - { label: "😡 rage", value: "😡 rage", color: "#991629"}
      - { label: "😒 bitter", value: "😒 bitter", color: "#991629"}
      - { label: "😭 sad", value: "😭 sad", color: "#991629"}
      - { label: "😫 frustrated", value: "😫 frustrated", color: "#991629"}
      - { label: "😨 scared", value: "😨 scared", color: "#991629"}
      - { label: "😶 lonely", value: "😶 lonely", color: "#fb8114"}
      - { label: "😖", value: "Guilty", color: "#fb8114"}
      - { label: "😞 disappointed", value: "😞 disappointed", color: "#fb8114"}
      - { label: "😓 hopeless", value: "😓 hopeless", color: "#fb8114"}
      - { label: "😟 worried", value: "😟 worried", color: "#4a7f5f"}
      - { label: "😮‍💨 exhausted", value: "😮‍💨 exhausted", color: "#4a7f5f"}
      - { label: "😖 anxious", value: "😖 anxious", color: "#4a7f5f"}
      - { label: "🤢 sick", value: "🤢 sick", color: "#4a7f5f"}
      - { label: "😄 happy", value: "😄 happy", color: "#420099"}
      - { label: "😆 satisfied", value: "😆 satisfied", color: "#420099"}
      - { label: "😲 surprised", value: "😲 surprised", color: "#420099"}
      - { label: "😂 joyful", value: "😂 joyful", color: "#420099"}
      - { label: "😐 ok", value: "😐 ok", color: "#420099"}
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
      formula_option_source: "[{label:'😡 rage',value:'😡 rage',color:'#991629'},{label:'😒 bitter',value:'😒 bitter',color:'#991629'},{label:'😭 sad',value:'😭 sad',color:'#991629'},{label:'😫 frustrated',value:'😫 frustrated',color:'#991629'},{label:'😨 scared',value:'😨 scared',color:'#991629'},{label:'😶 lonely',value:'😶 lonely',color:'#fb8114'},{label:'😖',value:'Guilty',color:'#fb8114'},{label:'😞 disappointed',value:'😞 disappointed',color:'#fb8114'},{label:'😓 hopeless',value:'😓 hopeless',color:'#fb8114'},{label:'😟 worried',value:'😟 worried',color:'#4a7f5f'},{label:'😮‍💨 exhausted',value:'😮‍💨 exhausted',color:'#4a7f5f'},{label:'😖 anxious',value:'😖 anxious',color:'#4a7f5f'},{label:'🤢 sick',value:'🤢 sick',color:'#4a7f5f'},{label:'😄 happy',value:'😄 happy',color:'#420099'},{label:'😆 satisfied',value:'😆 satisfied',color:'#420099'},{label:'😲 surprised',value:'😲 surprised',color:'#420099'},{label:'😂 joyful',value:'😂 joyful',color:'#420099'},{label:'😐 ok',value:'😐 ok',color:'#420099'},]"
      content_alignment: text-align-center
      content_vertical_alignment: align-middle
  💻:
    input: number
    accessorKey: 💻
    key: 💻
    id: 💻
    label: 💻
    position: 10
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
    input: checkbox
    accessorKey: 🍱
    key: 🍱
    id: 🍱
    label: 🍱
    position: 2
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: -26
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  🍴:
    input: checkbox
    accessorKey: 🍴
    key: 🍴
    id: 🍴
    label: 🍴
    position: 3
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: -2
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
    input: checkbox
    accessorKey: 🍵
    key: 🍵
    id: 🍵
    label: 🍵
    position: 4
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
  🥞:
    input: checkbox
    accessorKey: 🥞
    key: 🥞
    id: 🥞
    label: 🥞
    position: 5
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: -12
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
  sticky_first_column: false
  group_folder_column: 
  remove_empty_folders: false
  automatically_group_files: false
  hoist_files_with_empty_attributes: true
  show_metadata_created: false
  show_metadata_modified: false
  show_metadata_tasks: false
  show_metadata_inlinks: false
  show_metadata_outlinks: false
  source_data: current_folder
  source_form_result: 
  source_destination_path: /
  row_templates_folder: Journal/Daily
  current_row_template: 
  pagination_size: 65
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
filters:
  enabled: false
  conditions:
```