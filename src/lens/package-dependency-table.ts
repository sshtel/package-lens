import { Package, DependencyPackage } from './package.interface';

export class PackageDependencyTable {

  private packageTable: { [key: string]: Package } = {};

  private dependencies: { [key: string]: DependencyPackage } = {}; // key: packageId
  private devDependencies: { [key: string]: DependencyPackage } = {}; // key: packageId
  private bundleDependencies: { [key: string]: DependencyPackage } = {}; // key: packageId

  constructor() {}

  public addPackageFromJsonObject(param: any) {
    const obj: Package = this.getPackageFromJson(param);
    
    const refId = this.getId(obj.name, obj.version);

    this.updateDependenciesTable(refId, obj.dependencies, this.dependencies);
    this.updateDependenciesTable(refId, obj.devDependencies, this.devDependencies);

    this.packageTable[refId] = obj;
  }
  public printPackageTable() {
    for (const obj in this.packageTable) {
      console.log(this.packageTable[obj]);
    }
  }

  public printDependencies() {
    for (const obj in this.dependencies) {
      console.log(this.dependencies[obj]);
    }
  }

  public printDevDependencies() {
    for (const obj in this.devDependencies) {
      console.log(this.devDependencies[obj]);
    }
  }
  public addPackageFromRepository(addr: string) {
    // input is node project repository addresses like github or gitlab
  }
  
  private getId(name: string, version: string) {
    return name + '#' + version;
  }

  private getPackageFromJson(param: any){
    const { name, version, description, repository, dependencies, devDependencies} = param;
    const obj: Package = {
      name, version, description, repository, dependencies: {}, devDependencies: {}
    };

    for (const depName in dependencies) {
      const depId = this.getId(depName, dependencies[depName]);
      obj.dependencies[depName] = depId;
    }

    for (const depName in devDependencies) {
      const depId = this.getId(depName, devDependencies[depName]);
      obj.devDependencies[depName] = depId;
    }

    return obj;
  }

  private updateDependenciesTable(refId: string, dependencies: { [key: string]: string }, destination: { [key: string]: DependencyPackage } ) {    
    for (const depName in dependencies) {
      const depId = this.getId(depName, dependencies[depName]);

      // update dependency table
      if (!destination[depName]) {
        destination[depName] = { name: depName, referredBy: {} } as DependencyPackage;
      }
      destination[depName].referredBy[refId] = depId;

    }
  }
};

