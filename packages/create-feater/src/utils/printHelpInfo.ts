export default () => {
  console.log(`
Usage
  $ create-feater [appName]

Options
  --template, --tpl   template name, default is react
  --help, -h, -H      display help for command
  --version, -v, -V   display version info

Examples
  $ create-feater my-app
  $ create-feater my-app --template vue
`);
};
