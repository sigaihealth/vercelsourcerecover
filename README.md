# source-from-vercel-deployment

Download source files from your Vercel deployments. This tool allows you to recover your source code directly from Vercel deployments when you need to retrieve your files.

[![npm version](https://img.shields.io/npm/v/source-from-vercel-deployment.svg)](https://www.npmjs.com/package/source-from-vercel-deployment)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- **Download source files** from any Vercel deployment
- **Preserves directory structure** exactly as deployed
- **Secure authentication** via Vercel API tokens
- **Interactive CLI** for easy project and deployment selection
- **Team support** for both personal and team projects
- **Smart filtering** - automatically skips build outputs, only downloads source files
- **Latest API** - Uses Vercel API v8 for reliable downloads

## 📦 Installation

### Global Installation (Recommended)
```bash
npm install -g source-from-vercel-deployment
```

### Using npx (No Installation)
```bash
npx source-from-vercel-deployment
```

### Local Installation
```bash
npm install source-from-vercel-deployment
```

## 🎯 Quick Start

Simply run:
```bash
source-from-vercel-deployment
```

The interactive CLI will guide you through:

1. **🔐 Authentication** - Enter your Vercel API token (or set via environment variable)
2. **👥 Team Selection** - Choose your team or personal projects
3. **📁 Project Selection** - Select from your available projects
4. **🚀 Deployment Selection** - Pick the specific deployment (latest shown first)
5. **💾 Output Directory** - Specify where to save files (default: `./deployment_source`)

## 🔧 Configuration

### Environment Variables

Skip the authentication prompt by setting your token:
```bash
export VERCEL_AUTH_TOKEN=your_token_here
```

Generate your token at: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)

### Required Permissions

Your token needs:
- Read access to deployments
- Access to the team (if downloading team projects)

## 📖 How It Works

This tool leverages the Vercel REST API to:

1. **Authenticate** with your Vercel account
2. **List** all available deployments for your selected project
3. **Retrieve** the complete file tree structure
4. **Download** each source file individually
5. **Decode** base64-encoded content and save with original structure

### Technical Implementation

- **API Version**: Vercel API v8 (latest stable)
- **File Retrieval**: Uses deployment UID-based endpoints for reliability
- **Content Handling**: Automatic base64 decoding for file contents
- **Error Recovery**: Graceful handling of missing or inaccessible files
- **Source Filtering**: Automatically excludes `out/` directory and build artifacts

## 💡 Use Cases

- **🔥 Disaster Recovery**: Lost your local files? Recover from Vercel
- **📚 Code Backup**: Create backups of specific deployment versions
- **🔍 Debugging**: Analyze exactly what was deployed
- **📊 Auditing**: Review deployed code for security or compliance
- **🔄 Migration**: Moving projects between accounts or platforms

## ⚠️ Limitations & Considerations

- **Rate Limiting**: Downloads are sequential to respect API limits
- **API Requirement**: Only works with deployments created via Vercel CLI/API
- **Time**: Large projects may take several minutes to download
- **429 Errors**: If you hit rate limits, wait a few minutes before retrying
- **File Types**: Some files (serverless functions) may not be directly downloadable

## 🐛 Troubleshooting

### Common Issues

**Error 429: Too Many Requests**
- You've hit Vercel's rate limit
- Solution: Wait 5-10 minutes before trying again

**404: File Not Found**
- Some deployment files aren't accessible (like compiled functions)
- The tool will automatically skip these and continue

**Authentication Failed**
- Verify your token is valid and has correct permissions
- For team projects, ensure token has team access

**Empty Downloads**
- Check if deployment was created with Vercel CLI/API (not Git integration)
- Verify the deployment contains source files

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Originally created by [CalinaCristian](https://github.com/CalinaCristian)
- Enhanced with v8 API support and source-only downloads
- Maintained by the open source community

## 📝 Changelog

### Latest Version
- Updated to Vercel API v8 for improved reliability
- Added automatic source file filtering (excludes build outputs)
- Improved base64 content decoding
- Better error handling and user feedback
- Enhanced README documentation

---

**⚡ Note**: This tool is for recovering your own deployments. Only download deployments you have permission to access. Use responsibly and respect Vercel's API rate limits.