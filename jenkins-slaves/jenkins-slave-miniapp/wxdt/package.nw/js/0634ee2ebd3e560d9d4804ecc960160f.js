'use strict';!function(require,directRequire){const a={};['NULL','LOGIN_AND_GOTO','SELECT_DEV_TYPE','BODY_CLICK','USER_SYNC_STORE','USER_LOGIN_REQUEST','USER_LOGIN_PENDING','USER_LOGIN_SUCCESS','USER_LOGIN_FAIL','USER_LOGIN_CANCEL','USER_LOGIN_EXPIRED','USER_REMOVE_INFO','USER_UPDATE_INFO','USER_ADD_ACCOUNT','USER_REMOVE_ACCOUNT','USER_UPDATE_ACCOUNT_STATUS','USER_UPDATE_ACCOUNT','PROJECT_SYNC_STORE','PROJECT_SELECT_PROJECT_REQUEST','PROJECT_SELECT_PROJECT_CANCEL','PROJECT_SELECT_PROJECT_OPEN','PROJECT_SELECT_PROJECT_CLOSE','PROJECT_OPEN_PROJECT','PROJECT_OPEN_TEMP_PROJECT','PROJECT_CLOSE_PROJECT','PROJECT_UPDATE_LIST','PROJECT_CREATE_PROJECT_REQUEST','PROJECT_CREATE_PROJECT_SUCCESS','PROJECT_CREATE_PROJECT_FAIL','PROJECT_CREATE_PROJECT_CANCEL','PROJECT_CREATE_PROJECT_OPEN','PROJECT_CREATE_PROJECT_CLOSE','PROJECT_CREATE_MINICODE_REQUEST','PROJECT_CREATE_MINICODE_OPEN','PROJECT_CREATE_MINICODE_CLOSE','PROJECT_REMOVE_PROJECT','PROJECT_UPDATE_ATTR','PROJECT_SET_COMPILE_CONDICTION','PROJECT_REMOVE_COMPILE_CONDICTION','PROJECT_SELECT_COMPILE_CONDICTION','PROJECT_SET_SETTING','PROJECT_SET_LIBVERSION','PROJECT_SET_STORAGE','PROJECT_SET_COMPILE_TYPE','PROJECT_SET_QCLOUD','PROJECT_SET_PKG_SIZE','PROJECT_SET_PLUGIN_INFO','PROJECT_SET_PROJECT_CONFIG','PROJECT_SET_RUMTIME_ATTR','PROJECT_MERGE_RUMTIME_ATTR','PROJECT_SET_UPLOAD_INFO','PROJECT_SET_SHARE_INFO','PROJECT_SET_SCRIPTS','PROJECT_SET_TIME_RECORDS','PROJECT_CHANGE_APPID','PROJECT_SET_TCBFN_ROOT','WINDOW_CHANGE_MAIN_WINDOW','WINDOW_SET_ENTRANCE','WINDOW_MAXIMIZE','WINDOW_MINIMIZE','WINDOW_FULLSCREEN','WINDOW_RESIZE','WINDOW_RECORD_FOCUS','WINDOW_SET_MASK','WINDOW_SET_MAIN_WINDOW','WINDOW_SET_ABOUT','WINDOW_SET_DEBUGGER','WINDOW_TOGGLE_DEBUGGER','WINDOW_TOGGLE_DEBUGGER_POPUP','WINDOW_TOGGLE_SIMULATOR','WINDOW_TOGGLE_SIMULATOR_POSITION','WINDOW_SET_SIMULATOR_POSITION','WINDOW_SET_SIMULATOR_POPUP','WINDOW_TOGGLE_EDITOR','WINDOW_TOGGLE_MINI_MODE','WINDOW_SET_SIMULATOR','WINDOW_SET_CUSTOMCOMPILE','WINDOW_SET_EDITOR','WINDOW_SET_CLOUD','WINDOW_SET_PLUGIN_POPUP','WINDOW_SET_QCLOUD','WINDOW_SET_QCLOUD_ACTION','WINDOW_SET_PROJECT_MANAGEMENT','WINDOW_SET_REMOTE_DEBUG_WINDOW','WINDOW_SET_QCLOUD_DEBUG_WINDOW','WINDOW_TOGGLE_TOOLBAR','WINDOW_CLEAR_MINICODE_OPTIONS','WINDOW_SYNC_STORE','WINDOW_TOOLBAR_CONFIG','WINDOW_SET_MULTI_ACCOUNT','WINDOW_SET_ADDITION_LOGIN','WINDOW_ADD_NOTICES','WINDOW_REMOVE_NOTICES','WINDOW_SET_PROGRESS_DIALOG','INFO_SET_CONFIRM','INFO_SHOW_CONFIRM_POPUP','INFO_CLOSE_CONFIRM_POPUP','INFO_SET_UPLOAD','INFO_SET_SHARE','INFO_SET_UPLOAD_PLUGIN_DOC','INFO_SET_CHANGE_APP_ID','INFO_SET_PROJECT','INFO_SHOW_ERROR','INFO_SHOW_SUCCESS','INFO_OPEN_EDITOR_FILE','INFO_ADD_DEVICE_POPUP','INFO_SET_WORKBENCH_INFO','SIMULATOR_LAUNCH','SIMULATOR_OPEN_TABBAR','SIMULATOR_NAVIGATE','SIMULATOR_REDIRECT','SIMULATOR_RELAUNCH','SIMULATOR_NAVIGATE_BACK','SIMULATOR_SHOW_SPECIFIC_WEBVIEW','SIMULATOR_CLEAN_ALL_WEBVIEW','SIMULATOR_OPEN_MAP','SIMULATOR_SET_NAVIGATION_BAR','SIMULATOR_SET_TOAST','SIMULATOR_SET_MODAL','SIMULATOR_UNSET_MODAL','SIMULATOR_SET_ACTIONSHEET','SIMULATOR_SET_PICKER','SIMULATOR_SET_SHARE_BTN','SIMULATOR_SET_SHARE_DATAURI','SIMULATOR_SET_GROUP_INFO','SIMULATOR_SET_PREVIEW_IMAGE','SIMULATOR_SET_CARD_VIEW','SIMULATOR_SHARE_APP_MSG','SIMULATOR_SET_APP_CONFIG','SIMULATOR_SET_SHARE','SIMULATOR_SET_CONFIRM','SIMULATOR_SET_SETTING','SIMULATOR_SET_DEBUGGEE','SIMULATOR_SET_APP_LAUNCHED','SIMULATOR_SET_SIMULATE_UPDATE','SIMULATOR_RESTART_PROJECT','SIMULATOR_SET_WEBVIEW_READY','SIMULATOR_SET_APP_ROUTE','SIMULATOR_SET_AUTHORIZE_CONFIRM','SIMULATOR_SET_PAYMENT_QRWND','SIMULATOR_SET_RIGHTBTN_ACTIONSHEET','SIMULATOR_SET_LOCATION','SIMULATOR_SET_ACCELEROMETER','SIMULATOR_SET_COMPASS','SIMULATOR_SET_BACKGROUND_AUDIO','SIMULATOR_SET_BACKGROUND','SIMULATOR_TOGGLE_BACKGROUND','SIMULATOR_SET_WIDGET','SIMULATOR_SET_GAME','SIMULATOR_SET_ADDPHONECONTACT','SIMULATOR_SET_CHOOSEADDRESS','SIMULATOR_SET_CHOOSEINVOICETITLE','SIMULATOR_UPDATE_MULTI_PICKER','SIMULATOR_RELAUNCH_TO_INDEX','SIMULATOR_SET_WXMLINSPECT','SIMULATOR_SET_VIBRATE','SIMULATOR_COMPILE','ASSDK_CALLBACK','JSSDK_CALLBACK','SIMULATOR_LOAD_SUBPACKAGE','SIMULATOR_UPDATE_DECRYPTED_INFO','SIMULATOR_CAPTURE_SCREEN','SIMULATOR_SET_ORIENTATION','SIMULATOR_GAME_LAUNCH','SIMULATOR_SET_KEYBOARD','SIMULATOR_UPDATE_KEYBOARD','SIMULATOR_INSERT_NATIVEVIEW','SIMULATOR_UPDATE_NATIVEVIEW','SIMULATOR_REMOVE_NATIVEVIEW','SIMULATOR_OPERATE_NATIVEVIEW','SIMULATOR_SET_MENU','SIMULATOR_SET_TABBAR','SIMULATOR_SET_ANY_HTMLWEBVIEW','SIMULATOR_HIDE_NAVIGATION','SIMULATOR_SHOW_NAVIGATION','SIMULATOR_HIDE_STATUSBAR','SIMULATOR_SHOW_STATUSBAR','SIMULATOR_SET_WEBVIEW_PAGE_ORIENTATION','SIMULATOR_INSERT_HTMLWEBVIEW','SIMULATOR_UPDATE_HTMLWEBVIEW','SIMULATOR_REMOVE_HTMLWEBVIEW','SIMULATOR_SET_STATUSBAR_STYLE','SIMULATOR_CALL_INTERFACE','SIMULATOR_DEBUG_INFO','SIMUALTOR_INSERT_COVERVIEW','SIMULATOR_UPDATE_COVERVIEW','SIMULATOR_REMOVE_COVERVIEW','SIMULATOR_PAGENOTFOUND_CALLBACK','SIMULATOR_ANIMATE_COVERVIEW','SIMULATOR_SET_DEBUGGER','SIMULATOR_LOAD_GAME_SUBPACKAGE','CONFIG_UPDATE_SCENE_INFO','CONFIG_UPDATE_SEARCH_QUERY','CONFIG_UPDATE_BBS_CONFIG','CONFIG_SYNC_STORE','CONFIG_SET_PLUGIN_MANIFEST','CONFIG_CHANGE_LOCALE','SETTINGS_SYNC_STORE','SETTINGS_OPEN_IDE_SETTINGS','SETTINGS_CLOSE_IDE_SETTINGS','SETTINGS_SAVE_IDE_SETTINGS','SETTINGS_PARTIAL_UPDATE_IDE_SETTINGS','SETTINGS_SET_GEO','SETTINGS_SET_PROXY','SETTINGS_SET_SECURITY','SETTINGS_RESET_SHORTCUTS','TOOLBAR_TOGGLE_NETWORK','TOOLBAR_TOGGLE_SIMULATORACTION','TOOLBAR_TOGGLE_DEVICE','TOOLBAR_TOGGLE_COMPILETYPE','TOOLBAR_TOGGLE_COMPACT','TOOLBAR_TOGGLE_INFO','TOOLBAR_SELECT_NETWORK','TOOLBAR_SELECT_DEVICE','TOOLBAR_SELECT_COMPILETYPE','TOOLBAR_PREVIEW_CODE','TOOLBAR_REMOTE_DEBUG_CODE','TOOLBAR_TOGGLE_CLICKKEY','TOOLBAR_SET_DEVICE_STATUS','TOOLBAR_SET_CLICKKEY','TOOLBAR_SET_DEVICESCALE','TOOLBAR_ADD_DEVICE','TOOLBAR_REMOVE_DEVICE','TOOLBAR_CONFIG','TOOLBAR_AUTO_PREVIEW','TOOLBAR_SET_MUTED','TOOLBAR_SET_DEVICE_ROTATED','TOOLBAR_SET_DEVICE_ROTATED_BEFORE_ROUTE','TOOLBAR_SYNC_STORE','DEBUG_CUSTOM_ANALYSIS_OPEN','DEBUG_CUSTOM_ANALYSIS_CLOSE','DEBUG_CUSTOM_ANALYSIS_UPDATE_CONFIG','DEBUG_MOBILE_TEST_OPEN','DEBUG_MOBILE_TEST_CLOSE','DEBUG_MOBILE_TEST_COMMIT','DEBUG_MOBILE_TEST_FETCH_LIST','DEBUG_MOBILE_TEST_VIEW_REPORT','DEBUG_MOBILE_TEST_CLOSE_REPORT','DEBUG_MOBILE_TEST_DOWNLOAD_REPORT','PUBLIC_GET_PUBLIC_LIB_USAGE_RATE','CONSOLE_CLEAR','CONSOLE_LOG','CONSOLE_ERROR','CONSOLE_WARN','COS_SET_WND','COS_SET_DIR','COS_SET_CURRENT','COS_SET_TREE','COS_CUT_TREE','COS_SET_CONTEXT_MENU','COS_SET_CONFIRM','TCB_SET_ENV_LIST','TCB_SELECT_ENV','TCB_CONSOLE_COMMAND','TCB_SET_SCF_LIST','TCB_CLEAN_SCF_LIST','TCB_SCF_INFO','TCB_SET_LOADING','TCB_SET_FILE','GIT_TOGGLE_PANEL_SHOW','GIT_TOGGLE_PANEL_CLOSE_TS'].forEach((b)=>{a[b]=b}),module.exports=a}(require('lazyload'),require);