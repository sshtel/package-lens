import { PackageLens } from './app';

const obj = new PackageLens();
import * as fs from 'fs';

process.argv.forEach( (val, index) => {
  if(index < 2) return;
  const jsonObj = JSON.parse(fs.readFileSync(val).toString());
  obj.add(jsonObj);
});

// obj.add('https://github.com/sshtel/package-lens'); // this will be supported later

obj.printPackageTable();
obj.printDependencyTable();
obj.printDevDependencyTable();

