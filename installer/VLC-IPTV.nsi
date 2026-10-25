Unicode true
Name "VLC IPTV"
OutFile "D:\Development\Releases\VLC-IPTV-Setup.exe"

InstallDir "$LOCALAPPDATA\Programs\VLC IPTV"
RequestExecutionLevel user
SetCompressor /SOLID lzma

Icon "D:\Development\IPTV-Main-Source\LOGO\favicon.ico"
UninstallIcon "D:\Development\IPTV-Main-Source\LOGO\favicon.ico"

Page directory
Page instfiles
UninstPage uninstConfirm
UninstPage instfiles

Section "Install"
    SetShellVarContext current
    SetOutPath "$INSTDIR"

    File /r "D:\Development\VLC-IPTV-Windows-Test\*.*"

    CreateDirectory "$SMPROGRAMS\VLC IPTV"

    CreateShortCut "$DESKTOP\VLC IPTV.lnk" "$INSTDIR\IPTVSmartersPro.exe" "--user-data-dir=$\"$LOCALAPPDATA\VLC-IPTV-UserData$\"" "$INSTDIR\vlc-iptv.ico" 0

    CreateShortCut "$SMPROGRAMS\VLC IPTV\VLC IPTV.lnk" "$INSTDIR\IPTVSmartersPro.exe" "--user-data-dir=$\"$LOCALAPPDATA\VLC-IPTV-UserData$\"" "$INSTDIR\vlc-iptv.ico" 0

    WriteUninstaller "$INSTDIR\Uninstall VLC IPTV.exe"

    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\VLC IPTV" "DisplayName" "VLC IPTV"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\VLC IPTV" "UninstallString" "$\"$INSTDIR\Uninstall VLC IPTV.exe$\""
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\VLC IPTV" "DisplayIcon" "$INSTDIR\vlc-iptv.ico"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\VLC IPTV" "InstallLocation" "$INSTDIR"
SectionEnd

Section "Uninstall"
    SetShellVarContext current

    Delete "$DESKTOP\VLC IPTV.lnk"
    Delete "$SMPROGRAMS\VLC IPTV\VLC IPTV.lnk"
    RMDir "$SMPROGRAMS\VLC IPTV"

    DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\VLC IPTV"

    RMDir /r "$INSTDIR"
SectionEnd