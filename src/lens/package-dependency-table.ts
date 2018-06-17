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
    const obj: Package = {
      name: param.name,
      version: param.version,
      description: param.description,
      repository: param.repository,
      dependencies: {},
      devDependencies: {}
    };

    const dependencies = param.dependencies;
    for (const name in dependencies) {
      const id = this.getId(name, dependencies[name]);
      obj.dependencies[name] = id;
    }

    const devDependencies = param.dependencies;
    for (const name in devDependencies) {
      const id = this.getId(name, devDependencies[name]);
      obj.devDependencies[name] = id;
    }

    return obj;
  }

  private updateDependenciesTable(refId: string, dependencies: { [key: string]: string }, depTable: { [key: string]: DependencyPackage } ) {    
    for (const name in dependencies) {
      const value = dependencies[name];

      // update dependency table
      if (!depTable[name]) {
        depTable[name] = { name, referredBy: {}, fragmentCount: 0 } as DependencyPackage;
      }
      depTable[name].referredBy[refId] = value;

      // check fragment
      

    }
  }
};
