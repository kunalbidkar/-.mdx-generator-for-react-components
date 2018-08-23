const fs = require('fs-extra')
var glob = require("glob")

/*
	 A config object having parameters for the file extensions, out destination,
	 file paths from current directory, mdx file attributes etc. 
*/
var config = {
	out: 'packages/storymaps-docs/src/generated-mdx-docs/',
	outFileExt: '.mdx',
	componentExt: 'tsx',
	componentsFolderName: 'components/',
	readme: 'README.md',
	pathFromCurrentDirToPackagesDir: './',
	pathFromMdxDirToPackagesDir: '../../../../../../',
	rootPackageForComponents: 'packages',
	mdxStarterDashes: '---',
	componentNameLabel: "name: ",
	componentRouteLabel: "route: ",
	componentMenuLabel: "menu: ",
	importPropsTable: "import { PropsTable } from 'docz'",
	callReadmeComponent: "<Readme />"
};

/*
	Glob requires a pattern to search and the second parameter 'options' is optional if you wish to 
	skip any of the folders/files in the search. 
	This is the configuration object for Glob which has a pattern that looks for tsx and md files
	and skips all the files from the given folders in the ignore property.
*/
var configOptionsForGlob = {
	pattern: '**/*.{tsx,md}',
	ignore: ['**/node_modules/**', '**/storymaps-docs/**', config.readme]
}

/*
	The glob has a callback function which has a filePathArray. We loop through the array for each
	file path and check if it has an associated README.md and then we call createMDXTemplate() passing 
	filePath and readmePath, finally pushing the created template into the file.
*/
glob(configOptionsForGlob.pattern, configOptionsForGlob, function(err, filePathArray) {
    let readmePath;
    filePathArray.forEach(filePath => {
    	let pathTillCurrentDir = getPathTillComponentFolder(filePath);
    	if(filePathArray.includes(pathTillCurrentDir+config.readme)){
				readmePath = pathTillCurrentDir+config.readme;
		}
		if(filePath.includes(config.componentExt)){
			let dataObject = createMdxTemplate(filePath, readmePath);
			let destinationPath = config.pathFromCurrentDirToPackagesDir+config.out+dataObject.componentRoute+config.outFileExt;
			fs.outputFile(destinationPath,dataObject.dataToWrite, err => {});
		}
    });	
});

/*
	This function takes filePath and readmePath as arguments and returns a dataObject that consists of 
	the actual dataToWrite and also the route. The .mdx file generated takes the help of the route for 
	obtaining the file name to store the data for that component.
*/
function createMdxTemplate(filePath,readmePath){
	var dataToWrite;
	let componentName = getComponentName(filePath);
	let pathTillComponentName = getPathTillComponentFolder(filePath);
	let importScriptForComponent = `import ${componentName} from '${config.pathFromMdxDirToPackagesDir}${filePath}'`;
	let importScriptForREADME = `import Readme from '${config.pathFromMdxDirToPackagesDir}${readmePath}'`;	
	let propsTableOf = `<PropsTable of={${componentName}} />`;
	let componentRoute = getComponentRoute(filePath, componentName);
	let componentMenu = getComponentMenu(filePath);	
	dataToWrite = config.mdxStarterDashes + "\n"
				+ config.componentNameLabel + " " + config.componentsFolderName+componentName + "\n"
				+ config.componentRouteLabel + " " + componentRoute + "\n"
				+ config.componentMenuLabel + " " + componentMenu + "\n"
				+ config.mdxStarterDashes + "\n\n"
				+ config.importPropsTable + "\n"
				+ importScriptForComponent + "\n"
				+ importScriptForREADME + "\n\n"
				+ config.callReadmeComponent + "\n"
				+ propsTableOf;
	let dataObject = {
		dataToWrite,
		componentRoute
	};
	return dataObject;
}

/*
	This function takes a string which is a filePath and truncates the 'fileName.ext' from the 
	file path. It finds out the last index of / in the path and truncates everything after that index.
	Example: Input : package/sample/components/SampleC/index.tsx
			 Output: package/sample/components/SampleC
*/
function getPathTillComponentFolder(filePath){
	var index = filePath.lastIndexOf('/');
	var res = filePath.substring(0, index+1);
	return res;
}

/*
	This function takes file path as a parameter, manipulates the string and 
	returns the component name by truncating the rest of the file path
	Example: Input: package/sample/components/SampleC/index.tsx
			 Output: components/SampleC
*/
function getComponentName(filePath){
	var index = filePath.lastIndexOf('/');
	var res = filePath.substring(0, index);
	index = res.lastIndexOf('/');
	res = filePath.substring(index+1, res.length);
	return res;
}

/*
	This function takes two parameters, directoryName and componentName and 
	returns a string giving up the route for the component in the .mdx file.
*/
function getComponentRoute(directoryName, componentName){
	var route = directoryName;
	var searchTerm = '/';
	var indexOfFirst = route.indexOf(searchTerm);
	var secondIndex = route.indexOf(searchTerm, (indexOfFirst + 1));
	route = route.substring(0, secondIndex);
	indexOfFirst = route.indexOf(searchTerm);
	route = route.substring(indexOfFirst+1, route.length);
	return route+"/"+config.componentsFolderName+componentName;
}

/*
	This function takes the filePath as a string, manipulating it and returning 
	a string which is the route in the .mdx file for that component.
	Example: Input: package/sample/components/SampleC/index.tsx
			 Output: components/SampleC
*/
function getComponentMenu(filePath){
	var menu = filePath;
	var searchTerm = '/';
	var indexOfFirst = menu.indexOf(searchTerm);
	var secondIndex = menu.indexOf(searchTerm, (indexOfFirst + 1));
	menu = menu.substring(1, secondIndex);
	menu = menu.replace(/-/g," ");
	indexOfFirst = menu.indexOf(searchTerm);
	menu = menu.substring(indexOfFirst+1, menu.length);
	menu = toTitleCase(menu); // converting the menu string to Title Case
	return menu;
}

/*
	This function is called from getComponentMenu() and returns a string. 
	It takes a string as an argument, converts the first letter of each word to upper case.
	Example: Input: sample app a
			 Output: Sample App A
*/
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}