const fs = require('fs');
const path = require('path');
const fileArray=[];


export default {
  title: 'Story Maps',
  description: 'Documentation for Esri Story Maps website and builder',
  ordering: 'ascending',
  modifyBundlerConfig: (config) => {
    /* do your magic here */

	let fileList = recFindByExt('../../packages','tsx');
	let READMEList = recFindByExt('../../packages', 'md');
	let filteredFiles = filterFiles(fileList);
	let filteredReadMe = filterFiles(READMEList);

	const mdxStarterDashes = '---';
	const name = "name: ";
	const route = "route: ";
	const menu = "menu: ";
	const importPropsTable = "import { PropsTable } from 'docz'"; 
	const readmeComponent = "<Readme />";
	const newLine = "/n";

	fileArray.forEach(file => {
		if(file.includes('.tsx')){
			
			let dataToWrite = `${mdxStarterDashes} ${newLine}
							   ${name} ${newLine}
							   ${route} ${newLine} 
							   ${menu} ${newLine}
							   ${mdxStarterDashes} ${newLine}`;
		}
		// var index = file.lastIndexOf('/');
		// //console.log(index);
		// var res = file.substring(0, index+1);  // res => path until .tsx file
		console.log(file);  
		// Import the component from the path 
		//const componentName =  require(`./${file}`);
			/*
				create mdx file here
			*/
		//if(fileArray.contains(res+"/README.md")){
			// grab that file
		//}

		// At this point, you have the component imported, you have its associated readme, start creating a mdx file with that info.
		// fs.writeFile(componentName.mdx, data).catch(console.log);
		
	});

    return config;
  },
  typescript: true,
  plugins: []
};


function recFindByExt(base,ext,files,result) 
{
	//console.log("inside recFindByExt");
    files = files || fs.readdirSync(base);
    result = result || [];

    files.forEach( 
        function (file) {
            var newbase = path.join(base,file);
            if ( fs.statSync(newbase).isDirectory() )
            {
                result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result);
            }
            else
            {
                if ( file.substr(-1*(ext.length+1)) == '.' + ext )
                {
                    result.push(newbase);
                } 
            }
        }
    )
    return result;
}

function filterFiles(files){
	//console.log("called");
	files.forEach(element =>{
		if(!(element.includes("storymaps-docs") || element.includes("node_modules")))
			fileArray.push(element);
	});
	return fileArray;
}