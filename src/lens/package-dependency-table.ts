import { Package, DependencyPackage } from './package.interface';

export class DependencyTable {
  private table: { [key: string]: DependencyPackage } = {}; // key: packageId
  
  public add(name: string, referredById: string, id: string) {
    if(!this.table[name]) {
      this.table[name] = { name, referredBy: {}, versionFragment: 0 } as DependencyPackage;
    }
    this.table[name].referredBy[referredById] = id;
    this.updateFragmentCount(this.table[name]);
  }
  public getTable() {
    return this.table;
  }
  private updateFragmentCount(param: DependencyPackage){
    const referredBy = param.referredBy;
    const tempTable: { [key: string]: string } = {};
    for(const key in referredBy){
      const tempKey = referredBy[key];
      tempTable[tempKey] = key;
    }
    param.versionFragment = Object.keys(tempTable).length;
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
  public getPackageTable() {
    return this.packageTable;
  }

  public getDependencyTable() {
    return this.dependencyTable.getTable();
  }

  public getDevDependencyTable() {
    return this.devDependencyTable.getTable();
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

    const devDependencies = param.devDependencies;
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
