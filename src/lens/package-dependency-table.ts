import { Package, DependencyPackage } from './package.interface';

class DependencyTable {
  private table: { [key: string]: DependencyPackage } = {}; // key: packageId
  
  public add(name: string, referredById: string, id: string) {
    if(!this.table[name]) {
      this.table[name] = { name, referredBy: {}, fragmentCount: 0 } as DependencyPackage;
    }
    this.table[name].referredBy[referredById] = id;
  }
}

export class PackageDependencyTable {

  private packageTable: { [key: string]: Package } = {};

  private dependencyTable: DependencyTable = new DependencyTable();
  private devDependencyTable: DependencyTable = new DependencyTable();

  constructor() {}

  public addPackageFromJsonObject(param: any) {
    const obj: Package = this.getPackageFromJson(param);
    
    const refId = this.getId(obj.name, obj.version);

    this.updateDependenciesTable(refId, obj.dependencies, this.dependencyTable);
    this.updateDependenciesTable(refId, obj.devDependencies, this.devDependencyTable);

    this.packageTable[refId] = obj;
  }
  public printPackageTable() {
    for (const obj in this.packageTable) {
      console.log(this.packageTable[obj]);
    }
  }

  public printDependencies() {
    for (const obj in this.dependencyTable) {
      console.log(this.dependencyTable[obj]);
    }
  }

  public printDevDependencies() {
    for (const obj in this.devDependencyTable) {
      console.log(this.devDependencyTable[obj]);
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

  private updateDependenciesTable(refId: string, dependencies: { [key: string]: string }, depTable: DependencyTable ) {    
    for (const name in dependencies) {
      const value = dependencies[name];

      depTable.add(name, refId, value);

    }
  }
};
