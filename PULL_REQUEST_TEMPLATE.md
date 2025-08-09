# Update to Vercel API v8 with Source-Only Downloads

## Summary

This PR updates the tool to use Vercel's latest API (v8) and adds intelligent filtering to download only source files, excluding build outputs. These changes significantly improve reliability and usability.

## Key Changes

### 🚀 API Migration
- Updated from Vercel API v6 to v8 for improved reliability
- Implemented proper base64 decoding for file contents
- Added support for both UID-based and path-based file access

### 📁 Source-Only Downloads
- Automatically filters out the `out/` directory (build outputs)
- Skips lambda and edge functions that aren't directly downloadable
- Focuses on retrieving actual source code files

### 🐛 Bug Fixes
- Fixed path normalization issues for nested directories
- Improved error handling for 404 and 410 responses
- Better handling of symlinks and special file types

### 📚 Documentation
- Completely revamped README with comprehensive documentation
- Added troubleshooting section for common issues
- Included technical implementation details

## Testing

Tested with multiple Vercel deployments:
- ✅ Successfully downloads source files from `src/` directory
- ✅ Preserves directory structure correctly
- ✅ Handles nested directories and complex file paths
- ✅ Gracefully skips non-downloadable files
- ✅ Works with both personal and team projects

## Why These Changes?

1. **API v8 is the current stable version** - v6 endpoints were returning 404 errors for many file operations
2. **Users typically want source files** - Excluding build outputs saves time and storage
3. **Better error handling** - The tool now gracefully handles various edge cases instead of failing

## Breaking Changes

None - the tool maintains the same user interface and workflow.

## Screenshots/Output

Example output showing successful source file download:
```
Processing: src (type: directory, uid: none, has children: true)
  Processing 34 children of src
Processing: .eslintrc.json (type: file, uid: 86be0bfec6a6c98d9f12aa5149d3cd49669e0c0f, has children: false)
  Trying URL: https://vercel.com/api/v8/deployments/dpl_XXX/files/86be0bfec6a6c98d9f12aa5149d3cd49669e0c0f (UID-based)
  Successfully downloaded .eslintrc.json
Skipping 'out' directory and all its contents
```

## Related Issues

This update addresses common issues users have reported with downloading source files from Vercel deployments.

---

I've tested these changes extensively and they significantly improve the tool's reliability and user experience. Happy to make any adjustments based on your feedback!