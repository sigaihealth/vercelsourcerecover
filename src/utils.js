import axios from 'axios';
import colors from 'colors';
import fsExtra from 'fs-extra';
import { join } from 'path';

export const getAuthToken = token => token.includes('Bearer') || token.includes('bearer')
  ? token[0].toUpperCase() + token.slice(1)
  : `bearer ${token}`;

export const appendTeamId = (url, teamId, symbol = '?') => teamId ?  `${url}${symbol}teamId=${teamId}` : url;

const generateFile = async (fileIdentifier, currentPath, env, actualFileName) => {
  // Use actualFileName if provided (for source files with UIDs), otherwise use fileIdentifier
  const fileName = actualFileName || fileIdentifier;
  
  // For source files, build the full path from root
  // Need to include the full path from the deployment root
  let filePath = fileName;
  
  // Get the path relative to the output directory
  // Need to normalize paths for comparison
  const normalizedCurrent = currentPath.replace(/^\.\//, '');
  const normalizedOutput = env.OUTPUT_DIRECTORY.replace(/^\.\//, '');
  
  let relativePath = '';
  if (normalizedCurrent.startsWith(normalizedOutput)) {
    relativePath = normalizedCurrent.substring(normalizedOutput.length);
    // Remove leading slash if present
    if (relativePath.startsWith('/')) {
      relativePath = relativePath.substring(1);
    }
  }
  
  // Build the full file path
  if (relativePath) {
    filePath = `${relativePath}/${fileName}`;
  }
  
  console.log(colors.gray(`  Debug: currentPath=${currentPath}, outputDir=${env.OUTPUT_DIRECTORY}, relativePath=${relativePath}, filePath=${filePath}`));
  
  // For source files from Vercel, use the v8 API endpoint
  // We can use either the file UID or the path
  const isUid = fileIdentifier.match(/^[a-f0-9]{40}$/);
  let url;
  
  if (isUid) {
    // Use UID-based endpoint for v8 API
    url = `https://vercel.com/api/v8/deployments/${env.DEPLOYMENT_UID}/files/${fileIdentifier}${env.TEAM_ID ? `?teamId=${env.TEAM_ID}` : ''}`;
  } else {
    // Use path-based endpoint with the path parameter
    url = `https://vercel.com/api/v8/deployments/${env.DEPLOYMENT_UID}/files?path=${encodeURIComponent(filePath)}${env.TEAM_ID ? `&teamId=${env.TEAM_ID}` : ''}`;
  }
  
  console.log(colors.blue(`  Trying URL: ${url} (${isUid ? 'UID-based' : 'path-based'})`));
  const savePath = join(currentPath, fileName);

  try {
    // Check if a directory with this name already exists
    if (fsExtra.existsSync(savePath) && fsExtra.statSync(savePath).isDirectory()) {
      console.log(colors.yellow(`Skipping ${fileName} (directory already exists with this name)`));
      return;
    }
    
    console.log(colors.yellow('Downloading file: '), colors.cyan(fileName), colors.yellow(' to path: '), colors.cyan(savePath));
    const response = await axios.get(url, {
      headers: {
        Authorization: env.AUTHORIZATION_TOKEN
      }
    });
    
    // The v8 API returns file content as base64 encoded in a JSON response
    let fileContent;
    if (response.data && typeof response.data === 'object' && response.data.data) {
      // If response contains base64 encoded data
      fileContent = Buffer.from(response.data.data, 'base64');
      fsExtra.writeFileSync(savePath, fileContent);
    } else if (typeof response.data === 'string') {
      // If response is a string (might be base64)
      try {
        fileContent = Buffer.from(response.data, 'base64');
        fsExtra.writeFileSync(savePath, fileContent);
      } catch {
        // If not base64, write as is
        fsExtra.writeFileSync(savePath, response.data);
      }
    } else {
      // Direct file content
      fsExtra.writeFileSync(savePath, response.data);
    }
    
    console.log(colors.green(`  Successfully downloaded ${fileName}`));
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.log(colors.yellow(`Skipping ${fileName} (404 - file not found)`));
      console.log(colors.yellow(`  Tried URL: ${url}`));
    } else if (err.response && err.response.status === 410) {
      console.log(colors.yellow(`Skipping ${fileName} (410 - gone/unavailable)`));
      console.log(colors.yellow(`  This might be a compiled file or lambda function`));
    } else {
      console.log(colors.red(`Cannot download ${fileName}. Error: ${err.message}`));
      if (err.response) {
        console.log(colors.red(`  Status: ${err.response.status}`));
        // Don't try to stringify the entire response data, it might have circular references
        if (err.response.data && typeof err.response.data === 'object') {
          console.log(colors.red(`  Data: ${err.response.data.error || err.response.data.message || 'No error message'}`));
        }
      }
      console.log(colors.red(`  URL: ${url}`));
    }
  }
};

const generateDirectory = (path) => {
  try {
    fsExtra.mkdirpSync(path);
  } catch (err) {
    console.log(colors.red(`Cannot write directory on path: ${path} !`));
    process.exit();
  }
};

const parseCurrent = async (node, currentPath, env) => {
  if (!node || !node.name) {
    console.log(colors.yellow('Skipping invalid node without name'));
    return;
  }

  // Skip 'out' directory entirely
  if (node.name === 'out') {
    console.log(colors.yellow(`Skipping 'out' directory and all its contents`));
    return;
  }

  console.log(colors.cyan(`Processing: ${node.name} (type: ${node.type}, uid: ${node.uid || 'none'}, has children: ${!!node.children})`));

  // Skip lambda functions and edge functions
  if (node.type === 'lambda' || node.type === 'edge') {
    console.log(colors.yellow(`  Skipping ${node.type} function: ${node.name}`));
    return;
  }

  if (node.type === 'directory' || node.children) {
    generateDirectory(join(currentPath, node.name));
    if (node.children && Array.isArray(node.children)) {
      console.log(colors.yellow(`  Processing ${node.children.length} children of ${node.name}`));
      await parseStructure(node.children, join(currentPath, node.name), env);
    } else {
      console.log(colors.red(`  No children array found for directory ${node.name}`));
    }
  } else if (node.type === 'file') {
    // For source files, we need to use the UID if available
    const fileIdentifier = node.uid || node.name;
    console.log(colors.green(`  Attempting to download file: ${node.name} with uid: ${node.uid}`));
    await generateFile(fileIdentifier, currentPath, env, node.name);
  } else {
    console.log(colors.yellow(`Unknown node type '${node.type}' for ${node.name}, skipping`));
  }
};

export const parseStructure = async (folderStructure, currentPath, env) => {
  if (folderStructure) {
    for (const structure of folderStructure) {
      await parseCurrent(structure, currentPath, env);
    }
  }
};

// Process a flat list of files (for source files API)
export const processFilesList = async (filesList, outputDirectory, env) => {
  if (!filesList || !Array.isArray(filesList)) return;
  
  // Filter out 'out' directory files - only keep source files
  const sourceFiles = filesList.filter(file => {
    const path = file.file || file.name || file;
    return !path.toString().startsWith('out/');
  });
  
  console.log(colors.cyan(`Processing ${sourceFiles.length} source files (filtered from ${filesList.length} total)...`));
  
  for (const file of sourceFiles) {
    if (typeof file === 'string') {
      // Simple file path
      const parts = file.split('/');
      const fileName = parts.pop();
      const dirPath = join(outputDirectory, ...parts);
      
      // Create directory structure
      if (parts.length > 0) {
        fsExtra.mkdirpSync(dirPath);
      }
      
      // Download file
      await generateFile(file, outputDirectory, env);
    } else if (file.file) {
      // v2 API format: {file: "path/to/file", sha: "...", mode: "...", uid: "..."}
      const filePath = file.file;
      const parts = filePath.split('/');
      const fileName = parts.pop();
      const dirPath = join(outputDirectory, ...parts);
      
      console.log(colors.green(`  Processing file: ${filePath} (uid: ${file.uid})`));
      
      // Create directory structure
      if (parts.length > 0) {
        fsExtra.mkdirpSync(dirPath);
      }
      
      // Download file using UID
      const fileIdentifier = file.uid || filePath;
      await generateFile(fileIdentifier, dirPath, env, fileName);
    } else if (file.name) {
      // Alternative format with name property
      const parts = file.name.split('/');
      const fileName = parts.pop();
      const dirPath = join(outputDirectory, ...parts);
      
      // Create directory structure
      if (parts.length > 0) {
        fsExtra.mkdirpSync(dirPath);
      }
      
      // Download file
      await generateFile(file.uid || file.name, dirPath, env, fileName);
    }
  }
};
