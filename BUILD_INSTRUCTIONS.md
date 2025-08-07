# Build Instructions for Cross-Platform Development

This project is configured to build on both macOS and Windows without requiring Apple Developer certificates or Windows code signing certificates.

## Prerequisites

### For macOS:
- macOS 10.14 or later
- Node.js 16+ and npm
- Xcode Command Line Tools (install with `xcode-select --install`)

### For Windows:
- Windows 10 or later
- Node.js 16+ and npm
- Visual Studio Build Tools (for native dependencies)

## Build Commands

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Specific Platforms

#### Windows Build
```bash
# Build for Windows (creates .exe installer and portable)
npm run build:win-only
```

#### macOS Build
```bash
# Build for macOS (creates .dmg and .zip)
npm run build:mac-only
```

#### Linux Build
```bash
# Build for Linux (creates AppImage, snap, and deb)
npm run build:linux
```

#### Cross-Platform Build
```bash
# Build for all platforms (macOS, Windows, Linux)
npm run build:all
```

## Build Output

### Windows
- `dist/move-cursor-project-1.0.1-setup.exe` - NSIS installer
- `dist/move-cursor-project-1.0.1.exe` - Portable executable

### macOS
- `dist/move-cursor-project-1.0.1.dmg` - DMG installer
- `dist/move-cursor-project-1.0.1-mac.zip` - Zipped application

### Linux
- `dist/move-cursor-project-1.0.1.AppImage` - AppImage
- `dist/move-cursor-project_1.0.1_amd64.deb` - Debian package
- `dist/move-cursor-project_1.0.1_amd64.snap` - Snap package

## Important Notes

### Code Signing Disabled
- **macOS**: Code signing and notarization are disabled (`identity: null`, `notarize: false`)
- **Windows**: Code signing is disabled (`sign: false`)
- **Linux**: No code signing required

### Running Unsigned Apps

#### macOS
1. Right-click the app and select "Open"
2. Click "Open" in the security dialog
3. Or run: `sudo spctl --master-disable` (not recommended for security)

#### Windows
- The app will run normally without code signing
- Windows SmartScreen may show a warning - click "More info" then "Run anyway"

### Troubleshooting

#### Common Issues

1. **"App can't be opened because it is from an unidentified developer" (macOS)**
   - Right-click the app → Open → Click "Open" in the dialog
   - Or go to System Preferences → Security & Privacy → Allow apps from anywhere

2. **"Windows protected your PC" (Windows)**
   - Click "More info" → "Run anyway"

3. **Build fails with native dependencies**
   - Run `npm run postinstall` to rebuild native modules
   - Ensure you have the correct build tools installed

4. **Permission errors on macOS**
   - The entitlements file allows necessary permissions without code signing
   - Users may need to grant permissions manually when the app requests them

### Development vs Production

- **Development**: Use `npm run dev` for hot reloading
- **Testing**: Use `npm run build:unpack` to test the built app locally
- **Distribution**: Use platform-specific build commands for final distribution

## Security Considerations

Since this build configuration disables code signing:
- Users will see security warnings when running the app
- The app cannot be distributed through official app stores
- Consider code signing for production releases if you have certificates
- The app will work perfectly for personal use and internal distribution
