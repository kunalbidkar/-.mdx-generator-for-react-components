# Story Maps Docs

Internal documentation website for Story Maps development.
An implantation of [Docz](https://www.docz.site/). <br>
This script (scripts/mdxGenerator.js) loops through the package folder which has various components. <br>
It gathers the information from the component and automatically creates a .mdx file for that component in the specified directory.

## Configuration
```
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

```

## Usage
Clone this project and run these commands in the root folder

```
yarn install
yarn bootstrap
```
Then, switch to packages, storymaps-docs directory and run -


`yarn start`

Starts the development server in watch mode. Once the server is started, open<br>
your browser at [http://localhost:3000](http://localhost:3000).

For building a static, deployable version, of the documentation website which outputs to `./.docz/dist` -

`yarn build`

